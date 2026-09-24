"use client"

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Box, Circle, Eye, EyeOff, Move3d, Pause, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** 0: translucent, 1: hidden, 2: opaque */
type ShellMode = 0 | 1 | 2
type Phase = "idle" | "loading" | "ready" | "error"

const MODEL_BASE = "/marble/models/"
const ASSEMBLY_URL = `${MODEL_BASE}assembly-data.js?v=3e10073a07`
/** Start the WebGL context and the ~6 MB mesh download this far before the viewer scrolls into view. */
const LAZY_ROOT_MARGIN = "300px 0px"
const IDLE_RESUME_MS = 4000
const KEY_ROTATE_STEP = Math.PI / 24 // 7.5 degrees per arrow key press
const KEY_ZOOM_STEP = 0.9
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const INITIAL_PROGRESS = "Loading 3D model…"

const CANVAS_CLASS =
  "absolute inset-0 block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing focus-visible:outline-offset-[-2px]"
const CANVAS_LABEL =
  "Interactive 3D model of MARBLE. Drag or use the arrow keys to rotate; click the model and scroll, or press plus and minus, to zoom."

const SHELL_MODES = [
  { name: "translucent", Icon: Eye },
  { name: "hidden", Icon: EyeOff },
  { name: "opaque", Icon: Circle },
] as const

// ---------------------------------------------------------------------------
// Asset loading (shared across mounts, including React strict-mode remounts)
// ---------------------------------------------------------------------------

interface LoadedAssembly {
  data: any
  geometries: Map<string, THREE.BufferGeometry>
}

interface MarbleCache {
  scripts: Map<string, Promise<void>>
  assembly: Promise<LoadedAssembly> | null
  progress: string
  listeners: Set<(text: string) => void>
}

/**
 * Kept on window rather than in module scope so a dev hot-reload of this file reuses
 * the decoded geometry instead of waiting on chunk scripts that have already run.
 */
function getCache(): MarbleCache {
  const w = window as any
  if (!w.__marbleViewerCache) {
    const cache: MarbleCache = {
      scripts: new Map(),
      assembly: null,
      progress: INITIAL_PROGRESS,
      listeners: new Set(),
    }
    w.__marbleViewerCache = cache
  }
  return w.__marbleViewerCache as MarbleCache
}

function subscribeProgress(listener: (text: string) => void): () => void {
  const cache = getCache()
  cache.listeners.add(listener)
  listener(cache.progress)
  return () => {
    cache.listeners.delete(listener)
  }
}

/**
 * Maps "media/models/x", "models/x", "/marble/models/x" and "/marble/media/models/x"
 * to "/marble/models/x", keeping any query string (the ?v= cache buster).
 */
function resolveModelUrl(src: string): string {
  const q = src.indexOf("?")
  const path = q === -1 ? src : src.slice(0, q)
  const query = q === -1 ? "" : src.slice(q)
  const match = path.match(/^\/?(?:marble\/)?(?:media\/)?models\/(.+)$/)
  const file = match ? match[1] : path.slice(path.lastIndexOf("/") + 1)
  return MODEL_BASE + file + query
}

/** Appends a script once per URL; later callers share the in-flight or settled promise. */
function loadScript(src: string): Promise<void> {
  const url = resolveModelUrl(src)
  const cache = getCache()
  const existing = cache.scripts.get(url)
  if (existing) return existing

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = url
    script.async = true
    script.dataset.marbleModel = ""
    script.onload = () => resolve()
    script.onerror = () => {
      script.remove()
      reject(new Error(`Failed to load ${url}`))
    }
    document.head.appendChild(script)
  })
  cache.scripts.set(url, promise)
  // Forget failures so a retry appends a fresh tag.
  promise.catch(() => {
    if (cache.scripts.get(url) === promise) cache.scripts.delete(url)
  })
  return promise
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

function decodeMesh(rec: any): THREE.BufferGeometry {
  const q = new Uint16Array(base64ToBytes(rec.p).buffer, 0, rec.vc * 3)
  const idxBuf = base64ToBytes(rec.i).buffer
  const idx = rec.iw === 4 ? new Uint32Array(idxBuf, 0, rec.ic) : new Uint16Array(idxBuf, 0, rec.ic)
  const [mx, my, mz] = rec.min
  const [sx, sy, sz] = rec.step
  const pos = new Float32Array(rec.ic * 3)
  for (let n = 0; n < rec.ic; n++) {
    const v = idx[n] * 3
    const o = n * 3
    pos[o] = mx + q[v] * sx
    pos[o + 1] = my + q[v + 1] * sy
    pos[o + 2] = mz + q[v + 2] * sz
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  geo.computeVertexNormals()
  return geo
}

/** Downloads and decodes the assembly once per page; every viewer instance awaits the same promise. */
function loadAssembly(): Promise<LoadedAssembly> {
  const cache = getCache()
  if (cache.assembly) return cache.assembly

  const report = (text: string) => {
    cache.progress = text
    cache.listeners.forEach((listener) => listener(text))
  }

  const job = (async (): Promise<LoadedAssembly> => {
    const w = window as any
    report("Loading assembly data…")
    if (!w.MARBLE_ASSEMBLY) await loadScript(ASSEMBLY_URL)
    const data = w.MARBLE_ASSEMBLY
    if (!data) throw new Error("MARBLE assembly data missing")

    const chunkUrls: string[] = Array.isArray(data.mesh_chunks) ? data.mesh_chunks : []
    let done = 0
    report("Loading CAD meshes (0%)")
    await Promise.all(
      chunkUrls.map((url) =>
        loadScript(url).then(() => {
          done++
          report(`Loading CAD meshes (${Math.round((done / chunkUrls.length) * 100)}%)`)
        })
      )
    )

    report("Building assembly…")
    // Let the status text paint before the synchronous decode.
    await new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)))

    const geometries = new Map<string, THREE.BufferGeometry>()
    for (const chunk of w.MARBLE_MESH_CHUNKS || []) {
      for (const rec of chunk.meshes) {
        const geo = decodeMesh(rec)
        for (const name of rec.names) geometries.set(name, geo)
      }
    }
    // Release the base64 sources; the decoded geometry is cached instead.
    w.MARBLE_MESH_CHUNKS = []
    return { data, geometries }
  })()

  cache.assembly = job
  job.catch(() => {
    if (cache.assembly === job) {
      cache.assembly = null
      cache.progress = INITIAL_PROGRESS
    }
  })
  return job
}

// ---------------------------------------------------------------------------
// three.js viewer
// ---------------------------------------------------------------------------

interface ViewerOptions {
  host: HTMLElement
  reducedMotion: boolean
  isMotionOn: () => boolean
  getShellMode: () => ShellMode
  onReady: () => void
  onError: (message: string) => void
  onInteract: () => void
}

interface Viewer {
  setVisible: (visible: boolean) => void
  setShellMode: (mode: ShellMode) => void
  setReducedMotion: (reduced: boolean) => void
  resetCamera: () => void
  dispose: () => void
}

const NOOP_VIEWER: Viewer = {
  setVisible() {},
  setShellMode() {},
  setReducedMotion() {},
  resetCamera() {},
  dispose() {},
}

function createViewer(opts: ViewerOptions): Viewer {
  const { host } = opts
  let disposed = false
  let visible = false
  let reducedMotion = opts.reducedMotion
  let reqId: number | null = null
  let idleTimer: ReturnType<typeof setTimeout> | null = null

  // A fresh canvas per viewer guarantees a pristine WebGL context on every mount.
  const canvas = document.createElement("canvas")
  canvas.className = CANVAS_CLASS
  canvas.tabIndex = 0
  canvas.setAttribute("role", "img")
  canvas.setAttribute("aria-label", CANVAS_LABEL)
  host.appendChild(canvas)

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    })
  } catch (err) {
    console.warn("MARBLE viewer: could not create a WebGL context", err)
    canvas.remove()
    opts.onError("The 3D model needs WebGL, which is unavailable in this browser.")
    return NOOP_VIEWER
  }

  // --- Scene, camera, renderer ---
  const scene = new THREE.Scene()
  const initialWidth = host.clientWidth || 800
  const initialHeight = host.clientHeight || 500

  const camera = new THREE.PerspectiveCamera(40, initialWidth / initialHeight, 0.05, 10)
  const initialCamPos = new THREE.Vector3(0.52, 0.38, 0.62)
  const initialTarget = new THREE.Vector3(0, 0, 0)
  camera.position.copy(initialCamPos)

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(initialWidth, initialHeight, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.18
  renderer.setClearColor(0x000000, 0)

  // --- OrbitControls ---
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.minDistance = 0.25
  controls.maxDistance = 1.6
  controls.maxPolarAngle = Math.PI * 0.95
  controls.target.copy(initialTarget)
  controls.autoRotate = !reducedMotion
  controls.autoRotateSpeed = 0.6
  // OrbitControls writes an inline cursor; let it swap grab/grabbing instead of overriding the classes with "auto".
  controls.cursorStyle = "grab"
  // OrbitControls also sets an inline touch-action: none; allow vertical swipes so phones can scroll past the model.
  canvas.style.touchAction = "pan-y"

  const stopAutoRotate = () => {
    controls.autoRotate = false
    if (idleTimer) {
      clearTimeout(idleTimer)
      idleTimer = null
    }
    opts.onInteract()
  }
  const scheduleAutoRotate = () => {
    if (idleTimer) clearTimeout(idleTimer)
    idleTimer = setTimeout(() => {
      idleTimer = null
      if (!disposed && !reducedMotion) controls.autoRotate = true
    }, IDLE_RESUME_MS)
  }
  controls.addEventListener("start", stopAutoRotate)
  controls.addEventListener("end", scheduleAutoRotate)

  // Wheel zoom only turns on once the visitor engages the model, so scrolling the page past it is never hijacked.
  controls.enableZoom = false
  const enableWheelZoom = () => {
    controls.enableZoom = true
  }
  const disableWheelZoom = () => {
    controls.enableZoom = false
  }
  canvas.addEventListener("pointerdown", enableWheelZoom)
  canvas.addEventListener("focus", enableWheelZoom)
  canvas.addEventListener("pointerleave", disableWheelZoom)
  canvas.addEventListener("blur", disableWheelZoom)

  // --- Keyboard: arrows orbit, +/- zoom (OrbitControls' own keys only pan) ---
  const keyOffset = new THREE.Vector3()
  const keySpherical = new THREE.Spherical()

  function orbitBy(dTheta: number, dPhi: number) {
    keyOffset.copy(camera.position).sub(controls.target)
    keySpherical.setFromVector3(keyOffset)
    keySpherical.theta += dTheta
    keySpherical.phi = THREE.MathUtils.clamp(
      keySpherical.phi + dPhi,
      Math.max(controls.minPolarAngle, 0.01),
      Math.min(controls.maxPolarAngle, Math.PI - 0.01)
    )
    keyOffset.setFromSpherical(keySpherical)
    camera.position.copy(controls.target).add(keyOffset)
    controls.update()
  }

  function dollyBy(scale: number) {
    keyOffset.copy(camera.position).sub(controls.target)
    keyOffset.setLength(
      THREE.MathUtils.clamp(keyOffset.length() * scale, controls.minDistance, controls.maxDistance)
    )
    camera.position.copy(controls.target).add(keyOffset)
    controls.update()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey || e.metaKey) return
    switch (e.key) {
      case "ArrowLeft":
        orbitBy(-KEY_ROTATE_STEP, 0)
        break
      case "ArrowRight":
        orbitBy(KEY_ROTATE_STEP, 0)
        break
      case "ArrowUp":
        orbitBy(0, -KEY_ROTATE_STEP)
        break
      case "ArrowDown":
        orbitBy(0, KEY_ROTATE_STEP)
        break
      case "+":
      case "=":
        dollyBy(KEY_ZOOM_STEP)
        break
      case "-":
      case "_":
        dollyBy(1 / KEY_ZOOM_STEP)
        break
      default:
        return
    }
    e.preventDefault()
    stopAutoRotate()
    scheduleAutoRotate()
  }
  canvas.addEventListener("keydown", onKeyDown)

  // --- Lighting ---
  scene.add(new THREE.AmbientLight(0xffffff, 1.2))

  const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.5)
  keyLight.position.set(2.2, 3.8, 2.5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.2)
  fillLight.position.set(-2.5, -1.0, -2.0)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.9)
  rimLight.position.set(0.0, -3.0, 1.5)
  scene.add(rimLight)

  // --- Materials ---
  const materials: Record<string, THREE.MeshStandardMaterial> = {
    mat_PA_12_Nylon_PA_603_CF_with_EOS_P_3D_Prin: new THREE.MeshStandardMaterial({
      color: 0x222224, roughness: 0.75, metalness: 0.1,
    }),
    mat_ABS_White: new THREE.MeshStandardMaterial({
      color: 0xf4f4f3, roughness: 0.75, metalness: 0.0,
    }),
    mat_Carbon_Fiber_Plain: new THREE.MeshStandardMaterial({
      color: 0x2d2d30, roughness: 0.4, metalness: 0.3,
    }),
    mat_Stainless_Steel_Satin: new THREE.MeshStandardMaterial({
      color: 0xd5d5d8, roughness: 0.3, metalness: 0.85,
    }),
    mat_Aluminum_Satin: new THREE.MeshStandardMaterial({
      color: 0xe8e8eb, roughness: 0.35, metalness: 0.75,
    }),
    mat_Steel_Satin: new THREE.MeshStandardMaterial({
      color: 0xa5a5aa, roughness: 0.35, metalness: 0.85,
    }),
    mat_Plastic_Glossy_Black: new THREE.MeshStandardMaterial({
      color: 0x181818, roughness: 0.2, metalness: 0.1,
    }),
    mat_Opaque_229_234_237: new THREE.MeshStandardMaterial({
      color: 0xe2e5ea, roughness: 0.4, metalness: 0.5,
    }),
    mat_Opaque_229_234_237_2: new THREE.MeshStandardMaterial({
      color: 0xe2e5ea, roughness: 0.7, metalness: 0.1,
    }),
    mat_Rubber_Soft: new THREE.MeshStandardMaterial({
      color: 0x141414, roughness: 0.9, metalness: 0.0,
    }),
    mat_ABS_White_2: new THREE.MeshStandardMaterial({
      color: 0xe5e9f0, roughness: 0.92, metalness: 0.0, transparent: true, opacity: 0.36, depthWrite: false,
    }),
    mat_Slider_Weight: new THREE.MeshStandardMaterial({
      color: 0xc8cbd2, roughness: 0.28, metalness: 0.9,
    }),
    mat_Slider_Carriage: new THREE.MeshStandardMaterial({
      color: 0xe0e2e6, roughness: 0.35, metalness: 0.75,
    }),
    mat_Slider_Bearing: new THREE.MeshStandardMaterial({
      color: 0xf2f4f8, roughness: 0.15, metalness: 0.95,
    }),
    mat_Slider_Hardware: new THREE.MeshStandardMaterial({
      color: 0xb4b6bc, roughness: 0.4, metalness: 0.8,
    }),
    default: new THREE.MeshStandardMaterial({
      color: 0xb0b0b5, roughness: 0.4, metalness: 0.5,
    }),
  }

  function getMaterial(matName: string, meshName: string) {
    if (materials[matName]) return materials[matName]
    if (meshName === "Weight") return materials.mat_Slider_Weight
    if (meshName === "base") return materials.mat_Slider_Carriage
    if (meshName.includes("Bearing")) return materials.mat_Slider_Bearing
    if (meshName.includes("Bolt") || meshName.includes("Pillow")) return materials.mat_Slider_Hardware
    return materials.default
  }

  // --- Ground contact shadow ---
  const shadowCanvas = document.createElement("canvas")
  shadowCanvas.width = 128
  shadowCanvas.height = 128
  const shadowCtx = shadowCanvas.getContext("2d")
  if (shadowCtx) {
    const grad = shadowCtx.createRadialGradient(64, 64, 4, 64, 64, 62)
    grad.addColorStop(0, "rgba(0, 0, 0, 0.25)")
    grad.addColorStop(0.35, "rgba(0, 0, 0, 0.10)")
    grad.addColorStop(0.7, "rgba(0, 0, 0, 0.025)")
    grad.addColorStop(1, "rgba(0, 0, 0, 0)")
    shadowCtx.fillStyle = grad
    shadowCtx.fillRect(0, 0, 128, 128)
  }
  const shadowTex = new THREE.CanvasTexture(shadowCanvas)
  const shadowGeo = new THREE.PlaneGeometry(0.52, 0.52)
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
  shadowMesh.rotation.x = -Math.PI / 2
  shadowMesh.position.y = -0.2025
  scene.add(shadowMesh)

  // --- Robot root ---
  const robotRoot = new THREE.Group()
  robotRoot.rotation.x = -Math.PI / 2 // MuJoCo Z-up to three.js Y-up
  scene.add(robotRoot)

  const frameGroup = new THREE.Group()
  const shellGroup = new THREE.Group()
  robotRoot.add(frameGroup)
  robotRoot.add(shellGroup)

  let sliderZGroup: THREE.Group | null = null
  let sliderYGroup: THREE.Group | null = null
  let sliderXGroup: THREE.Group | null = null

  const initialPosZ = new THREE.Vector3()
  const initialPosY = new THREE.Vector3()
  const initialPosX = new THREE.Vector3()

  // Local slide axes in each slider body's local frame
  const localAxisZ = new THREE.Vector3(0, 1, 0)
  const localAxisY = new THREE.Vector3(0, -1, 0)
  const localAxisX = new THREE.Vector3(0, 1, 0)

  // Parent-space slide directions (mutually orthogonal: X, Y, Z)
  const slideDirZ = new THREE.Vector3(0, 0, -1)
  const slideDirY = new THREE.Vector3(0, 1, 0)
  const slideDirX = new THREE.Vector3(-1, 0, 0)

  // Motion parameters
  const stroke = 0.088
  const freq = 1.85
  let lastTime = performance.now()
  let simTime = 0

  function applyShellMode(mode: ShellMode) {
    const shell = materials.mat_ABS_White_2
    if (mode === 1) {
      shellGroup.visible = false
      return
    }
    shellGroup.visible = true
    const translucent = mode === 0
    shell.transparent = translucent
    shell.opacity = translucent ? 0.36 : 1.0
    shell.roughness = 0.92
    shell.metalness = 0.0
    shell.depthWrite = !translucent
    shell.needsUpdate = true
  }

  function buildBodyHierarchy(
    bodyData: any,
    meshScales: Record<string, number[]>,
    geometries: Map<string, THREE.BufferGeometry>
  ): THREE.Group {
    const group = new THREE.Group()
    group.name = bodyData.name
    group.position.set(bodyData.pos[0], bodyData.pos[1], bodyData.pos[2])
    group.quaternion.set(bodyData.quat[0], bodyData.quat[1], bodyData.quat[2], bodyData.quat[3])

    for (const g of bodyData.geoms) {
      const geo = geometries.get(g.mesh)
      if (!geo) continue
      const mesh = new THREE.Mesh(geo, getMaterial(g.mat, g.mesh))
      mesh.name = `${bodyData.name}_${g.mesh}`
      mesh.position.set(g.pos[0], g.pos[1], g.pos[2])
      mesh.quaternion.set(g.quat[0], g.quat[1], g.quat[2], g.quat[3])
      const s = meshScales[g.mesh] || [0.001, 0.001, 0.001]
      mesh.scale.set(s[0], s[1], s[2])
      group.add(mesh)
    }

    for (const child of bodyData.children) {
      group.add(buildBodyHierarchy(child, meshScales, geometries))
    }
    return group
  }

  function assembleRobot(data: any, geometries: Map<string, THREE.BufferGeometry>) {
    for (const b of data.frame_bodies) frameGroup.add(buildBodyHierarchy(b, data.mesh_scales, geometries))
    for (const b of data.shell_bodies) shellGroup.add(buildBodyHierarchy(b, data.mesh_scales, geometries))

    if (data.slider_z) {
      sliderZGroup = buildBodyHierarchy(data.slider_z, data.mesh_scales, geometries)
      initialPosZ.copy(sliderZGroup.position)
      slideDirZ.copy(localAxisZ).applyQuaternion(sliderZGroup.quaternion).normalize()
      robotRoot.add(sliderZGroup)
    }
    if (data.slider_y) {
      sliderYGroup = buildBodyHierarchy(data.slider_y, data.mesh_scales, geometries)
      initialPosY.copy(sliderYGroup.position)
      slideDirY.copy(localAxisY).applyQuaternion(sliderYGroup.quaternion).normalize()
      robotRoot.add(sliderYGroup)
    }
    if (data.slider_x) {
      sliderXGroup = buildBodyHierarchy(data.slider_x, data.mesh_scales, geometries)
      initialPosX.copy(sliderXGroup.position)
      slideDirX.copy(localAxisX).applyQuaternion(sliderXGroup.quaternion).normalize()
      robotRoot.add(sliderXGroup)
    }

    applyShellMode(opts.getShellMode())

    let meshCount = 0
    robotRoot.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshCount++
    })
    ;(window as any).__marbleViewer = { meshes: meshCount, geometries: geometries.size, loaded: true }
  }

  loadAssembly()
    .then(({ data, geometries }) => {
      if (disposed) return
      assembleRobot(data, geometries)
      opts.onReady()
    })
    .catch((err) => {
      if (disposed) return
      console.error("Failed to load MARBLE assembly:", err)
      opts.onError("Couldn't load the 3D model.")
    })

  // --- Resize from the frame's box ---
  const updateSize = () => {
    if (disposed) return
    const w = host.clientWidth
    const h = host.clientHeight
    if (w === 0 || h === 0) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h, false)
  }
  const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateSize)
  ro?.observe(host)
  // Still needed for devicePixelRatio changes (browser zoom), which ResizeObserver does not report.
  window.addEventListener("resize", updateSize, { passive: true })

  // --- Render loop (runs only while the frame is near the viewport) ---
  function tick(now: number) {
    reqId = null
    if (disposed || !visible) return
    reqId = requestAnimationFrame(tick)

    const delta = Math.min(Math.max((now - lastTime) / 1000, 0), 0.1)
    lastTime = now

    if (opts.isMotionOn()) {
      simTime += delta
      const t = simTime * freq
      // Three sliders, 120 degrees out of phase, each along its own parent-space axis
      if (sliderXGroup) sliderXGroup.position.copy(initialPosX).addScaledVector(slideDirX, stroke * Math.sin(t))
      if (sliderYGroup) {
        sliderYGroup.position.copy(initialPosY).addScaledVector(slideDirY, stroke * Math.sin(t + (2 * Math.PI) / 3))
      }
      if (sliderZGroup) {
        sliderZGroup.position.copy(initialPosZ).addScaledVector(slideDirZ, stroke * Math.sin(t + (4 * Math.PI) / 3))
      }
    }

    controls.update(delta)
    renderer.render(scene, camera)
  }

  return {
    setVisible(next) {
      visible = next
      if (disposed) return
      if (visible && reqId === null) {
        lastTime = performance.now()
        reqId = requestAnimationFrame(tick)
      } else if (!visible && reqId !== null) {
        cancelAnimationFrame(reqId)
        reqId = null
      }
    },
    setShellMode(mode) {
      if (!disposed) applyShellMode(mode)
    },
    setReducedMotion(reduced) {
      reducedMotion = reduced
      if (reduced) controls.autoRotate = false
    },
    resetCamera() {
      if (disposed) return
      camera.position.copy(initialCamPos)
      controls.target.copy(initialTarget)
      controls.update()
    },
    dispose() {
      if (disposed) return
      disposed = true
      if (reqId !== null) cancelAnimationFrame(reqId)
      if (idleTimer) clearTimeout(idleTimer)
      ro?.disconnect()
      window.removeEventListener("resize", updateSize)
      canvas.removeEventListener("keydown", onKeyDown)
      canvas.removeEventListener("pointerdown", enableWheelZoom)
      canvas.removeEventListener("focus", enableWheelZoom)
      canvas.removeEventListener("pointerleave", disableWheelZoom)
      canvas.removeEventListener("blur", disableWheelZoom)
      controls.removeEventListener("start", stopAutoRotate)
      controls.removeEventListener("end", scheduleAutoRotate)
      controls.dispose()

      // Geometry is shared through the page-level cache; materials and textures are per instance.
      Object.values(materials).forEach((mat) => mat.dispose())
      shadowMat.dispose()
      shadowTex.dispose()
      shadowGeo.dispose()

      scene.clear()
      renderer.dispose()
      renderer.forceContextLoss() // free the context slot now rather than at GC
      canvas.remove()
    },
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MarbleViewer3D({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)

  const [phase, setPhase] = useState<Phase>("idle")
  const [progressText, setProgressText] = useState(INITIAL_PROGRESS)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [motionOn, setMotionOn] = useState(true)
  const [shellMode, setShellMode] = useState<ShellMode>(0)
  const [hintHidden, setHintHidden] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const motionOnRef = useRef(true)
  const shellModeRef = useRef<ShellMode>(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    motionOnRef.current = motionOn
  }, [motionOn])

  useEffect(() => {
    shellModeRef.current = shellMode
    viewerRef.current?.setShellMode(shellMode)
  }, [shellMode])

  // prefers-reduced-motion: start with sliders paused and auto-rotate off.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    const apply = () => {
      reducedMotionRef.current = mq.matches
      if (mq.matches) {
        motionOnRef.current = false
        setMotionOn(false)
      }
      viewerRef.current?.setReducedMotion(mq.matches)
    }
    apply()
    mq.addEventListener?.("change", apply)
    return () => mq.removeEventListener?.("change", apply)
  }, [])

  // Lazy init: nothing touches WebGL or the network until the frame nears the viewport.
  useEffect(() => {
    const frame = frameRef.current
    const host = canvasHostRef.current
    if (!frame || !host) return

    let disposed = false
    let visible = false
    let viewer: Viewer | null = null
    let unsubscribe: (() => void) | null = null

    const init = () => {
      if (viewer || disposed) return
      setPhase("loading")
      unsubscribe = subscribeProgress((text) => {
        if (!disposed) setProgressText(text)
      })
      viewer = createViewer({
        host,
        reducedMotion: reducedMotionRef.current,
        isMotionOn: () => motionOnRef.current,
        getShellMode: () => shellModeRef.current,
        onReady: () => {
          if (disposed) return
          unsubscribe?.()
          unsubscribe = null
          setPhase("ready")
        },
        onError: (message) => {
          if (disposed) return
          unsubscribe?.()
          unsubscribe = null
          setErrorText(message)
          setPhase("error")
        },
        onInteract: () => {
          if (!disposed) setHintHidden(true)
        },
      })
      viewerRef.current = viewer
      viewer.setVisible(visible)
    }

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver === "undefined") {
      visible = true
      init()
    } else {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[entries.length - 1].isIntersecting
          if (visible) init()
          viewer?.setVisible(visible)
        },
        { rootMargin: LAZY_ROOT_MARGIN }
      )
      io.observe(frame)
    }

    return () => {
      disposed = true
      io?.disconnect()
      unsubscribe?.()
      viewer?.dispose()
      if (viewerRef.current === viewer) viewerRef.current = null
    }
  }, [attempt])

  const retry = () => {
    setErrorText(null)
    setProgressText(INITIAL_PROGRESS)
    setPhase("idle")
    setAttempt((n) => n + 1)
  }

  // Arrow keys move between toolbar buttons (Tab still visits each one).
  const onToolbarKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") return
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"))
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (index === -1) return
    e.preventDefault()
    const last = buttons.length - 1
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? last : e.key === "ArrowRight" ? (index === last ? 0 : index + 1) : index === 0 ? last : index - 1
    buttons[next]?.focus()
  }

  const shell = SHELL_MODES[shellMode]
  const nextShell = SHELL_MODES[(shellMode + 1) % 3]
  const ShellIcon = shell.Icon

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={frameRef}
        role="region"
        aria-label="Interactive 3D model of MARBLE internal mechanism and mass sliders"
        className="relative aspect-[4/3] w-full overflow-hidden border bg-gradient-to-b from-muted/30 to-muted/80 sm:aspect-[16/10]"
      >
        {/* The viewer appends its own <canvas> here; React never renders into this node. */}
        <div ref={canvasHostRef} className="absolute inset-0" />

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm border bg-background/85 px-2 py-1 text-[11px] leading-none text-muted-foreground transition-opacity duration-300 motion-reduce:transition-none",
            phase === "ready" && !hintHidden ? "opacity-100" : "opacity-0"
          )}
        >
          <Move3d className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Drag to rotate · Click, then scroll to zoom</span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div role="status" aria-live="polite" className="flex items-center justify-center gap-2.5">
            {phase === "idle" && (
              <>
                <Box className="h-5 w-5 text-muted-foreground/70" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">3D model loads when visible</span>
              </>
            )}
            {phase === "loading" && (
              <>
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary motion-reduce:animate-none"
                />
                <span className="text-xs text-muted-foreground">{progressText}</span>
              </>
            )}
            {phase === "ready" && <span className="sr-only">3D model loaded</span>}
            {phase === "error" && (
              // The dark theme's --destructive is too dark to read on the muted frame, so fall back to foreground there.
              <p className="max-w-xs text-sm text-destructive dark:text-foreground">{errorText}</p>
            )}
          </div>
          {phase === "error" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="pointer-events-auto gap-1.5 rounded-sm text-xs"
              onClick={retry}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Try again
            </Button>
          )}
        </div>
      </div>

      <div
        role="toolbar"
        aria-label="3D model controls"
        className="mt-3 flex flex-wrap gap-2"
        onKeyDown={onToolbarKeyDown}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-sm text-xs"

          title={motionOn ? "Pause the mass slider motion" : "Play the mass slider motion"}
          onClick={() => setMotionOn((on) => !on)}
        >
          {motionOn ? (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {motionOn ? "Pause sliders" : "Play sliders"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-sm text-xs"
          title={`Switch the outer shell to ${nextShell.name}`}
          onClick={() => setShellMode((mode) => ((mode + 1) % 3) as ShellMode)}
        >
          <ShellIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {`Shell: ${shell.name}`}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-sm text-xs"
          title="Return the camera to the starting angle"
          onClick={() => viewerRef.current?.resetCamera()}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset view
        </Button>
      </div>
    </div>
  )
}

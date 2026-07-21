"use client"

import { useEffect, useState } from "react"
import { Github, Star, GitFork, Users, BookMarked, ExternalLink } from "lucide-react"

const GITHUB_USERNAME = "NikoWeaver"

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
}

type Profile = {
  public_repos: number
  followers: number
  following: number
  html_url: string
}

type Stats = {
  profile: Profile
  totalStars: number
  totalForks: number
  topRepos: Repo[]
  languages: { name: string; count: number }[]
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  MATLAB: "#e16737",
  Arduino: "#00979D",
}

function langColor(name: string) {
  return LANGUAGE_COLORS[name] ?? "hsl(var(--primary))"
}

export function GitHubAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API error")

        const profile: Profile = await profileRes.json()
        const repos: Repo[] = await reposRes.json()

        const owned = repos.filter((r) => !r.fork)
        const totalStars = owned.reduce((sum, r) => sum + r.stargazers_count, 0)
        const totalForks = owned.reduce((sum, r) => sum + r.forks_count, 0)

        const topRepos = [...owned].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4)

        const langCounts = new Map<string, number>()
        for (const r of owned) {
          if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1)
        }
        const languages = [...langCounts.entries()]
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6)

        if (!cancelled) setStats({ profile, totalStars, totalForks, topRepos, languages })
      } catch {
        if (!cancelled) setError(true)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const summary = stats && [
    { label: "Repositories", value: stats.profile.public_repos, Icon: BookMarked },
    { label: "Total Stars", value: stats.totalStars, Icon: Star },
    { label: "Total Forks", value: stats.totalForks, Icon: GitFork },
    { label: "Followers", value: stats.profile.followers, Icon: Users },
  ]

  const langTotal = stats?.languages.reduce((sum, l) => sum + l.count, 0) ?? 0

  return (
    <section id="github" className="container mx-auto px-4 py-16">
      <h2 className="mb-3 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        GitHub Analytics
      </h2>
      <p className="mx-auto mb-12 flex max-w-xl items-center justify-center gap-2 text-center text-muted-foreground">
        <Github className="h-4 w-4" />
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          @{GITHUB_USERNAME}
        </a>
      </p>

      {error ? (
        <p className="text-center text-muted-foreground">
          Couldn&apos;t load GitHub data right now.{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View profile on GitHub
          </a>
          .
        </p>
      ) : (
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Summary stat cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {(summary ?? Array.from({ length: 4 })).map((item, i) => (
              <div
                key={item ? item.label : i}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card p-5 text-center transition-colors hover:border-primary/50"
              >
                {item ? (
                  <>
                    <item.Icon className="h-6 w-6 text-primary" />
                    <span className="font-display text-3xl font-bold tabular-nums">{item.value}</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</span>
                  </>
                ) : (
                  <div className="h-[92px] w-full animate-pulse rounded-md bg-muted" />
                )}
              </div>
            ))}
          </div>

          {/* Top languages */}
          <div>
            <h3 className="eyebrow mb-4 text-center text-xs font-semibold uppercase text-muted-foreground">
              Most Used Languages
            </h3>
            {stats ? (
              <div className="rounded-lg border bg-card p-5">
                <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  {stats.languages.map((l) => (
                    <div
                      key={l.name}
                      style={{ width: `${(l.count / langTotal) * 100}%`, backgroundColor: langColor(l.name) }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                  {stats.languages.map((l) => (
                    <div key={l.name} className="flex items-center gap-2 text-sm">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: langColor(l.name) }}
                        aria-hidden="true"
                      />
                      <span className="font-medium">{l.name}</span>
                      <span className="text-muted-foreground">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
            )}
          </div>

          {/* Top repositories */}
          <div>
            <h3 className="eyebrow mb-4 text-center text-xs font-semibold uppercase text-muted-foreground">
              Popular Repositories
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats
                ? stats.topRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
                    >
                      <div className="flex items-center gap-2">
                        <BookMarked className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="truncate font-medium">{repo.name}</span>
                        <ExternalLink className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
                        {repo.description ?? "No description provided."}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: langColor(repo.language) }}
                              aria-hidden="true"
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 w-full animate-pulse rounded-lg bg-muted" />
                  ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

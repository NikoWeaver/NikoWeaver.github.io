import type { Theme } from "@/lib/themes"
import { skillGroups } from "@/lib/home-content"
import { cn } from "@/lib/utils"

/**
 * The skills inventory, three ways.
 *
 * Twenty-three items is well past what anyone holds in working memory, so
 * every layout keeps the five named groups doing the chunking: one coarse
 * decision (which group?) then one fine one (which tool?), instead of a flat
 * scan of twenty-three peers.
 */
export function Skills({ theme }: { theme: Theme }) {
  switch (theme.layout.skills) {
    case "columns":
      return <SkillColumns theme={theme} />
    case "table":
      return <SkillTable theme={theme} />
    default:
      return <SkillChips theme={theme} />
  }
}

/* ----------------------------------------------------------------- chips --
   Logo tile + name + detail. The logo is a genuine recognition shortcut — a
   familiar mark is identified faster than its name is read.                  */
function SkillChips({ theme }: { theme: Theme }) {
  const centered = theme.layout.headingAlign === "center"
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {skillGroups.map((group) => (
        <div key={group.label}>
          <h3
            className={cn(
              "eyebrow mb-4 font-meta text-xs font-semibold uppercase text-muted-foreground",
              centered && "text-center",
            )}
          >
            {group.label}
          </h3>
          <ul className={cn("flex flex-wrap gap-4", centered && "justify-center")}>
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                className="flex w-56 items-center gap-3 rounded-[var(--radius)] border border-border bg-card p-3 shadow-theme transition-colors hover:border-foreground"
              >
                {skill.logo && (
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[var(--radius)] bg-background p-2 ring-1 ring-border dark:bg-white/90">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={skill.logo} alt="" className="max-h-full max-w-full object-contain" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{skill.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{skill.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- columns --
   Group label parked in a narrow left column, the tools set as running text
   at the right. Two alignment axes, no boxes: the same grouping done with
   position alone.                                                            */
function SkillColumns({ theme }: { theme: Theme }) {
  return (
    <dl className="border-t border-border">
      {skillGroups.map((group) => (
        <div key={group.label} className="grid gap-x-8 gap-y-3 border-b border-border py-6 md:grid-cols-[14rem_1fr]">
          <dt className="eyebrow font-meta text-xs font-semibold uppercase text-muted-foreground">{group.label}</dt>
          <dd className="flex flex-wrap gap-x-6 gap-y-2">
            {group.skills.map((skill) => (
              <span key={skill.name} className="inline-flex items-baseline gap-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.detail}</span>
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ----------------------------------------------------------------- table --
   One row per group, tools as a single comma-separated field. The densest
   possible statement of the same inventory.                                  */
function SkillTable({ theme }: { theme: Theme }) {
  const bracket = theme.layout.decor === "brackets"
  return (
    <table className="w-full border-collapse text-left align-top">
      <caption className="sr-only">Technical skills by group</caption>
      <tbody>
        {skillGroups.map((group) => (
          <tr key={group.label} className="border-b border-border first:border-t">
            <th
              scope="row"
              className="eyebrow w-[16rem] py-3 pr-6 align-top font-meta text-[0.6875rem] font-semibold uppercase text-muted-foreground"
            >
              {bracket ? `[${group.label}]` : group.label}
            </th>
            <td className="py-3 font-meta text-sm">
              {group.skills.map((skill, i) => (
                <span key={skill.name}>
                  {i > 0 && <span className="text-muted-foreground/50">{bracket ? " / " : ", "}</span>}
                  <span title={skill.detail}>{skill.name}</span>
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

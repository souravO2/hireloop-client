// Sidebar filters for the Browse Jobs page — from the Figma
// "Aside - Sidebar Filters" (labels 13px #A0A0AB, counts #6E6E78,
// filter groups stacked in one #141418 card).
//
// Job Type and Job Category are single-select (radio inputs); Work
// Arrangement is a checkbox. Counts are computed at render from the
// current job list. Each change pushes its query param (see
// FilterChecklist) so the page refetches server-side; `filters` keeps
// the inputs checked to match the URL on load and refresh.

import {
  FilterChecklist,
  FilterOption,
} from "@/components/shared/filterCheckList"
import { JOB_CATEGORIES, JOB_TYPES, JobRow } from "@/lib/type/jobs"

/** Job counts per facet, mirrored in the Figma sidebar ("Full-time  1.2k"). */
const countOptions = (
  facet: (job: JobRow) => string,
  allOptions: readonly string[],
  jobs: readonly JobRow[]
): FilterOption[] =>
  allOptions.map((option) => ({
    value: option,
    label: option,
    count: jobs.filter((job) => facet(job) === option).length,
  }))

export function JobFiltersPanel({
  jobs,
  filters,
}: {
  jobs: readonly JobRow[]
  /** Current URL params — a value present here renders as checked. */
  filters?: URLSearchParams
}) {
  /** Value of `name` in the URL as a single-element list (or empty). */
  const checked = (name: string): string[] => {
    const value = filters?.get(name)
    return value ? [value] : []
  }

  return (
    <section className="surface-card p-6">
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#EDEDEF]">
        Filters
      </h2>

      <div className="mt-7 flex flex-col gap-6">
        <FilterChecklist
          legend="Job Type"
          name="jobType"
          multiple={false}
          options={countOptions((job) => job.jobType, JOB_TYPES, jobs)}
          defaultValue={checked("jobType")}
        />
        <FilterChecklist
          legend="Job Category"
          name="category"
          multiple={false}
          options={countOptions((job) => job.category, JOB_CATEGORIES, jobs)}
          defaultValue={checked("category")}
        />
        <FilterChecklist
          legend="Work Arrangement"
          name="isRemote"
          defaultValue={checked("isRemote")}
          options={[
            {
              // The API only treats `isRemote=true` as "remote only".
              value: "true",
              label: "Remote only",
              count: jobs.filter((job) => job.isRemote).length,
            },
          ]}
        />
      </div>
    </section>
  )
}

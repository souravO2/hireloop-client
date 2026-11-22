import { getJobs } from "@/lib/api/jobs"
import { JobSearchBar } from "./jobSearchBar"
import { JobFiltersPanel } from "./jobsFilterPanel"
import JobCard from "@/components/shared/JobCard"
import type { JobRow } from "@/lib/type/jobs"

const resultsHeadingClass =
  "text-[22px] font-semibold tracking-[-0.02em] text-[#EDEDEF]"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams

  // searchParams values may be string[] (repeated keys) or undefined —
  // keep the first non-empty value of each param.
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(search)) {
    const v = Array.isArray(value) ? value[0] : value
    if (typeof v === "string" && v) params.append(key, v)
  }

  // getJobs resolves to undefined when the API is unreachable.
  const jobs: JobRow[] = (await getJobs(params.toString())) ?? []

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Search & primary action */}
      <JobSearchBar defaultValue={params.get("search") ?? ""} />

      {/* Sidebar filters + job list */}
      <div className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-8">
        <aside>
          <JobFiltersPanel jobs={jobs} filters={params} />
        </aside>

        <section>
          {/* Results heading */}
          <h2 className={resultsHeadingClass}>
            Found {jobs.length} Professional Jobs
          </h2>

          {/* Job list (replaced by the Figma job card when wired) */}
          <ul className="mt-4 flex list-none flex-col gap-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
            {jobs.length === 0 ? (
              <li className="surface-card p-10 text-center text-sm text-[#6E6E78]">
                No jobs match your current search.
              </li>
            ) : null}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default BrowseJobsPage

// Job details — public page under Browse Jobs, from the Figma
// "Public / Job Details" (header card, bento info grid, content
// sections, company overview sidebar).
//
// The detail page resolves the job via GET /jobs/:id
// (lib/api/jobs.ts); unknown ids render the not-found page.

import { notFound } from "next/navigation"
import { JobHeaderCard } from "./jobHeaderCard"
import { JobHighlights } from "./jobHighlights"
import { JobContentCard } from "./jobContentCard"
import { CompanyOverviewCard } from "./companyOverviewCard"
import { getJobById } from "@/lib/api/jobs"

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) notFound()

  return (
    <>
      <main className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6">
        <JobHeaderCard job={job} />

        <div className="mt-6 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_397px] lg:gap-6">
          <div className="flex min-w-0 flex-col gap-6">
            <JobHighlights job={job} />
            <JobContentCard job={job} />
          </div>

          <div>
            <CompanyOverviewCard job={job} />
          </div>
        </div>
      </main>
    </>
  )
}

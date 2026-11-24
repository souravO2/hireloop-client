import type { JobRow, JobStatus } from "@/lib/type/jobs"
import { ApplicationRow } from "../type/applications"
import { formatRelativeTime } from "../formatter"
import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Raw GET /jobs document. Legacy/seeded rows predate several JobFormData
// fields (`recruiterId`, `applicants`, `status`, `posted` are missing from
// most documents) and `status` has been written as "Active" as well as
// "active", so they are optional here and filled in by toJobRow before any
// caller sees a JobRow.
type JobRecord = Omit<
  JobRow,
  "recruiterId" | "applicants" | "status" | "posted"
> & {
  recruiterId?: string
  applicants?: number
  status?: string
  posted?: string
}

/** "Active" | "active" | "expired" → the JobStatus union; unknown → undefined. */
const toStatus = (status?: string): JobStatus | undefined =>
  status?.toLowerCase() === "active" || status?.toLowerCase() === "expired"
    ? (status.toLowerCase() as JobStatus)
    : undefined

/**
 * MongoDB ObjectId: the first 4 bytes are the document's creation time as
 * hex seconds — used as the post date for rows the API never populated.
 */
const createdAtFromId = (id: string): string | null => {
  if (!/^[0-9a-f]{8}/i.test(id)) return null
  return new Date(parseInt(id.slice(0, 8), 16) * 1000).toISOString()
}

const isPastDeadline = (deadline?: string) =>
  Boolean(deadline) && new Date(deadline as string).getTime() < Date.now()

/** Adapter: sparse API document → the complete JobRow every page expects. */
const toJobRow = (raw: JobRecord): JobRow => {
  const createdAt = createdAtFromId(raw._id)
  return {
    ...raw,
    _id: raw._id,
    recruiterId: raw.recruiterId ?? "",
    applicants: raw.applicants ?? 0,
    // Rows without a status are classified by their deadline instead.
    status:
      toStatus(raw.status) ??
      (isPastDeadline(raw.deadline) ? "expired" : "active"),
    posted:
      raw.posted ??
      (createdAt
        ? `Posted ${formatRelativeTime(createdAt)}`
        : "Posted date unavailable"),
  }
}

export const getJobs = async (query: string = ""): Promise<JobRow[]> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs?${query}`, { cache: "no-store" })
    const data: unknown = await res.json()
    // Error payloads aren't arrays — degrade to the empty state instead of
    // handing callers a value their JobRow[] contract can't describe.
    if (!Array.isArray(data)) return []
    return (data as JobRecord[]).map(toJobRow)
  } catch (err) {
    console.log(err)
    // Transport failure degrades to the empty state instead of undefined.
    return []
  }
}

export const getJobById = async (jobId: string): Promise<JobRow | null> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, { cache: "no-store" })
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== "object") return null
    return toJobRow(data as JobRecord)
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getApplications = async (
  query = ""
): Promise<ApplicationRow[]> => {
  const api = `${BASE_URL}/applications?${query}`
  const res = await authFetch(api)
  return res.json()
}

export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)
  return res.json()
}

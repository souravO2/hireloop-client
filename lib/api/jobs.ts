import type { JobRow } from "@/lib/type/jobs"
import { ApplicationRow } from "../type/applications"
import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getJobs = async (query: string = "") => {
  try {
    const res = await fetch(`${BASE_URL}/jobs?${query}`, { cache: "no-store" })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const getJobById = async (jobId: string): Promise<JobRow | null> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, { cache: "no-store" })
    if (!res.ok) return null
    return await res.json()
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

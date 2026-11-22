import { JobFormData } from "../type/jobs"
import { ApplicationFormData } from "../type/applications"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createJob = async (data: JobFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const deleteJob = async (jobID: string) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${jobID}`, {
      method: "DELETE",
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

export const createApplication = async (data: ApplicationFormData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const updateApplicationStatus = async (
  id: string,
  data: { status: string }
) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const updateUserRole = async (
  userId: string,
  role: "admin" | "recruiter" | "seeker"
) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ role }),
  })
  return res.json()
}

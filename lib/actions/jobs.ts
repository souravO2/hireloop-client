"use server"

import { JobFormData } from "../type/jobs"
import { ApplicationFormData } from "../type/applications"
import { protectedMutaion } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createJob = async (data: JobFormData) => {
  try {
    const api = `${BASE_URL}/jobs`
    const res = await protectedMutaion(api, "POST", data)
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
  const api = `${BASE_URL}/applications`
  const res = await protectedMutaion(api, "POST", data)
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
  const api = `${BASE_URL}/users/${userId}/role`
  const res = await protectedMutaion(api, "PATCH", { role })
  return res.json()
}

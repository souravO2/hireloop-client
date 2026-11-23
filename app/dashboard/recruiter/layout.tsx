import { requireRole } from "@/lib/core/server"
import React from "react"

const RecruiterLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("recruiter") // Ensure the user has the 'recruiter' role before rendering the page
  return children
}

export default RecruiterLayout

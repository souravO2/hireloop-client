import { requireRole } from "@/lib/core/server"
import React from "react"

const SeekerLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("seeker") // Ensure the user has the 'seeker' role before rendering the page
  return children
}

export default SeekerLayout

import { requireRole } from "@/lib/core/server"
import React from "react"

const AdminLayoutPage = async ({ children }: { children: React.ReactNode }) => {
  await requireRole("admin") // Ensure the user has the 'admin' role before rendering the page
  return children
}

export default AdminLayoutPage

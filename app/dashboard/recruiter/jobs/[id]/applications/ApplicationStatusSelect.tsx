"use client"

import {
  APPLICATION_STATUSES,
  ApplicationStatus,
  STATUS_META,
} from "@/lib/type/applications"
// Native select for changing an application's status. Rendering only —
// persistence is the caller's responsibility (the recruiter applications
// page wires the DB update separately).

import { cn } from "@/lib/utils"

export function ApplicationStatusSelect({
  value,
  onChange,
  className,
}: {
  value: ApplicationStatus
  onChange: (status: ApplicationStatus) => void
  className?: string
}) {
  return (
    <select
      aria-label="Update application status"
      value={value}
      onChange={(event) => onChange(event.target.value as ApplicationStatus)}
      className={cn(
        "surface-field h-9 rounded-md px-2.5 text-[13px] text-[#EDEDEF] capitalize",
        className
      )}
    >
      {APPLICATION_STATUSES.map((status) => (
        <option key={status} value={status} className="bg-[#1A1A1F]">
          {STATUS_META[status].label}
        </option>
      ))}
    </select>
  )
}

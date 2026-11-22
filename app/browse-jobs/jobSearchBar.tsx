"use client"

// Search bar for the Browse Jobs page — mirrors the Figma
// "Section - Search & Quick Filters".
//
// Submit writes ?search=… while preserving the filter params already
// in the URL (jobType, category, isRemote); clearing the field removes
// the param entirely.

import { useRouter } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

export function JobSearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const field = new FormData(event.currentTarget).get("searchField")
    const search = typeof field === "string" ? field.trim() : ""

    // Start from the current URL so active filters survive the search.
    const params = new URLSearchParams(window.location.search)
    if (search) params.set("search", search)
    else params.delete("search")

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="surface-card flex flex-col gap-3 p-6 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8E9192]"
        />
        <Input
          name="searchField"
          aria-label="Search jobs"
          placeholder="Search by job title, keywords..."
          defaultValue={defaultValue}
          className="surface-field h-12 w-full pr-3 pl-10 text-sm text-[#EDEDEF] placeholder:text-[#A0A0AB]"
        />
      </div>
      <button
        type="submit"
        className={cn(
          buttonVariants(),
          "bg-white text-[#2F3131] hover:bg-white/90 sm:h-12"
        )}
      >
        Search Jobs
      </button>
    </form>
  )
}

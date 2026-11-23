"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { ROLE_META, UserRole } from "@/lib/type/user"
import { PlusCircle } from "lucide-react"
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  Users,
  Wallet,
  Settings,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "./shared/user-avatar"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const homeItem: MenuItem = { id: "home", name: "Home", url: "/", icon: Home }

// Sidebar nav from the `HL 2.0/Sidebar` Figma component (per-role variants).
const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Briefcase,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: Wallet,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "my-company",
      name: "My Company",
      url: "/dashboard/recruiter/my-company",
      icon: Building2,
    },
    {
      id: "manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "add-job",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role: UserRole = session?.user?.role || "seeker"

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Signed-in user: avatar + name + role */}
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <UserAvatar
            src={session?.user?.image}
            name={session?.user?.name}
            className="size-9"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-[#EDEDEF]">
              {isPending ? "…" : session?.user?.name}
            </span>
            <span className="truncate text-xs text-[#6E6E78]">
              {ROLE_META[role].label}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* Shared across all roles: back to the public site */}
            <SidebarMenuItem key={homeItem.id}>
              <SidebarMenuButton render={<Link href={homeItem.url} />}>
                <homeItem.icon />
                <span>{homeItem.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<Link href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

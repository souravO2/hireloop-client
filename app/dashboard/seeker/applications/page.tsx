// My Applications — seeker dashboard page, from the Figma
// "Seeker / My Applications" (stats bento + applications table).
//
// Serves the dummy applications for now; swap the import for the real
// loader (getApplications by user id) when the backend endpoint is ready.
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { PageContainer } from "../../page-shell"
import { ApplicationsBoard } from "./applicationBoard"
import { getApplications } from "@/lib/api/jobs"

export default async function MyApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const applications = await getApplications(`applicantId=${session?.user.id}`)

  return (
    <PageContainer width="wide">
      <ApplicationsBoard applications={applications} />
    </PageContainer>
  )
}

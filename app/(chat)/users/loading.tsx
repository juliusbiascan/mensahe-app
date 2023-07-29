import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardUsersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="People"
      >
      </DashboardHeader>
      <div className="grid gap-2">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
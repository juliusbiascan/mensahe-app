import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardConversationLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Chats"
      >
      </DashboardHeader>
      <div className="grid gap-2">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/nav"
import UserNav from "@/components/UserNav"

import getCurrentUser from "@/actions/getCurrentUser";
import getSession from "@/actions/getSession";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="text-2xl font-bold">
            Mensahe
          </div>
          <div className="flex justify-center gap-2 items-center">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
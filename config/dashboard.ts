import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Conversations",
      href: "/conversations",
      icon: "message_circle",
    },
    {
      title: "People",
      href: "/users",
      icon: "users",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
}
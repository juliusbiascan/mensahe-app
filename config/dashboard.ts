import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Conversations",
      href: "/conversations",
      icon: "post",
    },
    {
      title: "People",
      href: "/users",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
}
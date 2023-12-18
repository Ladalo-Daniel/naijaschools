import React from "react"
import { LayoutDashboardIcon, Settings, User, User2, Users, Users2Icon } from 'lucide-react'
 

export const side_bar_links: {
    href: string,
    icon: React.JSX.Element,
    activeIcon: React.JSX.Element,
    tooltip: string,
  }[] = [
    {
      href: "/dashboard",
      icon: <LayoutDashboardIcon />,
      activeIcon: <LayoutDashboardIcon />,
      tooltip: "Dashboard",
    },
    {
      href: "/dashboard/profile",
      icon: <User />,
      activeIcon: <User2 />,
      tooltip: "Profile",
    },
    {
      href: "/dashboard/community",
      icon: <Users />,
      activeIcon: <Users2Icon />,
      tooltip: "Community",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings/>,
      activeIcon: <Settings />,
      tooltip: "Settings",
    },
  ]
  
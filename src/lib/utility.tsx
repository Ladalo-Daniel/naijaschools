import React from "react"
import { BookCheckIcon, BookIcon, Building2, LayoutDashboardIcon, LucideUsers2, Settings, Settings2, User, User2, Users, Users2Icon } from 'lucide-react'
import { getProfile } from "@/supabase/user"
import { QuestionMarkIcon } from "@radix-ui/react-icons"

async function hideRolesRoute() {
  const profile = await getProfile()
  return profile
}

export const side_bar_links: {
    href: string,
    icon: React.JSX.Element,
    activeIcon: React.JSX.Element,
    tooltip: string,
    hidden?: boolean
  }[] = [
    {
      href: "/dashboard",
      icon: <LayoutDashboardIcon size={18}/>,
      activeIcon: <LayoutDashboardIcon size={18} />,
      tooltip: "Dashboard",
    },
    {
      href: "/dashboard/profile",
      icon: <User size={18} />,
      activeIcon: <User2 size={18} />,
      tooltip: "Profile",
    },
    {
      href: "/dashboard/institutions",
      icon: <Building2 size={18} />,
      activeIcon: <Building2 size={18} />,
      tooltip: "Institutions",
      hidden: true,
    },
    {
      href: "/dashboard/courses",
      icon: <BookIcon size={18} />,
      activeIcon: <BookIcon size={18} />,
      tooltip: "Courses",
      hidden: true
    },
    {
      href: "/dashboard/s/quiz",
      icon: <BookCheckIcon size={18} />,
      activeIcon: <BookCheckIcon size={18} />,
      tooltip: "Quiz",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings2 size={18}/>,
      activeIcon: <Settings2 size={18} />,
      tooltip: "Settings",
    },
    {
      href: "/dashboard/students",
      icon: <LucideUsers2 size={18} />,
      activeIcon: <Users2Icon size={18} />,
      tooltip: "Students",
      hidden: true
    },
    {
      href: "/dashboard/teachers",
      icon: <Users2Icon size={18} />,
      activeIcon: <Users2Icon size={18} />,
      tooltip: "Teachers",
      hidden: true,
    },
    {
      href: "/dashboard/questions",
      icon: <QuestionMarkIcon width={18} />,
      activeIcon: <QuestionMarkIcon width={18} />,
      tooltip: "Questions",
      hidden: true
    },
    {
      href: "/dashboard/community",
      icon: <Users2Icon size={18} />,
      activeIcon: <Users2Icon size={18} />,
      tooltip: "Community",
    },
  ]
  
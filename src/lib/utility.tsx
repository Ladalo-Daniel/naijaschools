import React from "react"
import { Book, BookAIcon, BookCheckIcon, BookIcon, Bookmark, BookmarkCheck, Brain, BrainCircuit, Building2, CircuitBoard, LayoutDashboardIcon, LucideIcon, LucideUsers2, Medal, PersonStandingIcon, Plus, PodcastIcon, Settings, Settings2, Sparkle, User, User2, Users, Users2Icon } from 'lucide-react'
import { getProfile } from "@/supabase/user"

async function hideRolesRoute() {
  const profile = await getProfile()
  return profile
}

export const side_bar_links: {
    href: string,
    icon: LucideIcon,
    activeIcon?: LucideIcon,
    tooltip: string,
    hidden?: boolean
  }[] = [
    {
      href: "/dashboard",
      icon: LayoutDashboardIcon,
      activeIcon: LayoutDashboardIcon,
      tooltip: "Dashboard",
    },
    {
      href: "/dashboard/posts",
      icon: PodcastIcon,
      activeIcon: PodcastIcon,
      tooltip: "Posts",
    },
    {
      href: "/dashboard/profile",
      icon: User,
      activeIcon: User2,
      tooltip: "Profile",
    },
    {
      href: "/dashboard/institutions",
      icon: Building2,
      activeIcon: Building2,
      tooltip: "Institutions",
      hidden: true,
    },
    {
      href: "/dashboard/courses",
      icon: BookIcon,
      activeIcon: BookIcon,
      tooltip: "Courses",
      hidden: true
    },
    {
      href: "/dashboard/chat",
      icon: Sparkle,
      activeIcon: Sparkle,
      tooltip: "AI Chat",
    },
    {
      href: "/dashboard/s/quiz",
      icon: BookCheckIcon,
      activeIcon: BookCheckIcon,
      tooltip: "Quiz",
    },
    {
      href: "/dashboard/bookmarks",
      icon: Bookmark,
      activeIcon: BookmarkCheck,
      tooltip: "Bookmarks",
    },
    {
      href: "/dashboard/settings",
      icon: Settings2,
      activeIcon: Settings2,
      tooltip: "Settings",
    },
    {
      href: "/dashboard/learn",
      icon: CircuitBoard,
      tooltip: "Learn",
    },
    {
      href: "/dashboard/scholarships",
      icon: Medal,
      tooltip: "Scholarships",
    },
    {
      href: "/dashboard/job-listings",
      icon: PersonStandingIcon,
      activeIcon: Users2Icon,
      tooltip: "Jobs",
      hidden: true
    },
    {
      href: "/dashboard/students",
      icon: LucideUsers2,
      activeIcon: Users2Icon,
      tooltip: "Students",
      hidden: true
    },
    {
      href: "/dashboard/teachers",
      icon: Users2Icon,
      activeIcon: Users2Icon,
      tooltip: "Teachers",
      hidden: true,
    },
    {
      href: "/dashboard/questions",
      icon: BrainCircuit,
      activeIcon: BrainCircuit,
      tooltip: "Questions",
      hidden: true
    },
    {
      href: "/dashboard/community",
      icon: Users2Icon,
      activeIcon: Users2Icon,
      tooltip: "Community",
      hidden: true
    },
    {
      href: "/dashboard/create-article",
      icon: Plus,
      tooltip: "Create Article",
      hidden: true
    },
    {
      href: "/articles",
      icon: Book,
      tooltip: "Articles",
    },
    {
      href: "/dashboard/articles",
      icon: BookAIcon,
      tooltip: "Articles (admin)",
      hidden: true
    },
  ]
  
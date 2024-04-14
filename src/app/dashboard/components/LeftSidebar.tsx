'use client'

import { side_bar_links } from '@/lib/utility'
import { cn } from '@/lib/utils'
import { User } from '@/supabase/user'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSidebar = ({ profile }: { profile?: User }) => {
  const path = usePathname()

  const isRootRouteActive = path.startsWith('/dashboard/posts');

  return (
    <nav className='leftsidebar dark:bg-secondary shadow-lg z-50 min-h-screen bg-zinc-800 border border-r-gray-100 dark:border-r-gray-800 relative'>
      <div className="fixed h-full overflow-auto dark:bg-secondary bg-zinc-800 text-white flex flex-col gap-4 min-h-screen left-0 min-w-[250px]">
      <Link href={'/'} className={'md:flex items-end p-4 gap-1'}>
        <Image src={'/logos/logo.png'} width={30} height={30} alt="logo" />
        <h2 className="text-muted-foreground hidden md:block text-2xl -mt-2">Naijaschools</h2>
      </Link>
        <div className='flex flex-col gap-2 overflow-auto custom-scrollbar w-full p-2'>
          {side_bar_links.map(link => (
            <Link key={link.tooltip} href={link.href} className={cn("flex items-center hover:bg-gray-500 hover:text-gray-50 transition-all gap-2 p-2 py-5 rounded-sm", {
              "bg-gray-700 text-green-50 shadow-sm transition-all": isRootRouteActive && link.href.startsWith('/dashboard/posts') || path === link.href,
              "hidden": !(profile?.role === "admin" || profile?.role === "staff") && link.hidden,
            })}>
              <link.icon size={24} />
              <span>{link.tooltip}</span>
          </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default LeftSidebar
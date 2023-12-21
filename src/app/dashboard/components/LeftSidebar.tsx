'use client'

import { side_bar_links } from '@/lib/utility'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LeftSidebar = () => {
  const path = usePathname()
  return (
<<<<<<< HEAD
    <nav className='leftsidebar dark:bg-secondary bg-background z-20 min-h-screen relative border-r-gray-200 shadow-sm border'>
      <div className="fixed  h-full overflow-auto">
        <div className='flex flex-col gap-6 overflow-auto custom-scrollbar'>
=======
    <nav className='leftsidebar dark:bg-secondary bg-background z-20 min-h-screen relative'>
      <div className="fixed h-full overflow-auto flex flex-col gap-4 left-0 min-w-[250px]">
      <Link href={'/'} className={''}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>
        <div className='flex flex-col gap-6 overflow-auto custom-scrollbar w-full p-2'>
>>>>>>> 0662fdc3a59c2f32d55952b23011ef323d8e3923
          {side_bar_links.map(link => (
            <Link key={link.tooltip} href={link.href} className={cn("flex items-center hover:bg-gray-500 hover:text-gray-50 transition-all gap-2 p-2 rounded-md", {
              "bg-primary text-green-50 shadow-sm transition-all": path === link.href,
            })}>
              {link.icon}
              <span>{link.tooltip}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default LeftSidebar
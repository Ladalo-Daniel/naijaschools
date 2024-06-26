"use client"

import React from 'react'
import { Menu } from 'lucide-react'
import { Button as ShadButton } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { side_bar_links } from '@/lib/utility'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@/supabase/user'

const MobileSidebar = ({ profile }: { profile?: User }) => {
    const path = usePathname()

  const isRootRouteActive = path.startsWith('/dashboard/institutions');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShadButton variant={'ghost'} className='flex items-center gap-2 md:hidden'><Menu size={20} /></ShadButton>
      </SheetTrigger>
      <SheetContent className='md:hidden min-h-screen overflow-auto mt-0 pt-0 bg-zinc-800 text-white dark:bg-secondary' side={'left'}>
        <SheetHeader className='flex flex-col flex-1 items-start pt-0 mt-0'>
          <SheetTitle>
          <div className="justify-between md:hidden items-center gap-4 my-2.5">
            <Link href={'/'} passHref className="flex gap-1 items-center">
              <Image 
                src={'/logos/logo.png'}
                width={500}
                height={500}
                quality={100}
                alt='Naijaschools logo'
                className='w-6 h-6 mr-4'
              />
              <span className="dark:text-fore-ground text-green-50">Naijaschools</span>
            </Link>
          </div>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-auto min-h-screen">
        <div className='flex flex-col gap-2 overflow-auto custom-scrollbar'>
          {side_bar_links.map(link => (
            <SheetClose key={link.tooltip} asChild className="p-3 py-4 hover:bg-gray-500 hover:text-gray-50">
                <Link key={link.tooltip} href={link.href} className={cn("flex p-3 items-center transition-all gap-2 p-2 rounded-sm", {
                "bg-primary text-gray-600 shadow-sm transition-all": isRootRouteActive && link.href.startsWith('/dashboard/institutions') || path === link.href,
                "hidden": !(profile?.role === "admin" || profile?.role === "staff") && link.hidden,
                })}>
                    <link.icon size={24} />
                    <span>{link.tooltip}</span>
                </Link>
            </SheetClose>
          ))}
        </div>
        </div>
      </SheetContent>
      </Sheet>
  )
}

export default MobileSidebar
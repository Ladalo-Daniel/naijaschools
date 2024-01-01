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
      <SheetContent className='md:hidden min-h-screen overflow-auto mt-0 pt-0' side={'left'}>
        <SheetHeader className='flex flex-col flex-1 items-start pt-0 mt-0'>
          <SheetTitle>
          <Link href={'/'} className={'md:hidden'}>
            <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
          </Link>
          </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-6 overflow-auto custom-scrollbar'>
          {side_bar_links.map(link => (
            <SheetClose key={link.tooltip} asChild>
                <Link key={link.tooltip} href={link.href} className={cn("flex items-center hover:bg-gray-500 hover:text-gray-50 transition-all gap-2 p-2 rounded-md", {
                "bg-primary text-green-50 shadow-sm transition-all": isRootRouteActive && link.href.startsWith('/dashboard/institutions') || path === link.href,
                "hidden": !(profile?.role === "admin" || profile?.role === "staff") && link.hidden,
                })}>
                    {link.icon}
                    <span>{link.tooltip}</span>
                </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
      </Sheet>
  )
}

export default MobileSidebar
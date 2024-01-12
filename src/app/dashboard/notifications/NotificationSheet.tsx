"use client"

import React from 'react'
import { NotificationList } from '@/supabase/notifications'

import { Avatar } from '@nextui-org/avatar'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button as NextButton } from '@nextui-org/button'
import Link from 'next/link'
import NotificationItem from './NotificationItem'


const NotificationSheet = ({
    notifications,
    setSheet,
    sheetOpen
}: {
    notifications: NotificationList,
    sheetOpen?: boolean,
    setSheet: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className=''>
        <Sheet open={sheetOpen} onOpenChange={setSheet}>
          <SheetContent side={'right'} className='flex flex-col gap-3 flex-1 max-sm:w-full min-w-[280px]'>
            <h2 className='py-2 text-[18px] text-primary hover:transition-all'>Notifications ({notifications?.length})</h2>
            <Separator />
            {
                notifications.map(obj => <NotificationItem notification={obj} key={obj.id} />)
            }
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default NotificationSheet
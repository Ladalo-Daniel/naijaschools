"use client"

import React, { useEffect } from 'react'
import { NotificationList } from '@/supabase/notifications'
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator'
import NotificationItem from './NotificationItem'
import { useSeenNotication } from '@/lib/react-query/notifications'
import { pluralize } from '@/lib/utils'
import Link from 'next/link'


const NotificationSheet = ({
    notifications,
    setSheet,
    sheetOpen,
    cleanedNotifications
}: {
    notifications: NotificationList,
    sheetOpen?: boolean,
    cleanedNotifications?: NotificationList,
    setSheet: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate: setSeenNotification } = useSeenNotication()

  useEffect(() => {
    notifications.forEach(obj => {
      setSeenNotification({notificationId: obj?.id?.toString()!})
    })
  }, [sheetOpen])

  return (
    <div className=''>
        <Sheet open={sheetOpen} onOpenChange={setSheet}>
          <SheetContent side={'right'} className='flex flex-col gap-3 flex-1 max-sm:w-full min-w-[280px]'>
            <h2 className='py-2 text-[18px] text-primary hover:transition-all'>({cleanedNotifications?.length}) New Notification{pluralize(cleanedNotifications?.length!)}</h2>
            <Separator />
            <div className="min-h-screen overflow-auto">
              {
                notifications.length === 0 ? (
                  <div className='p-2 flex justify-center items-center'>
                    <p className='text-[18px] py-2 test-muted-foreground'>There is nothing here yet. Enjoy the silence.</p>
                  </div>
                ): (
                  notifications.map(obj => (
                    // @ts-ignore
                    <Link href={`/dashboard/posts/${obj?.user}/${obj?.content?.parentPost?.id }`}  key={obj?.id + Math.random()} onClick={() => setSheet(false)}>
                      <NotificationItem notification={obj} setSheet={setSheet}/>
                    </Link>
                  ))
                )
              }
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default NotificationSheet
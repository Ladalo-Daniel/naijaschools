"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Badge } from '@nextui-org/badge'
import { NotificationIcon } from './NotificationIcon'
import { supabaseClient } from '@/supabase'
import { NotificationList, Notification } from '@/supabase/notifications'
import { User } from '@/supabase/user'
import NotificationSheet from './NotificationSheet'

const NotificationBadge = ({ user, notifications }: { user?: User, notifications: NotificationList }) => {    
    const [recents, setRecents] = useState<NotificationList>(notifications ?? [])
    const [sheetOpen, setSheet] = useState(false)

    useEffect(() => {
        const channel = supabaseClient.channel("real time notifications")
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user=eq.${user?.username}`
        }, (payload) => {
            console.log(payload)
          setRecents((prev) => [...prev, payload?.new as Notification] )
        })
        .subscribe()
  
        return () => {
            supabaseClient.removeChannel(channel)
        }
    }, [recents, setRecents, user?.username])

    const cleanedNotifications = recents.filter(obj => obj.from !== user?.username)

  return (
    <>
    <Badge content={cleanedNotifications.length > 99 ? '99+' : cleanedNotifications.length} shape="circle" className='text-foreground' color="success">
      <Button
        radius="full"
        isIconOnly
        aria-label={`more than ${cleanedNotifications.length} notifications`}
        variant="light"
        onClick={() => setSheet(true)}
      >
        <NotificationIcon size={24} />
      </Button>
    </Badge>
    <NotificationSheet 
        notifications={cleanedNotifications}
        setSheet={setSheet}
        sheetOpen={sheetOpen}
    />
    </>
  )
}

export default NotificationBadge
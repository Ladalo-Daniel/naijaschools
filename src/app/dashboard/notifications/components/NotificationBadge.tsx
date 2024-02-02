"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Badge } from '@nextui-org/badge'
import { supabaseClient } from '@/supabase'
import { NotificationList, Notification } from '@/supabase/notifications'
import { User } from '@/supabase/user'
import NotificationSheet from './NotificationSheet'
import { useSeenNotifications } from '@/lib/react-query/notifications'
import { Bell } from 'lucide-react'

const NotificationBadge = ({ user, notifications }: { user?: User, notifications: NotificationList }) => {    
    const [recents, setRecents] = useState<NotificationList>(notifications ?? [])
    const [sheetOpen, setSheet] = useState(false)
    const { data: seenNotifications } = useSeenNotifications(user?.username as string)
    const [newNotificationLength, setNewNotificationLength] = useState(0)

    useEffect(() => {
        const channel = supabaseClient.channel("real time notifications")
        .on("postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user=eq.${user?.username}`
        }, (payload) => {
          setRecents((prev) => [...prev, payload?.new as Notification] )
        })
        .subscribe()
  
        return () => {
            supabaseClient.removeChannel(channel)
        }
    }, [recents, setRecents, user?.username])

    const cleanedNotifications = recents.filter(obj => obj.from !== user?.username)

    useEffect(() => {
      setNewNotificationLength(cleanedNotifications?.length)
    }, [cleanedNotifications])

  return (
    <>
      <Badge content={
        newNotificationLength === 0 ? null : newNotificationLength > 99 ? '99+' : newNotificationLength
      } shape="circle" className='text-default' color="success">
        <Button
          radius="full"
          isIconOnly
          aria-label={`more than ${newNotificationLength} notifications`}
          variant="light"
          onClick={() => {
            setNewNotificationLength(0)
            setSheet(prev => !prev)
          }}
        >
          <Bell size={18} />
        </Button>
      </Badge>
      <NotificationSheet 
          notifications={cleanedNotifications.concat(seenNotifications?.data!)}
          setSheet={setSheet}
          sheetOpen={sheetOpen}
          cleanedNotifications={cleanedNotifications}
      />
    </>
  )
}

export default NotificationBadge
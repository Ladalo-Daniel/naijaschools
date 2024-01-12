import { shortMultiFormatDateString } from '@/lib/utils'
import { Notification } from '@/supabase/notifications'
import { Post } from '@/supabase/posts'
import { Avatar } from '@nextui-org/avatar'
import { Card } from '@nextui-org/card'
import Link from 'next/link'
import React from 'react'

const NotificationItem = ({notification}: { notification: Notification }) => {
    const type = notification.notification_type
    const payload = JSON.parse(notification.content?.toString() || "{}")

    let parentPost = {} as Post
    let reply = {} as Post
    if (type === "reply") {
        parentPost = payload.parentPost as Post
        reply = payload.reply as Post

        return <Card as={Link} 
          href={`/dashboard/posts/${parentPost?.user}/${parentPost?.id }`}
          className='shadow-none rounded-none border-b p-4 my-2 bg-background'
          >
            <div className='flex gap-2'>
                <div className='w-14'>
                  <Avatar src={reply?.image!} />
                </div>
                <p className='text-muted-foreground'>
                    <span className="text-primary">
                        @{reply?.user}{' '}
                    </span>
                    replied to your post <i>{parentPost?.content?.slice(0, 40) + "..."}.</i> {" "}
                    <span className="text-muted-foreground opacity-60">{shortMultiFormatDateString(reply?.created_at!)} ago.</span>
                </p>
            </div>
        </Card>
    }
  return (
    <Card>

    </Card>
  )
}

export default NotificationItem
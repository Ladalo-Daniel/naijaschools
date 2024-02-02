import { SheetClose } from '@/components/ui/sheet'
import { useGetProfileByUsername } from '@/lib/react-query'
import { shortMultiFormatDateString } from '@/lib/utils'
import { Notification } from '@/supabase/notifications'
import { Post } from '@/supabase/posts'
import { Avatar } from '@nextui-org/avatar'
import { Card } from '@nextui-org/card'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotificationItem = ({
  notification,
  setSheet
}: { 
  notification: Notification, 
  sheetOpen?: boolean,
  setSheet: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
    const type = notification?.notification_type
    const payload = JSON.parse(notification?.content?.toString() || "{}")

    const { data: author, isPending } = useGetProfileByUsername(payload?.reply?.username as string)

    let parentPost = {} as Post
    let reply = {} as Post

    // if (isPending) {
    //   return <div className='flex gap-2 my-1.5'>
    //     <Skeleton className='h-12 w-12 rounded-full'/>
    //     <div className="flex flex-col gap-1 mt-1">
    //       <Skeleton className='w-24 h-3' />
    //       <Skeleton className='w-32 h-3' />
    //     </div>
    //   </div>
    // }

    if (type === "reply") {
        parentPost = payload.parentPost as Post
        reply = payload.reply as Post

        return (
          <SheetClose asChild
            onClick={() => setSheet(false)}
          >
            <Card as={Link} 
              onClick={() => setSheet(prev => !prev )}
              href={`/dashboard/posts/${parentPost?.user}/${parentPost?.id }`}
              className={'shadow-none rounded-none border-b p-4 my-2 bg-background ' + (notification.seen ? "" : "bg-secondary rounded-md border-primary")}
              
              >
                <div className='flex gap-2'>
                    <div className='w-14'>
                      <Avatar src={payload.reply.image_url as string } color='primary' />
                    </div>
                    <p className='text-muted-foreground py-3 -mt-3'>
                        <span className="text-primary">
                            @{reply?.user}{' '}
                        </span>
                        <b className='font-semibold'>replied to your post </b> 
                        <i>{parentPost?.content?.slice(0, 40) + "..."}.</i> {" "}
                        <span className="text-muted-foreground opacity-60">{shortMultiFormatDateString(reply?.created_at!)}.</span>
                    </p>
                </div>
            </Card>
          </SheetClose>
        )
    }

    if (type === 'reaction') {
      parentPost = payload.post as Post

        return (
          <SheetClose asChild
            onClick={() => setSheet(false)}
          >
            <Card as={Link} 
              onClick={() => setSheet(prev => !prev )}
              href={`/dashboard/posts/${parentPost?.user}/${parentPost?.id }`}
              className={'shadow-none rounded-none border-b p-4 my-2 bg-background ' + (notification.seen ? "" : "bg-secondary rounded-md border-primary")}
              
              >
                <div className='flex gap-2'>
                    <div className='w-14'>
                      <Avatar src={author?.data?.image_url as string } color='primary' />
                    </div>
                    <p className='text-muted-foreground py-3 -mt-3 flex flex-wrap items-center gap-1'>
                        <span className="text-primary">
                            @{notification.from}{' '}
                        </span>
                        <b className='font-semibold flex gap-1 items-center'>reacted <Heart size={15} fill='currentColor' className='text-primary' /> to your post </b> 
                        <i>{parentPost?.content?.slice(0, 40) + "..."}.</i> {" "}
                        <span className="text-muted-foreground opacity-60">{shortMultiFormatDateString(reply?.created_at!)}.</span>
                    </p>
                </div>
            </Card>
          </SheetClose>
        )
    }

  return (
    <Card>

    </Card>
  )
}

export default NotificationItem
'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { useGetProfile, useGetProfileByUsername } from '@/lib/react-query'
import { shortMultiFormatDateString } from '@/lib/utils'
import { Post } from '@/supabase/posts'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PostStats from './PostStats'
import { Skeleton } from '@/components/ui/skeleton'
import { Globe, Trash } from 'lucide-react'
import { Button } from '@nextui-org/button'
import UpdatePostTrigger from './UpdatePostTrigger'
import { User } from '@/supabase/user'
import DeletePost from './DeletePost'

/**
 * A reply is still a post
 * @param param0 
 * @returns JSX
 */
const PostCard = ({ post, isReply }: { post: Post, isReply?: boolean }) => {
  const { data: author, isPending } = useGetProfileByUsername(post.user!)
  const profile = useGetProfile()
  return (
    <Card className={`p-4 border-muted bg-background rounded-3xl ${isReply ? "border-none": "border"} lg:p-7 w-full max-w-screen-sm hover:transition-all flex flex-row gap-1.5`}>
      <div className="w-12">
        {
          isPending ? <Skeleton className='w-12 h-12 rounded-full' /> : (
            <Avatar src={author?.data?.image_url || '/icons/profile-placeholder.svg'}/>
          ) 
        }
        <Separator orientation='vertical' className={`h-[75%] mx-auto mt-1 ${ isReply ? "text-muted" : "" } mb-8`}/>
      </div>
      <div className="flex flex-col gap-0.5 p-2 md:p-3 lg:p-4 -mt-8 w-full pb-4">
        <CardHeader className='flex items-center gap-1 w-full px-0'>
          <div className='w-full md:flex-row md:flex-wrap flex md:items-center gap-1 flex-col'>
            {
              isPending ? (
                <>
                <Skeleton className='h-5 w-28' />
                <Skeleton className='h-5 w-16' />
                <Skeleton className='h-5 w-24' />
                </>
              ) : (
                <>
                <h2 className='text-muted-foreground my-1'>{author?.data?.first_name} {author?.data?.last_name}</h2>
                <span className="hidden md:block">.</span>
                <p className='text-primary tracking-tighter'>@{author?.data?.username}</p>
                <span className="hidden md:block">.</span>
                <p className="text-muted">{shortMultiFormatDateString(post.created_at)} ago.</p>
                </>
              )
            }
          </div>
            <div className="md:flex max-sm:flex-col">
                {
                  author?.data?.username === profile.data?.data?.username ? (
                    <div className='flex gap-1 items-center max-sm:flex-col'>
                      <UpdatePostTrigger user={profile?.data?.data as User} isUpdate post={post}/>
                      <DeletePost post={post} />
                    </div>
                  ) : (
                    <p className='text-muted-foreground hidden tracking-tighter md:flex items-center gap-1'><Globe size={10} /> {author?.data?.faculty || ''}</p>
                  )
                }
            </div>
        </CardHeader>
        <CardBody as={Link} href={`/dashboard/${author?.data?.username}/${post.id}`} className="flex flex-col px-0">
          {post.content}
        </CardBody>
        {post.image ? <AspectRatio ratio={5 / 7}>
          <Image
            src={post.image!}
            alt={post.user + "'s post."}
            fill
            className='rounded-3xl object-cover'
          />
        </AspectRatio> : <></>}
        <PostStats post={post} />
      </div>
    </Card>
  )
}

export default PostCard
'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { useGetProfileByUsername } from '@/lib/react-query'
import { shortMultiFormatDateString } from '@/lib/utils'
import { Post } from '@/supabase/posts'
import { User } from '@/supabase/user'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PostStats from './PostStats'

const PostCard = ({ post, user}: { post: Post, user?: User }) => {
  const { data: author, isPending } = useGetProfileByUsername(post.user!)
  return (
    <Card className='p-4 border-muted bg-background rounded-3xl border lg:p-7 w-full max-w-screen-sm hover:transition-all flex flex-row gap-1.5'>
      <div className="w-12">
        <Avatar src={author?.data?.image_url || '/icons/profile-placeholder.svg'}/>
        <Separator orientation='vertical' className='h-[75%] mx-auto mt-1 mb-8'/>
      </div>
      <div className="flex flex-col gap-0.5 p-2 md:p-3 lg:p-4 -mt-8 w-full pb-4">
        <CardHeader className='flex items-center gap-1 w-full px-0'>
          <div className='w-full md:flex-row md:flex-wrap flex md:items-center flex-row gap-1 flex-col'>
            <h2 className='text-muted-foreground my-1'>{author?.data?.first_name} {author?.data?.last_name}</h2>
            <span className="hidden md:block">.</span>
            <p className='text-primary tracking-tighter'>@{author?.data?.username}</p>
            <span className="hidden md:block">.</span>
            <p className="text-muted">{shortMultiFormatDateString(post.created_at)}</p>
          </div>
        </CardHeader>
        <CardBody as={Link} href={`/dashboard/${author?.data?.username}/${post.id}`} className="flex flex-col px-0">
          {post.content}
        </CardBody>
        {post.image ? <AspectRatio ratio={9 / 5}>
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
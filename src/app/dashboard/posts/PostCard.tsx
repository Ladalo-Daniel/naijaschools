import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Post } from '@/supabase/posts'
import { Card } from '@nextui-org/card'
import Image from 'next/image'
import React from 'react'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className='p-4 max-w-2xl'>
      <AspectRatio ratio={16/9}>
        {post.image && <Image
          src={post.image!}
          alt={post.user + "'s post."}
          fill
          className='rounded-md object-cover'
         />}
      </AspectRatio>
    </Card>
  )
}

export default PostCard
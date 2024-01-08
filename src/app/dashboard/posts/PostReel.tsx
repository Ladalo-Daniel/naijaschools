// 'use client'

import { getInfiniteGeneralPosts } from '@/supabase/posts'
import React from 'react'
import PostCard from './PostCard'
import { Alert } from '@/components/ui/alert'

const PostReel = async () => {
    const { data: posts } = await getInfiniteGeneralPosts()

    if (posts.length === 0) {
      return (
          <Alert className='p-4 max-w-screen-sm'>
              There are no replies for this post yet.
          </Alert>
      )
  }
  return (
    <div className='flex flex-col gap-6'>
        {
            posts.map(post => <PostCard post={post} key={post.id} />)
        }
    </div>
  )
}

export default PostReel
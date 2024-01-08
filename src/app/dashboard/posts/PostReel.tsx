// 'use client'

import { getInfiniteGeneralPosts } from '@/supabase/posts'
import React from 'react'
import PostCard from './PostCard'

const PostReel = async () => {
    const { data: posts } = await getInfiniteGeneralPosts()
  return (
    <div className='flex flex-col gap-6'>
        {
            posts.map(post => <PostCard post={post} key={post.id} />)
        }
    </div>
  )
}

export default PostReel
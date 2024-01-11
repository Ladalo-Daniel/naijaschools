import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import PostComponent from './PostComponent'
import BackButton from '@/components/shared/BackButton'
import { Metadata } from 'next'
import { fetchInitialPosts } from '@/supabase/posts'
import PostProvider from './PostProvider'

export const metadata: Metadata = {
  title: "Posts | Broadcasts | Naijaschools",
  description: "A broadcast page for discovering posts in Naijaschools."
}

const PostPage = async () => {
  const { data: posts } = await fetchInitialPosts()
  return (
    <PostProvider posts={posts}>
    <MaxWrapper className='p-4 bg-background overflow-auto relative'>
      <BackButton/>

      <h2 className="text-2xl text-primary text-tighter">Broadcasts</h2>
        
        <section className='flex flex-col gap-3'>
          <PostComponent />
        </section>
    </MaxWrapper>
    </PostProvider>
  )
}

export default PostPage
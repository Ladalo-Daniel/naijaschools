import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import PostDetailComponent from './components/PostDetailComponent'
import { Post, getPostById } from '@/supabase/posts'
import { User, getProfile } from '@/supabase/user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Posts | Broadcasts | Naijaschools",
  description: "A broadcast page for discovering posts in Naijaschools."
}

const PostDetailPage = async ({ params: { username, postId } }: { params: { username: string, postId: string }}) => {
  const {data: post} = await getPostById(postId)
  const currentUser = await getProfile()
    return (
    <MaxWrapper className='p-6 bg-background'>
        <BackButton />
        <section className="py-4">
          <PostDetailComponent post={post as Post} user={currentUser?.data as User} />
        </section>
    </MaxWrapper>
  )
}

export default PostDetailPage
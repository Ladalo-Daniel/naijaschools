import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import PostDetailComponent from './PostDetailComponent'
import { Post, getPostById } from '@/supabase/posts'
import { User, getProfileByUsername } from '@/supabase/user'

const PostDetailPage = async ({ params: { username, postId } }: { params: { username: string, postId: string }}) => {
  const {data: post} = await getPostById(postId)
  const profile = await getProfileByUsername(username)
    return (
    <MaxWrapper className='p-6 bg-background'>
        <BackButton />
        <section className="py-4">
          <PostDetailComponent post={post as Post} user={profile?.data as User} />
        </section>
    </MaxWrapper>
  )
}

export default PostDetailPage
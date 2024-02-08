import { Post, fetchInitialPostReplies, getInfinitePostReplies } from '@/supabase/posts'
import React from 'react'
import ReplyReel from './ReplyReel'
import { User } from '@/supabase/user'
import PostCard from '../../../components/PostCard'
import PostModal from '../../../components/PostModal'
import PostProvider from '../../../PostProvider'

const PostDetailComponent = async ({ post, user }:{ post: Post, user: User }) => {
    const { data: replies } = await fetchInitialPostReplies(post?.id)
  return (
    <PostProvider posts={replies}>
      <div className='py-4 flex flex-col gap-3'>
        <PostCard post={post} />
        <PostModal post={post} user={user} />
        <ReplyReel replies={replies} post={post} />
      </div>
    </PostProvider>
  )
}

export default PostDetailComponent
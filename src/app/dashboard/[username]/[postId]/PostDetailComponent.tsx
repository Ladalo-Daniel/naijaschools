import { Post, getInfinitePostReplies } from '@/supabase/posts'
import React from 'react'
import ReplyReel from './ReplyReel'
import PostCard from '../../posts/PostCard'
import PostModal from '../../posts/PostModal'
import { User } from '@/supabase/user'

const PostDetailComponent = async ({ post, user }:{ post: Post, user: User }) => {
    const { data: replies } = await getInfinitePostReplies(post.id)
  return (
    <div className='py-4 flex flex-col gap-3'>
        <PostCard post={post} />
        <PostModal post={post} user={user} />
        <ReplyReel replies={replies} />
    </div>
  )
}

export default PostDetailComponent
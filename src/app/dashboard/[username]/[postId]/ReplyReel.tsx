import { PostList } from '@/supabase/posts'
import React from 'react'
import PostCard from '../../posts/PostCard'
import { Alert } from '@/components/ui/alert'

const ReplyReel = ({ replies }: { replies: PostList}) => {
    if (replies.length === 0) {
        return (
            <Alert className='p-4 max-w-screen-sm'>
                There are no replies for this post yet.
            </Alert>
        )
    }
  return (
    <div className='flex flex-col gap-6 ml-4'>
        {
            replies.map(reply => <PostCard post={reply} key={reply.id} isReply />)

        }
    </div>
  )
}

export default ReplyReel
'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfile } from '@/lib/react-query'
import { useGetPostRepliesByQuery, useLikePost } from '@/lib/react-query/posts'
import { checkIsLiked, pluralize } from '@/lib/utils'
import { Post } from '@/supabase/posts'
import { User } from '@/supabase/user'
import { Button } from '@nextui-org/button'
import { BookMarkedIcon, HeartIcon, MessageCircleReplyIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import PostLikedUsers from './PostLikedUsers'

const PostStats = ({ post, author }: { post: Post, author: User }) => {

    const incomingLikes = JSON.parse(post.likes?.toString() || '[]') as string[]
    const [likes, setLikes] = useState(incomingLikes)
    
    const { data: replies, isPending: gettingReplies } = useGetPostRepliesByQuery("parent_post_id", post?.id!)
    const { data: currentUser, isPending: gettingUser } = useGetProfile()
    const { mutate: likePost, isPending: isLiking } = useLikePost()

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes = [...likes]
        const hasLiked = newLikes?.includes(currentUser?.data?.id!)

        if (hasLiked) {
            newLikes = newLikes?.filter(user => user !== currentUser?.data?.id!)
        } else newLikes.push(currentUser?.data?.id!)
        setLikes(newLikes)

        likePost({postId: post?.id!, likes: JSON.stringify(newLikes)})
    }

  return (
    <div className='flex flex-col gap3 py-2'>
        <div className="flex justify-between items-center">
            <Button isIconOnly 
                className='bg-transparent px-0 w-[60px]'
            >
                <HeartIcon 
                    size={20} 
                    className={checkIsLiked(likes, currentUser?.data?.id!) ? "text-primary" : "" }
                    fill={checkIsLiked(likes, currentUser?.data?.id!) ? "currentColor" : ""}
                    onClick={handleLikePost}
                 />
                
                <PostLikedUsers 
                    likes={likes}
                    likesTrigger={
                        <span className='text-tiny ml-1 text-primary hover:underline'>{likes?.length >= 10 ? '9+' : likes?.length} like{pluralize(likes?.length)}</span>
                    }
                 />
            </Button>
            <Button isIconOnly className='bg-transparent px-0 gap-1 flex items-center' as={Link} href={`/dashboard/posts/${author?.username}/${post.id}`}>
                <MessageCircleReplyIcon size={18} />
                {gettingReplies ? <Skeleton className='h-4 w-8' /> : <span className='text-tiny ml-1 text-muted-foreground'>{replies?.data.length}</span>}
            </Button>
            <Button isIconOnly className='bg-transparent px-0'>
                <BookMarkedIcon size={18} className='text-primary' />
            </Button>
        </div>
    </div>
  )
}

export default PostStats
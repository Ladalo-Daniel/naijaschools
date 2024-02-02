'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfile } from '@/lib/react-query'
import { useBookmarkPost, useDeleteBookmark, useGetBookmarkById, useGetBookmarkByQuery, useGetPostRepliesByQuery, useLikePost } from '@/lib/react-query/posts'
import { checkIsLiked, cn, pluralize } from '@/lib/utils'
import { Post } from '@/supabase/posts'
import { User } from '@/supabase/user'
import { Button } from '@nextui-org/button'
import { BookMarkedIcon, Bookmark, HeartIcon, MessageCircleReplyIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PostLikedUsers from './PostLikedUsers'
import { supabaseClient } from '@/supabase'
import { useSendLikeNotication } from '@/lib/react-query/notifications'

const PostStats = ({ post, author }: { post: Post, author: User }) => {

    const incomingLikes = JSON.parse(post.likes?.toString() || '[]') as string[]
    const [likes, setLikes] = useState(incomingLikes)
    const [bookmarked, setBookmarked] = useState(false)

    const incomingBookmarks = JSON.parse(post.bookmarks?.toString() || '[]') as string[]
    const [bookmarks, setBookmarks] = useState(incomingBookmarks)
    
    const { data: replies, isPending: gettingReplies } = useGetPostRepliesByQuery("parent_post_id", post?.id!)
    const { data: currentUser, isPending: gettingUser } = useGetProfile()

    const { mutate: likePost, isPending: isLiking } = useLikePost()

    const { mutate: deleteBookmark, isPending: deletingBookmark } = useDeleteBookmark()
    const { mutate: bookmarkPost, isPending: isBookmarking } = useBookmarkPost()

    const { mutate: sendLikeNotification } = useSendLikeNotication()
    const { data: bookmarkedPosts } = useGetBookmarkByQuery('post', post?.id!)

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes = [...likes]
        const hasLiked = newLikes?.includes(currentUser?.data?.id!)

        if (hasLiked) {
            newLikes = newLikes?.filter(user => user !== currentUser?.data?.id!)
        } else newLikes.push(currentUser?.data?.id!)
        setLikes(newLikes)

        likePost({postId: post?.id!, likes: JSON.stringify(newLikes)})
        sendLikeNotification({
            likes,
            post,
            post_like_user: currentUser?.data as User
        })
    }

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation()
        let newBookmarks = [...bookmarks]
        const hasBookmarked = newBookmarks?.includes(currentUser?.data?.id!)

        if (hasBookmarked && bookmarkedPosts?.data) {
            newBookmarks = newBookmarks?.filter(user => user !== currentUser?.data?.id!)
            setBookmarked(false)
            deleteBookmark({
                id: bookmarkedPosts?.data?.at?.(0)?.id.toString()!
            })

        } else {
            newBookmarks.push(currentUser?.data?.id!)
            bookmarkPost({userId: currentUser?.data?.id!, postId: post?.id!, bookmarks: JSON.stringify(newBookmarks)})
            setBookmarks(newBookmarks)
            setBookmarked(true)
        }
    }


  return (
    <div className='flex flex-col gap3 py-2'>
        <div className="flex justify-between items-center">
            <Button isIconOnly 
                className='bg-transparent px-0 w-[70px]'
            >
                <HeartIcon 
                    size={20} 
                    className={cn(checkIsLiked(likes, currentUser?.data?.id!) ? "text-primary" : "", "text-primary" )}
                    fill={cn(checkIsLiked(likes, currentUser?.data?.id!) ? "currentColor" : "none", "")}
                    onClick={handleLikePost}
                 />
                
                <PostLikedUsers 
                    likes={likes}
                    likesTrigger={
                        <span className='text-tiny ml-1 text-primary hover:underline'>{likes?.length >= 99 ? '99+' : likes?.length} like{pluralize(likes?.length)}</span>
                    }
                 />
            </Button>
            <Button isIconOnly className='bg-transparent px-0 gap-1 flex items-center' as={Link} href={`/dashboard/posts/${author?.username}/${post.id}`}>
                <MessageCircleReplyIcon size={20} className='text-primary' fill='none' />
                {gettingReplies ? <Skeleton className='h-4 w-8' /> : <span className='text-tiny ml-1 text-muted-foreground'>{replies?.data.length}</span>}
            </Button>
            <Button isIconOnly className='bg-transparent px-0 flex items-center gap-1'>
                <Bookmark onClick={handleBookmark} size={20} className={cn((bookmarked ||bookmarkedPosts?.data?.at?.(0)?.id)  ? "text-primary" : "", "text-primary")} fill={cn((bookmarked || bookmarkedPosts?.data?.at?.(0)?.id) ? "currentColor" : "none", "")} />
                <span className='text-tiny ml-1 text-muted-foreground'>{bookmarks?.length}</span>
            </Button>
        </div>
    </div>
  )
}

export default PostStats
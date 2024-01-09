import { Skeleton } from '@/components/ui/skeleton'
import { useGetPostRepliesByQuery } from '@/lib/react-query/posts'
import { Post, PostList } from '@/supabase/posts'
import { User } from '@/supabase/user'
import { Button } from '@nextui-org/button'
import { BookMarkedIcon, HeartIcon, MessageCircleReplyIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PostStats = ({ post, author }: { post: Post, author: User }) => {
    const { data: replies, isPending: gettingReplies } = useGetPostRepliesByQuery("parent_post_id", post?.id!)
  return (
    <div className='flex flex-col gap3 py-2'>
        <div className="flex justify-between items-center">
            <Button isIconOnly className='bg-transparent px-0'>
                <HeartIcon size={18} />
            </Button>
            <Button isIconOnly className='bg-transparent px-0 gap-1 flex items-center' as={Link} href={`/dashboard/${author?.username}/${post.id}`}>
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
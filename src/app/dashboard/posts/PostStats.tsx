import { Post } from '@/supabase/posts'
import { Button } from '@nextui-org/button'
import { BookMarkedIcon, HeartIcon, MessageCircleReplyIcon } from 'lucide-react'
import React from 'react'

const PostStats = ({ post }: { post: Post }) => {
  return (
    <div className='flex flex-col gap3 py-2'>
        <div className="flex justify-between items-center">
            <Button isIconOnly className='bg-transparent px-0'>
                <HeartIcon size={18} />
            </Button>
            <Button isIconOnly className='bg-transparent px-0'>
                <MessageCircleReplyIcon size={18} />
            </Button>
            <Button isIconOnly className='bg-transparent px-0'>
                <BookMarkedIcon size={18} className='text-primary' />
            </Button>
        </div>
    </div>
  )
}

export default PostStats
import { Alert } from '@/components/ui/alert'
import { PostList } from '@/supabase/posts'
import React from 'react'
import AISearchResponse from './AISearchResponse'
import Link from 'next/link'

const PostSearchResults = ({ posts, query }: { posts: PostList, query?: string }) => {
    if (!posts.length) return <div className='flex flex-col gap-3'>
    <Alert>
        Your query <b>{query}</b> could not be found in our posts. You may proceed with Naijaschools AI.
    </Alert>
    <AISearchResponse query={query!} />
</div>
return (
<div className='flex flex-col gap-3'>
    {
        posts.map(post => (
            <Link href={`/dashboard/${post.user}/${post.id}`} key={post.id} className='my-2 max-w-2xl border-b py-2'>
                <h2 className='text-[18px] text-primary py-2'>{post.user}</h2>
                <p className="text-tiny tracking-tighter mt-1">{post.content?.slice(0, 50) + "..."}</p>
            </Link>
        ))
    }
</div>
)
}

export default PostSearchResults
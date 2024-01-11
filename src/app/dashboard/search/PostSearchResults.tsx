import { Alert } from '@/components/ui/alert'
import { PostList } from '@/supabase/posts'
import React from 'react'
import AISearchResponse from './AISearchResponse'
import PostCard from '../posts/PostCard'

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
        posts.map(post => <PostCard key={post.id} post={post} />)
    }
</div>
)
}

export default PostSearchResults
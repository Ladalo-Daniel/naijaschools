import { getPostById } from '@/supabase/posts'
import { Database } from '@/types/supabase'
import React from 'react'
import PostCard from '../../posts/components/PostCard'

const BookmarkItem = async ({ bookmark }: { bookmark: Database['public']['Tables']['bookmarks']['Row']}) => {
    const { data: post } = await getPostById(bookmark?.post!)
  return (
    <>
        <PostCard post={post} />
    </>
  )
}

export default BookmarkItem
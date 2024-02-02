import { PostList, getBookmarks } from '@/supabase/posts'
import { getProfile } from '@/supabase/user'
import React from 'react'
import BookmarkItem from './BookmarkItem'
import Link from 'next/link'

const BookmarkComponent = async () => {
    const user = await getProfile()
    const {data: bookmarks} = await getBookmarks(user?.data?.id!)

    if (bookmarks.length === 0) {
        return <div className='text-[20px] py-4 flex flex-col gap-4'>
            <p>You do not have any bookmarks yet.</p>
            <p>Go to <Link href={'posts'} className='text-primary'>posts page</Link> to explore and start adding.</p>
        </div>
    }
  return (
    <div className='flex flex-col gap-5'>
        {
            bookmarks?.map(bookmark => (<BookmarkItem key={bookmark.id} bookmark={bookmark}/>))
        }
    </div>
  )
}

export default BookmarkComponent
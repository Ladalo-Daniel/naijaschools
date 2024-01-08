import React from 'react'
import AddPost from './AddPost'
import { User, getProfile } from '@/supabase/user'
import PostModal from './PostModal'
import PostReel from './PostReel'

const PostComponent = async () => {
    const profile = await getProfile()
  return (
    <div className='py-4 flex flex-col gap-3'>
        <PostModal user={profile?.data as User} />
        <PostReel />
    </div>
  )
}

export default PostComponent
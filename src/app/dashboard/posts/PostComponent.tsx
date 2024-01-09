import React from 'react'
import AddPost from './AddPost'
import { User, getProfile } from '@/supabase/user'
import PostModal from './PostModal'
import PostReel from './PostReel'
import { fetchInitialPosts } from '@/supabase/posts'
import { PlusIcon } from 'lucide-react'
import { Button } from '@nextui-org/button'

const PostComponent = async () => {
    const profile = await getProfile()
    const { data: posts } = await fetchInitialPosts()

  return (
    <div className='py-4 flex flex-col gap-3'>
        <PostModal user={profile?.data as User} />
        <PostReel posts={posts}  />

        <div className="fixed z-16 bottom-10 right-10 md:bottom-20 md:right-28">
              <PostModal
                user={profile?.data as User}
                addPostButton={
                  <Button variant='solid' style={{padding: 0}} color='success' className='w-[50px] h-[75px] p-0 m-0 flex items-center justify-center rounded-[100px]'>
                    <PlusIcon />
                  </Button>
                }
              />
            </div>
        </div>
  )
}

export default PostComponent
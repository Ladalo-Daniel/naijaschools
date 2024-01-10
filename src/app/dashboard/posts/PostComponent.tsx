import React from 'react'
import AddPost from './AddPost'
import { User, getProfile } from '@/supabase/user'
import PostModal from './PostModal'
import PostReel from './PostReel'
import { fetchInitialPosts } from '@/supabase/posts'
import { PlusIcon } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { GetServerSideProps } from 'next'
import { supabaseClient } from '@/supabase'

const PostComponent = async () => {
    const profile = await getProfile()
    const { data: posts } = await fetchInitialPosts()

  return (
    <div className='py-4 flex flex-col gap-3'>
        <PostModal user={profile?.data as User} />
        <PostReel posts={posts}  />

        <div className="fixed z-50 bottom-10 right-10 md:bottom-20 md:right-28">
              <PostModal
                user={profile?.data as User}
                addPostButton={
                  <Button variant='solid' style={{padding: 0}} color='primary' className='w-[50px] h-[70px] max-sm:w-[40px] max-sm:h-[40px] p-0 m-0 flex items-center justify-center rounded-full'>
                    <PlusIcon size={15} />
                  </Button>
                }
              />
            </div>
        </div>
  )
}

export default PostComponent


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { data: posts } = await supabaseClient!
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .order('updated_at', { ascending: false })
    .limit(20)
    .eq("is_reply", false)

  return {
    props: {
      posts,
    },
  }
}
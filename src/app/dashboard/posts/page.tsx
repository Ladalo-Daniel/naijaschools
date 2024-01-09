import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import PostComponent from './PostComponent'
import BackButton from '@/components/shared/BackButton'
import { Button } from '@nextui-org/button'
import { PlusIcon } from 'lucide-react'

const PostPage = async () => {
  return (
    <MaxWrapper className='p-4 bg-background overflow-auto relative'>
      <BackButton/>

      <h2 className="text-2xl text-primary text-tighter">Broadcasts</h2>
        
        <section className='flex flex-col gap-3'>
          <PostComponent />
        </section>
    </MaxWrapper>
  )
}

export default PostPage
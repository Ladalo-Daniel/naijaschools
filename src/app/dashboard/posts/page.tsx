import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import PostComponent from './PostComponent'

const PostPage = async () => {
  return (
    <MaxWrapper className='p-4 bg-background overflow-auto'>
        
        <section className='flex flex-col gap-3'>
          <PostComponent />
        </section>
    </MaxWrapper>
  )
}

export default PostPage
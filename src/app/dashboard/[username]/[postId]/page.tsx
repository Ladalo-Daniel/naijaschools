import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'

const PostDetailPage = ({ params: { username, postId } }: { params: { username: string, postId: string }}) => {
    return (
    <MaxWrapper className='p-6 bg-background'>
        <BackButton />
        <h2>Post detail</h2>
    </MaxWrapper>
  )
}

export default PostDetailPage
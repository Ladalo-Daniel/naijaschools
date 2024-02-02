import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import BookmarkComponent from './components/BookmarkComponent'

const BookMarkPage = async () => {
  return (
    <MaxWrapper className='bg-background max-w-5xl p-4'>
        <BackButton />

        <h2 className="text-2xl py-2">Your bookmarks.</h2>

        <section className='flex flex-col gap-3'>
         <BookmarkComponent />
        </section>
    </MaxWrapper>
  )
}

export default BookMarkPage
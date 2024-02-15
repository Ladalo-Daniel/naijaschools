import React, { Suspense } from 'react'
import { Metadata } from 'next'
import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import LessonComponent from './components/LessonComponent'
import MiniLoader from './components/MiniLoader'

export const metadata: Metadata = {
  title: "Manage lessons",
  description: "Lessons to be managed by admins"
}

const Page = async () => {
  return (
    <MaxWrapper className='max-w-7xl p-5'>
      <BackButton />

      <section className="flex flex-col gap-4">
        <Suspense fallback={
          <MiniLoader />
        }>
          <LessonComponent />
        </Suspense>
      </section>
    </MaxWrapper>
  )
}

export default Page
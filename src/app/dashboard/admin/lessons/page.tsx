import React from 'react'
import { Metadata } from 'next'
import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import LessonComponent from './components/LessonComponent'

export const metadata: Metadata = {
  title: "Manage lessons",
  description: "Lessons to be managed by admins"
}

const Page = () => {
  return (
    <MaxWrapper className='max-w-7xl p-5'>
      <BackButton />

      <section className="flex flex-col gap-4">
        <LessonComponent />
      </section>
    </MaxWrapper>
  )
}

export default Page
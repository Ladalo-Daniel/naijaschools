import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import LessonComponent from './components/LessonComponent'

const Page = ({ params }: { params: { courseId: string }}) => {
  return (
    <MaxWrapper className='max-w-max p-6 mx-auto'>
        <BackButton />

        <section className="flex flex-col gap-4">
            <LessonComponent courseId={params.courseId} />
        </section>
    </MaxWrapper>
  )
}

export default Page
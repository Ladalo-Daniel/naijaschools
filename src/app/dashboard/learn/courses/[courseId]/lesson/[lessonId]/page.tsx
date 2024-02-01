import React from 'react'
import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import LessonDetailComponent from './components/LessonDetailComponent'

const Page = ({ params }: { params: { lessonId: string }}) => {
  return (
    <MaxWrapper className='max-w-7xl p-6 mx-auto'>
        <BackButton />

        <section className="flex flex-col gap-4">
            <LessonDetailComponent lessonId={params.lessonId} />
        </section>
    </MaxWrapper>
  )
}

export default Page
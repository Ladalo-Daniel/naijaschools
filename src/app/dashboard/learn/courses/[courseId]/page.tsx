import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React, { Suspense } from 'react'
import LessonComponent from './components/LessonComponent'
import Loading from '@/app/dashboard/loading'

const Page = async ({ params }: { params: { courseId: string }}) => {
  return (
    <MaxWrapper className='max-w-max p-6 mx-auto'>
        <BackButton />

        <section className="flex flex-col gap-4">
            <Suspense fallback={<Loading />}>
              <LessonComponent courseId={params.courseId} />
            </Suspense>
        </section>
    </MaxWrapper>
  )
}

export default Page
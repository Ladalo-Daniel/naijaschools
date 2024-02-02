import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React, { Suspense } from 'react'
import StudentCourseViewComponent from './components/StudentCourseViewComponent'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'

async function Course({ params: {course}}: { params: { course: string }}) {
  return (
    <MaxWrapper className='max-w-5xl bg-background p-4'>
      <BackButton />

      <Suspense fallback={<GeneralSkeleton />}>
        <StudentCourseViewComponent courseId={course} />
      </Suspense>

    </MaxWrapper>
  )
}

export default Course
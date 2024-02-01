import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import LessonComponent from './components/LessonComponent'
import NavigateLessons from './components/NavigateLessons'
import { getCourseById } from '@/supabase/courses'
import { getLessonsByQuery } from '@/supabase/lessons'

const Page = async ({ params }: { params: { courseId: string }}) => {
  const { data: course } = await getCourseById(params.courseId)
  const { data: lessons } = await getLessonsByQuery("course", params.courseId)
  return (
    <MaxWrapper className='max-w-max p-6 mx-auto'>
        <div className="flex justify-between items-center">
          <BackButton />
          <NavigateLessons course={course} lessons={lessons} />
        </div>

        <section className="flex flex-col gap-4">
            <LessonComponent courseId={params.courseId} />
        </section>
    </MaxWrapper>
  )
}

export default Page
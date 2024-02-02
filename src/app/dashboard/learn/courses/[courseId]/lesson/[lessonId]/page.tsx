import React, { Suspense } from 'react'
import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import LessonDetailComponent from './components/LessonDetailComponent'
import NavigateLessons from '../../components/NavigateLessons'
import { getCourseById } from '@/supabase/courses'
import { getLessonById, getLessonsByQuery } from '@/supabase/lessons'
import NavigateLessonContext from '../../components/NavigateLessonContext'

import type { Metadata, ResolvingMetadata } from 'next'
import Loading from '@/app/dashboard/loading'
type Props = {
  params: { lessonId: string, courseId: string },
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const lessonId = params.lessonId
 
  const { data: lesson } = await getLessonById(lessonId)
 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: lesson.title,
    openGraph: {
      images: [lesson.image_url!, ...previousImages],
    },
  }
}

const Page = async ({ params }: Props) => {
  const { data: course } = await getCourseById(params.courseId)
  const { data: lessons } = await getLessonsByQuery("course", params.courseId)
  return (
    <NavigateLessonContext lessonId={params.lessonId} lessons={lessons}>
      <MaxWrapper className='max-w-7xl p-6 mx-auto'>
        <div className="flex justify-between items-center">
          <BackButton />
          <NavigateLessons course={course} lessons={lessons} />
        </div>

        <section className="flex flex-col gap-4">
          <Suspense fallback={<Loading />}>
            <LessonDetailComponent lessonId={params.lessonId} />
          </Suspense>
        </section>
    </MaxWrapper>
    </NavigateLessonContext>
  )
}

export default Page
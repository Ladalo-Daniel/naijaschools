import Component404 from '@/app/dashboard/components/404Component'
import { getCourseById } from '@/supabase/courses'
import { getInstitutionById } from '@/supabase/institutions'
import { getLessonsByQuery } from '@/supabase/lessons'
import { getProfile } from '@/supabase/user'
import Link from 'next/link'
import React from 'react'
import LessonItem from './LessonItem'
import { learn_urls } from '@/app/dashboard/urls'

interface LessonComponentProps {
  courseId: string,
}

const LessonComponent: React.FC<LessonComponentProps> = async ({courseId}) => {
  const user = await getProfile()
  const { data: school } = await getInstitutionById(user?.data?.institution!)
  const { data: course } = await getCourseById(courseId)
  const { data: lessons } = await getLessonsByQuery("course", courseId)

  if (!lessons?.length || !lessons) {
    return (<div className="flex flex-col gap-3 mx-auto">
      <Component404 />

      <h2 className="text-2xl">Sorry, We could not find lessons for <span className="text-primary">{course?.name}</span> in the faculty of <span className="text-primary">{user?.data?.faculty!}</span> for <span className="text-primary">{school?.name}</span>
      <br />Please check back again or select another course on the <Link href={learn_urls()} className='text-primary underline'>Course page</Link>.
      </h2>
    </div>)
  }

  return (
    <div className='flex flex-col gap-3'>
      <h2 className="text-4xl py-4 text-primary">Select a topic from <span className="text-primary">{course.name} ({course.code})</span></h2>
        <section className="flex flex-wrap flex-row gap-4">
          {
            lessons?.map(lesson => (<LessonItem lesson={lesson} key={lesson.id} />))
          }
        </section>
    </div>
  )
}

export default LessonComponent
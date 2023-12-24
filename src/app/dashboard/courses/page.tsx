import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import CourseComponent from './CourseComponent'
import { CourseList, getCourses } from '@/supabase/courses'
import CourseTable from './CourseTable'

const CoursesPage = async () => {
  const courses = await getCourses()
  return (
    <MaxWrapper className='max-w-7x flex-1'>
        <h2 className="text-2xl py-2">Courses</h2>
        <div className='flex flex-col gap-4'>
            <CourseComponent />
            <CourseTable courses={courses as CourseList} />
        </div>
    </MaxWrapper>
  )
}

export default CoursesPage

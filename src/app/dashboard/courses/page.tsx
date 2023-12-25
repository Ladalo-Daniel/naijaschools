import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import CourseComponent from './CourseComponent'

const CoursesPage = async () => {
  return (
    <MaxWrapper className='max-w-7x xl:max-w-max flex-1 bg-background'>
        <h2 className="text-2xl py-2">Courses</h2>
        <div className='flex flex-col gap-4'>
            <CourseComponent />
        </div>
    </MaxWrapper>
  )
}

export default CoursesPage

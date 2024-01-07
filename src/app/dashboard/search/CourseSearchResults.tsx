import { CourseList } from '@/supabase/courses'
import Link from 'next/link'
import React from 'react'
import AISearchResponse from './AISearchResponse'
import { Alert } from '@/components/ui/alert'

const CourseSearchResults = ({ courses, query }: { courses: CourseList, query?: string }) => {
    if (!courses.length) return <div className='flex flex-col gap-3'>
        <Alert>
            Your query <b>{query}</b> could not be found in our Courses. You may proceed with Naijaschools AI.
        </Alert>
        <AISearchResponse query={query!} />
    </div>

  return (
    <div className='flex flex-col gap-3'>
        {
            courses.map(course => (
                <Link href={`/dashboard/s/courses/${course.id}`} key={course.id} className='my-2 max-w-2xl border-b py-2'>
                    <h2 className='text-[18px] text-primary py-2'>{course.name} ({course.code})</h2>
                </Link>
            ))
        }
    </div>
  )
}

export default CourseSearchResults
import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import { User } from '@/supabase/user'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Link from 'next/link'
import React from 'react'

const StudentsCoursesComponent = ({ profile, courses, institutions }: { profile: User, courses: CourseList, institutions: InstitutionList }) => {
    const userCourses = courses
    .filter(course => course.institution == profile.institution)

    const institutionName = institutions?.find(institution => institution.id === parseInt(profile?.institution!))?.name

    if (userCourses?.length === 0) {
        return <div className='p-4 border shadow rounded-md py-6'>
            <p>Your Institution <b>&quot;{institutionName}&quot;</b> does not have registered courses yet. Check again later or edit your institution to the appropriate one <Link href={'/dashboard/profile'} className='text-primary hover:underline transition-all'>here</Link>.</p>
        </div>
    }
  return (
    <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-3'>
            <h2 className='text-2xl text-primary'>{institutionName}.</h2>
            <p className='text-sm py-2'>Note that Courses here reflects the ones that applies to your selected Institution. You can always change it on your <Link href={'/dashboard/profile'} className='text-primary hover:underline transition-all'>profile page</Link>.</p>
        </div>
        <section className='flex flex-wrap gap-4'>
        {
            userCourses?.map(course => (
                <Card 
                  className='bg-card min-h-40 max-w-[300px] transition-all max-sm:w-full hover:animate-appearance-in hover:opacity-60 p-3' 
                  key={course?.id}
                  as={Link}
                  href={`/dashboard/s/courses/${course.id}`}
                  >
                    <CardHeader>
                        <h2 className='text-primary py-2'>
                            {course.name}
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <p className='font-semibold py-2'>
                            {course.code}
                        </p>
                        <p>
                            {course.description}
                        </p>
                    </CardBody>
                </Card>
            ))
        }
        </section>
    </div>
  )
}

export default StudentsCoursesComponent
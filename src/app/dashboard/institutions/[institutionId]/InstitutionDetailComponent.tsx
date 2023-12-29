import { CourseList } from '@/supabase/courses'
import { Institution } from '@/supabase/institutions'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const InstitutionDetailComponent = ({ institution, courses }: { institution: Institution, courses: CourseList }) => {

  if (courses?.length === 0) {
    return( 
        <Card className='p-4'> 
            <CardBody>
                <h2 className='tracking-tighter'>Hang tight! Seems like the institution you selected doesn&#39;t have any available course yet but don&#39;t fret. Check back again as the <span className='text-primary' role='link'>Naijaschools</span> team is worgking restlessly to serve it up to you.</h2>
            </CardBody>
        </Card>)
  }

  return (
    <div className='flex flex-col gap-2'>
        <section className='flex gap-3 flex-wrap'>
            {
                courses.map(course => (
                    <Card key={course.id} className='w-72 min-h-44 flex flex-col gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out' as={Link} href={`/dashboard/institutions/${institution?.id}/courses/${course?.id}`}>
                        <CardHeader className='flex justify-between items-center'>
                            <h2 className='text-[18px] tracking-tighter'>
                                {course.code}
                            </h2>
                            <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
                        </CardHeader>
                        <CardBody className='flex flex-col gap-3'>
                            <h2 className='tracking-tighter'>{course.name}</h2>
                            <p className='text-muted-foreground tracking-tighter'>{course.description}</p>
                            <h2 className='tracking-tighter text-primary'>{course.total_marks}</h2>
                        </CardBody>
                    </Card>
                ))
            }
        </section>
    </div>
  )
}

export default InstitutionDetailComponent
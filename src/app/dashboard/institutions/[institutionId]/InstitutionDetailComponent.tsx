import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseList } from '@/supabase/courses'
import { Institution } from '@/supabase/institutions'
import Link from 'next/link'
import React from 'react'

const InstitutionDetailComponent = ({ institution, courses }: { institution: Institution, courses: CourseList }) => {
  return (
    <div className='flex flex-col gap-4'>
        <Card>
            <CardHeader>
                <CardTitle className='text-[18px] tracking-tighter'>
                    Available Courses for {institution.name}
                </CardTitle>
            </CardHeader>
            { courses?.length ? <CardContent className='flex flex-wrap gap-4'>
                {
                    courses.map(course => (
                        <Card key={course.id} className='bg-secondary'>
                            <Link href={`/dashboard/`}>
                                <CardHeader>
                                    <CardTitle className='text-[18px] tracking-tighter'>
                                        {course.code}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-3'>
                                    <h2 className='tracking-tighter'>{course.name}</h2>
                                    <p className='text-muted-foreground tracking-tighter'>{course.description}</p>
                                </CardContent>
                            </Link>
                        </Card>
                    ))
                }
            </CardContent> : 
            <CardContent>
                <h2 className='tracking-tighter'>Hang tight! Seems like the institution you selected doesn&#39;t have any available course yet but don&#39;t fret. Check back again as the <span className='text-primary' role='link'>Naijaschools</span> team is worgking restlessly to serve it up to you.</h2>
            </CardContent>}
        </Card>
    </div>
  )
}

export default InstitutionDetailComponent
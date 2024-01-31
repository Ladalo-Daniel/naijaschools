import { Course } from '@/supabase/courses'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CourseCardProps {
    course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card key={course.id} className='w-72 min-h-44 flex flex-col shadow-md rounded-sm gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out' 
      as={Link} 
      href={`/dashboard/learn/courses/${course?.id}`}>
        <CardHeader className='flex justify-between items-center'>
            <h2 className='text-2xl tracking-tighter'>
                {course.code}
            </h2>
            <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
        </CardHeader>
        <CardBody className='flex flex-col gap-3'>
            <h2 className='tracking-tighter text-xl'>{course.name}</h2>
            <p className='text-muted-foreground tracking-tighter'>{course.description}</p>
        </CardBody>
    </Card>
  )
}

export default CourseCard
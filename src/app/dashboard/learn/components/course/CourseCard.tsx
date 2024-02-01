import { Course } from '@/supabase/courses'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const bgColors = [
  'bg-orange-500 text-orange-50',
  'bg-blue-500 text-blue-50',
  'bg-green-500 text-green-50',
  'bg-purple-500 text-purple-50',
  'bg-fuchsia-500 text-fuchsia-50',
  // 'bg-orange-500 text-orange-50',
  // 'bg-orange-500 text-orange-50',
  // 'bg-orange-500 text-orange-50',
  // bgColors[Math.round((course.id * 6) % 5)] + 
]
interface CourseCardProps {
    course: Course
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card key={course.id} className={' w-72 min-h-44 flex border flex-col shadow-md rounded-md gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out'} 
      as={Link} 
      href={`/dashboard/learn/courses/${course?.id}`}>
        <CardHeader className='flex justify-between items-center'>
            <h2 className='text-2xl tracking-tighter'>
                {course.code}
            </h2>
            <ArrowRightCircleIcon size={15} className='hover:animate-pulse' />
        </CardHeader>
        <CardBody className='flex flex-col gap-3'>
            <h2 className='tracking-tighter text-xl'>{course.name}</h2>
            <p className='tracking-tighter'>{course.description}</p>
        </CardBody>
    </Card>
  )
}

export default CourseCard
import { learn_urls } from '@/app/dashboard/urls'
import { Course } from '@/supabase/courses'
import { Lesson } from '@/supabase/lessons'
import { Card } from '@nextui-org/card'
import Link from 'next/link'
import React from 'react'

interface NavigateLessonItemProps {
    setSheet: React.Dispatch<React.SetStateAction<boolean>>,
    open?: boolean,
    lesson: Lesson,
    course: Course
}

const NavigateLessonItem: React.FC<NavigateLessonItemProps> = ({setSheet, lesson, course}) => {
  return (
    <Card as={Link} 
        onClick={() => setSheet(false)}
        href={learn_urls(course?.id, lesson.id)}
        className={'shadow-none rounded-none border-b p-4 my-2 bg-background '}
        >
        <div className='flex gap-2'>
            <p className='text-muted-foreground py-3 -mt-3 flex flex-wrap items-center gap-1'>
                {lesson.title}
            </p>
        </div>
    </Card>
  )
}

export default NavigateLessonItem
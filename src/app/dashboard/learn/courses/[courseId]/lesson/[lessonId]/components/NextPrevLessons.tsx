'use client'

import { learn_urls } from '@/app/dashboard/urls'
import { Lesson } from '@/supabase/lessons'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React, { useContext } from 'react'
import { NavContext } from '../../../components/NavigateLessonContext'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'

interface NextPrevLessonsProps {
    lesson: Lesson,
}

const NextPrevLessons: React.FC<NextPrevLessonsProps> = ({lesson}) => {
    const {lessons, lessonId} = useContext(NavContext)
    const currentLesson = lessons.find(lesson => lesson.id === parseInt(lessonId))
    let nextLessonId = 0
    let prevLessonId = null

    const currIndex = lessons?.indexOf(currentLesson as Lesson)

    try {
        nextLessonId = lessons[currIndex + 1]?.id

        if (currIndex > 0) {
          prevLessonId = lessons[currIndex - 1]?.id
        }

    } catch(error) {

    }

  return (
    <section className="flex justify-between py-6 w-full">
        {prevLessonId && 
        <div className='flex-1'>
            <Button 
                as={Link}
                href={learn_urls(lesson?.course!, prevLessonId)}
                startContent={
                    <DoubleArrowLeftIcon fontSize={15} />
                }
                variant='bordered'
                size='sm'
                color='warning'
            >
            Previous
            </Button>
        </div>
        }
        {(nextLessonId || !(currIndex === lessons.length - 1)) && 
        <div className='flex-1 justify-end float-right'>
            <Button 
                as={Link}
                href={learn_urls(lesson?.course!, nextLessonId)}
                endContent={
                    <DoubleArrowRightIcon fontSize={15} />
                }
                color='primary'
                variant='bordered'
                size='sm'
                className='float-right'
            >
            Next
            </Button>
        </div>
        }
    </section>
  )
}

export default NextPrevLessons
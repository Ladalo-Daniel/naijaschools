import { slugify } from '@/lib/utils'
import { Lesson } from '@/supabase/lessons'
import { Card } from '@nextui-org/card'
import Link from 'next/link'
import React from 'react'

interface LessonItemProps {
    lesson: Lesson,
}

const bgColors = [
    'bg-orange-500 text-orange-50',
    'bg-blue-500 text-blue-50',
    'bg-green-500 text-green-50',
    'bg-purple-500 text-purple-50',
    'bg-fuchsia-500 text-fuchsia-50',
    // 'bg-orange-500 text-orange-50',
    // 'bg-orange-500 text-orange-50',
    // 'bg-orange-500 text-orange-50',
    //  bgColors[Math.round((lesson.id * 6) % 5)]
]

const LessonItem: React.FC<LessonItemProps> = ({lesson}) => {
  return (
    <Card
        as={Link}
        className={'p-4 border text-xl max-sm:w-full w-80 '}
        href={`/dashboard/learn/courses/${lesson.course}/lesson/${lesson?.id}`}
    >
        <h2>{lesson.title}</h2>
    </Card>
  )
}

export default LessonItem
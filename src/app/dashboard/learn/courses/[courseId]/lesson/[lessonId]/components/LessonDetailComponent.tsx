import BackToTopButton from '@/app/dashboard/learn/components/BackToTopButton'
import HeadingLinks from '@/app/dashboard/learn/markdown/HeadingLinks'
import LessonMarkdown from '@/app/dashboard/learn/markdown/LessonMarkdown'
import { getLessonById } from '@/supabase/lessons'
import React from 'react'
import NextPrevLessons from './NextPrevLessons'

interface LessonComponentProps {
    lessonId: string,
}

const LessonDetailComponent: React.FC<LessonComponentProps> = async ({lessonId}) => {
    const { data: lesson } = await getLessonById(lessonId)
  return (
    <div className='flex flex-col gap-3 py-4 relative'>
        <h2 className="text-4xl text-primary py-4">{lesson.title}</h2>
        
        <HeadingLinks markdown={lesson?.content!} />

        <section className="flex">
            <LessonMarkdown content={lesson.content!} />
        </section>

        {lesson?.summary && <section className="flex flex-col gap-3 p-4 rounded-lg border mt-3">
            <h2 className="text-3xl">Summary</h2>
            <LessonMarkdown content={lesson.summary!} />
        </section>}

        <section className="fixed z-20 right-10 bottom-5">
            <BackToTopButton />
        </section>

        <NextPrevLessons lesson={lesson} />
    </div>
  )
}

export default LessonDetailComponent
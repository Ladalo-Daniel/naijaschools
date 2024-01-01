import { getQuizzesByQuery } from '@/supabase/quiz'
import { getUserSession } from '@/supabase/session'
import React from 'react'
import HistoryCourseSection from './HistoryCourseSection'

const QuizHistoryComponent = async () => {
  const session = await getUserSession()
  const {data: quizzes} = await getQuizzesByQuery("user_id", session?.user?.id!)

  const courseIds = Array.from(
    new Set(quizzes.map(val => val.course_id))
  )

    
  return (
    <div className='flex flex-col gap-3'>
      {
        courseIds.map(id => (
          <section key={id} className='flex flex-col gap-4'>
            <HistoryCourseSection courseId={id!} />
          </section>
        ))
      }
    </div>
  )
}

export default QuizHistoryComponent
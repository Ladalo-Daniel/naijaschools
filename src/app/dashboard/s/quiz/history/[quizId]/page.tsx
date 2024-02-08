import MaxWrapper from '@/components/MaxWrapper'
import { QuizQuestionList, getQuizById } from '@/supabase/quiz'
import React from 'react'
import QuizResults from '../../components/QuizResults'
import { Metadata } from 'next'
import { getCourseById } from '@/supabase/courses'
import { redirect } from 'next/navigation'


export const metadata: Metadata = {
  title: "Quiz History",
  description: "Naijaschools quiz history"
}

const QuizHistoryDetalPage = async ({ params }: { params: { quizId: string }}) => {
    try {
      const {quizId} = params

    
    const {data: quiz, error} = await getQuizById(quizId)

    if (!quiz) return redirect('/dashboard/quiz/history')

    const cleanedQuestions = JSON.parse(quiz.questions?.toString()!) as QuizQuestionList
    const cleanedAnswers = JSON.parse(quiz.answers?.toString()!) as Record<number, string>
    const { data: course } = await getCourseById(quiz?.course_id!)

  return (
    <MaxWrapper className='bg-background gap-3 p-4'>
        <h2 className='text-2xl py-2 text-primary'>Quiz #{quiz?.id}</h2>
        <section>
            <QuizResults 
              questions={cleanedQuestions} 
              userAnswers={cleanedAnswers} 
              score={quiz?.total_score!} 
              isHistory 
              institutionId={course?.institution!} 
              courseId={quiz?.course_id!}
            />
        </section>
    </MaxWrapper>
  )
} catch (k) { return redirect('/dashboard/s/quiz/history') }
}

export default QuizHistoryDetalPage
import MaxWrapper from '@/components/MaxWrapper'
import { QuizQuestionList, getQuizById } from '@/supabase/quiz'
import React from 'react'
import QuizResults from '../../QuizResults'

const QuizHistoryDetalPage = async ({ params }: { params: { quizId: string }}) => {
    const {quizId} = params
    const {data: quiz} = await getQuizById(quizId)
    const cleanedQuestions = JSON.parse(quiz.questions?.toString()!) as QuizQuestionList
    const cleanedAnswers = JSON.parse(quiz.answers?.toString()!) as Record<number, string>
    const { created_at, duration, total_score, updated_at, course_id} = quiz

  return (
    <MaxWrapper className='bg-background gap-3 p-4'>
        <h2 className='text-2xl py-2 text-primary'>Quiz #{quiz.id}</h2>
        <section>
            <QuizResults questions={cleanedQuestions} userAnswers={cleanedAnswers} score={total_score!} isHistory/>
        </section>
    </MaxWrapper>
  )
}

export default QuizHistoryDetalPage
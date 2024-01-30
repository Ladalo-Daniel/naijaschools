import React from 'react'
import { cn } from '@/lib/utils'
import { Question } from '@/supabase/questions'
import { CheckCircle2, XCircleIcon } from 'lucide-react'

interface QuizResultItemProps {
    question: Question,
    index: number,
    userAnswers: Record<string, string>
}

const QuizResultItem: React.FC<QuizResultItemProps> = ({ question, index, userAnswers }) => {
  return (
    <div className='flex flex-row items-start gap-2 py-2'>
        <div className="w-14 h-14 flex items-center justify-center rounded-full shadow">
            <p className="w-full h-full text-2xl">{index + 1}.</p>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl pb-4 border-b">{question?.question!}</h2>

            <div className={cn("flex flex-col gap-2 py-2")}>
                <b className={cn("font-semibold py-1")}>Your Answer:</b>
                <p className={cn("font-semibold py-1", {
                "text-primary": question.answer === userAnswers[question.id],
                "text-rose-500": !(question.answer === userAnswers[question.id]),
            })}>{userAnswers[question?.id!]}</p>
            </div>
            <div className="flex flex-col gap-2 py-4">
                <b className='font-semibold py-1'>Correct Answer:</b>
                <p>{question.answer}</p>
            </div>
            <div className="status py-2">
              {userAnswers[question.id] === question.answer ? <CheckCircle2 className='text-primary' /> : <XCircleIcon className='text-rose-500' />}
            </div>
            {question.explanation && <div className="status py-2">
                <b className='font-semibold py-1'>Explanation</b>
                <p className="text-muted-foreground">{question.explanation}</p>
            </div>}
        </div>
    </div>
  )
}

export default QuizResultItem
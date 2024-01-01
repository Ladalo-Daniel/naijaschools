import { Button } from '@/components/ui/button'
import { QuizQuestion, QuizQuestionList } from '@/supabase/quiz'
import { RadioGroup } from '@nextui-org/radio'
import React from 'react'

const ShowQuestions = ({ 
    question, 
    currentQuestion,
    questions,
    renderOptions,
    handleNextQuestion,
    handlePrevQuestion,
    checkAnswers,
}: { 
    question: QuizQuestion, 
    currentQuestion: number,
    questions: QuizQuestionList,
    renderOptions: (question: QuizQuestion) => React.ReactNode[],
    handleNextQuestion: () => void,
    handlePrevQuestion: () => void,
    checkAnswers: () => void,
}) => {
  return (
    <div className=''>
        <div key={question.id} className='bg-background'>
        <div className='py-6 shadow-md w-full flex flex-col gap-3 px-4 bg-slate-50 dark:bg-background rounded-md'>
            <h3 className='text-[18px] text-primary my-2'>{currentQuestion + 1}. {question.question}</h3>
            <RadioGroup className='flex flex-col gap-3'>
                {renderOptions(question as any)}
            </RadioGroup>

            <div className='flex items-center justify-between py-4 relative h-36'>
                {currentQuestion === 0 ? null : 
                    <div className='relative w-full mb-2'>
                        <Button onClick={handlePrevQuestion} variant={'outline'} className='absolute left-2'>Previous</Button>
                    </div>
                }

                {currentQuestion === questions.length - 1 ? null : 
                    <div className='relative w-full mb-2'>
                        <Button onClick={handleNextQuestion} variant={'outline'} className='absolute right-2'>Next</Button>
                    </div>}

                {currentQuestion === questions.length - 1 && 
                    <div className='relative w-full mb-2'>
                        <Button onClick={checkAnswers} variant={'outline'} className='absolute right-2'>Finish</Button>
                    </div>
                }
            </div>
        </div>
        </div>
    </div>
  )
}

export default ShowQuestions
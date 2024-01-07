import QuizExplanation from '@/app/chats/QuizExplanation'
import { useGetQuizExplanation } from '@/app/chats/useGetQuizExplanation'
import { Button } from '@/components/ui/button'
import { QuizQuestion, QuizQuestionList } from '@/supabase/quiz'
import { RadioGroup } from '@nextui-org/radio'
import React from 'react'
import { toast } from 'sonner'

const ShowQuestions = ({ 
    question, 
    currentQuestion,
    questions,
    renderOptions,
    handleNextQuestion,
    handlePrevQuestion,
    checkAnswers,
    userAnswers
}: { 
    question: QuizQuestion, 
    currentQuestion: number,
    questions: QuizQuestionList,
    renderOptions: (question: QuizQuestion) => React.ReactNode[],
    handleNextQuestion: () => void,
    handlePrevQuestion: () => void,
    checkAnswers: () => void,
    userAnswers: Record<string, string>
}) => {

    const { mutate: getQuizExplanation, isPending: isGetting, data: response } = useGetQuizExplanation()

    function handleGetQuizExplanation() {
        const question = questions[currentQuestion]
        const query = `
            Below is the question, options and answer object in a string format.
            Explain to me why the correct answer is the *answer* specified in relation to the context of the question.

            ${JSON.stringify(question)}
        `
        getQuizExplanation({
            message: query
        }, {
            onSuccess: (data) => {
                toast.success("AI query is ready!")
            },
            onError: ({ message }) => {
                toast.error("AI had a hard time getting an explanation for this question. Hard luck!")
            },
        })
    }

  return (
    <div className='flex flex-col gap-3'>
        <div key={question.id} className='bg-background'>
        <div className='py-6 shadow-md w-full flex flex-col gap-3 px-4 bg-slate-50 dark:bg-background rounded-md'>
            <h3 className='text-[18px] text-primary my-2'>{currentQuestion + 1}. {question.question}</h3>
            <RadioGroup className='flex flex-col gap-3' defaultValue={userAnswers[question.id]}>
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
        <QuizExplanation 
            response={response!} 
            isGetting={isGetting} 
            handleGetQuizExplanation={handleGetQuizExplanation} 
        />
    </div>
  )
}

export default ShowQuestions
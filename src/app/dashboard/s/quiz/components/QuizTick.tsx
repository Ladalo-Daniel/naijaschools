'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { QuestionList } from '@/supabase/questions'
import { Button } from '@nextui-org/button'
import { CheckCircle, Eye, Flame, Info } from 'lucide-react'
import React, { useState } from 'react'

const QuizTick = ({ 
    questions, 
    userAnswers,  
    handleSkipToQuestion,
    checkAnswers,
}: { 
    questions: QuestionList, 
    userAnswers: Record<string, string>,
    handleSkipToQuestion(idx: number): void,
    checkAnswers: () => void,
}) => {

  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button startContent={<Flame size={16} />} variant='flat' >
                Skip to 
            </Button>
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-3'>
            <div className="py-4">
                <h2 className="text-xl">Summary Attempts</h2>
            </div>
            <div className='flex flex-wrap gap-1 items-center overfloy-y min-h-[90vh]'>
                {
                    questions.map((q, index) => {
                        const answered = Boolean(userAnswers[q.id])
                        return (
                        <Button 
                            key={q.id}
                            className={`${answered ? "bg-primary": "bg-transparent"} mx-1 text-md border`}
                            as={'span'}
                            startContent={answered ? <CheckCircle size={15} /> : ""}
                            onClick={() => { 
                                handleSkipToQuestion(index)
                                setOpen(false)
                            }}
                        >
                            {index + 1}
                        </Button>
                        )
                    })
                }
            </div>
            <div className='py-10 flex'>
                <Button 
                  variant='flat' 
                  color='primary' 
                  fullWidth 
                  className='w-full'
                  onClick={() => {
                    checkAnswers()
                    setOpen(false)
                  }}
                >
                    Submit
                </Button>
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default QuizTick
'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuizQuestionList } from '@/supabase/quiz'
import { CheckCircle2, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const QuizResults = ({ questions, userAnswers, score, isHistory }: { 
    questions: QuizQuestionList, 
    userAnswers: Record<number, string>, 
    score?: number,
    duration?: number,
    isHistory?: boolean
}) => {
    const totalScore = isHistory ? score! : parseInt((score! / questions.length * 100).toFixed(2))

  return (
    <div className='w-auto overflow-auto'>
        <section className="flex-1">
            <h2 className="text-2xl">Score: <span className={totalScore < 40 ? "text-rose-500" : totalScore < 70 ? "text-primary-500" : "text-primary"}>{totalScore}%</span></h2>
        </section>
        <Table className='py-5 w-[90%] overflow-scroll'>
            <TableCaption>End of list. You&#39;re all caught up.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">S/N</TableHead>
                    <TableHead >Question</TableHead>
                    <TableHead >Correct Answer</TableHead>
                    <TableHead >Your Answer</TableHead>
                    <TableHead >Explanation</TableHead>
                    <TableHead >Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questions?.map((question, index) => (
                <TableRow key={index} className='py-5'>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell>{question.question}</TableCell>
                    <TableCell>{question.answer}</TableCell>
                    <TableCell className={userAnswers[question.id] === question.answer ? "text-primary" : "text-rose-500"}>{userAnswers[question.id]}</TableCell>
                    <TableCell>{question.explanation}</TableCell>
                    <TableCell>
                        {userAnswers[question.id] === question.answer ? <CheckCircle2 className='text-primary' /> : <XCircleIcon className='text-rose-500' />}
                    </TableCell>
                </TableRow>))}
            </TableBody>
        </Table>
        <section className="actions flex gap-4 max-sm:flex-col flex-wrap max-sm:items-center p-4 w-full">
            <Button variant={'default'}
                onClick={() => {

                }}
                className='max-sm:w-full'
            >Retake Quiz</Button>
            <Link href={'/dashboard/s/quiz/history'} className={buttonVariants({
                variant: "secondary",
                className: "max-sm:w-full"
            })}>Go to Quiz History</Link>
        </section>
    </div>
  )
}

export default QuizResults
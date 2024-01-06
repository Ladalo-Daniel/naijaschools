'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuizQuestionList } from '@/supabase/quiz'
import { ArrowUp, CheckCircle, CheckCircle2, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Confetti from 'canvas-confetti'

import { useRouter } from 'next/navigation'

const QuizResults = ({ questions, userAnswers, score, isHistory, courseId, institutionId, correct, wrong }: { 
    questions: QuizQuestionList, 
    userAnswers: Record<number, string>, 
    score?: number,
    duration?: number,
    isHistory?: boolean,
    institutionId?: string | number,
    courseId?: string | number,
    correct?: number,
    wrong?: number,
}) => {
    const router = useRouter()
    const totalScore = isHistory ? score! : parseInt((score! / questions.length * 100).toFixed(2))

    const handlePrint = () => {
        const contentToPrint = document.getElementById('contentToPrint')?.innerHTML
        const printWindow = window?.open('', '_blank')
      
        printWindow?.document.open()
        printWindow?.document.write(`<html><head><title>@Naijaschools - xeposoft. </title></head><body>`)
        printWindow?.document.write(contentToPrint as string)
      
        const stylesheets = Array.from(document.styleSheets).map(
          (styleSheet) =>
            `<link rel="stylesheet" href="${(styleSheet as CSSStyleSheet).href}" />`
        )
        printWindow?.document.write(stylesheets.join(''))
      
        printWindow?.document.write('</body></html>')
      
        printWindow?.document.close()
        printWindow?.print()
      }

      const fireConfetti = () => {
        Confetti({
          particleCount: 1000,
          spread: 70,
          origin: { y: 0.6 }
        });
      };

      useEffect(() => {
        if (totalScore > 75) fireConfetti()
      }, [totalScore])
      

  return (
    <div className='w-auto overflow-auto' id='contentToPrint'>
        <section className="flex-1 flex-col flex gap-3 p-4 rounded-md border my-2">
            <h2 className="text-2xl">Score: <span className={totalScore < 40 ? "text-rose-500" : totalScore < 70 ? "text-primary-500" : "text-primary"}>{totalScore}%</span></h2>
            {correct && <p className='text-primary flex items-center gap-2'>Total Correct: {correct} <CheckCircle /></p>}
            {wrong && <p className='text-rose-500 flex items-center gap-2'>Total wrong: {wrong} <XCircleIcon /></p>}
        </section>
        <Table className='py-5 overflow-scroll'>
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
                    router.push(`/dashboard/s/quiz/start/${institutionId}/course/${courseId}?noq=${questions.length}?retake=true`)
                }}
                className='max-sm:w-full'
                title='Retake this quiz.'
            >Retake Quiz</Button>
            <Link href={'/dashboard/s/quiz/history'} 
                className={buttonVariants({
                variant: "secondary",
                className: "max-sm:w-full"
            })}
                title='Go to your quiz history'
            >Go to Quiz History</Link>
            <Button variant={'outline'}
                onClick={handlePrint}
                className='max-sm:w-full'
                title='Print this result.'
            >Print</Button>
            <Button 
                variant={'ghost'}
                title='Back to top'
                onClick={() => {
                    scrollTo({top: 0})
                }}
                className='max-sm:w-full'
            ><ArrowUp size={15} /></Button>
        </section>
    </div>
  )
}

export default QuizResults
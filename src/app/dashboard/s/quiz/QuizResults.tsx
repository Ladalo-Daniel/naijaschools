import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QuizQuestionList } from '@/supabase/quiz'
import { CheckCircle2, XCircleIcon } from 'lucide-react'
import React from 'react'

const QuizResults = ({ questions, userAnswers, score }: { questions: QuizQuestionList, userAnswers: Record<number, string>, score?: number}) => {
    const totalScore = parseInt((score! / questions.length * 100).toFixed(2))

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
    </div>
  )
}

export default QuizResults
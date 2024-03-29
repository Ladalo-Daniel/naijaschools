'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Edit2 } from 'lucide-react'
import { QuestionList } from '@/supabase/questions'
import DeleteQuestion from './DeleteQuestion'
import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'


const QuestionTable = ({ questions, courses, institutions }: {questions: QuestionList, courses: CourseList, institutions: InstitutionList}) => {

  return (
     <Table className='py-5'>
      <TableCaption>End of list. You&#39;re all caught up.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">S/N</TableHead>
          <TableHead>Institution</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Option 1</TableHead>
          <TableHead>Option 2</TableHead>
          <TableHead>Option 3</TableHead>
          <TableHead>Option 4</TableHead>
          <TableHead>Answer</TableHead>
          <TableHead>Explanation</TableHead>
          <TableHead>Total Mark</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((i, j) => (
          <TableRow key={j}>
            <TableHead className='text-primary'>{j+1}.</TableHead>
            <TableHead>{institutions?.find(old => old?.id === courses?.find(_old => _old?.id === i.course_id!)?.institution)?.name}</TableHead>
            <TableHead>{courses?.find(old => old?.id === i.course_id!)?.code}</TableHead>
            <TableHead>{courses?.find(old => old?.id === i.course_id!)?.name}</TableHead>
            <TableHead>{i.question}</TableHead>
            <TableHead>{i.option1}</TableHead>
            <TableHead>{i.option2}</TableHead>
            <TableHead>{i.option3}</TableHead>
            <TableHead>{i.option4}</TableHead>
            <TableHead className='text-primary'>{i.answer}</TableHead>
            <TableHead>{i.explanation || "-"}</TableHead>
            <TableHead>{i.marks}</TableHead>
            <TableCell className="flex items-center gap-2">

              <DeleteQuestion question={i}/>
              <Link href={`/dashboard/questions/edit/${i.id}`} className={cn('bg-transparent text-primary', buttonVariants({
                variant: "link"
              }))}><Edit2 size={15} /></Link>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default QuestionTable
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import QuestionTable from './QuestionTable'
import { getQuestions } from '@/supabase/questions'
import { CourseList, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'

const QuestionComponent = async () => {
  const { data: questions } = await getQuestions()
  const courses = await getCourses()
  const institutions = await getInstitutions()
  return (
    <div>
        <Link href={'/dashboard/questions/new'} className={cn(buttonVariants({
            variant: "link",
            className: "mb-4 mt-2"
        }))}>New Question</Link>
        <section>
          <QuestionTable questions={ questions } courses={courses as CourseList} institutions={institutions as InstitutionList}/>
        </section>
    </div>
  )
} 

export default QuestionComponent
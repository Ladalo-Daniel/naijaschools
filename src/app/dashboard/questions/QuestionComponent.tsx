import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { Suspense } from 'react'
import QuestionTable from './QuestionTable'
import { getQuestions } from '@/supabase/questions'
import { CourseList, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import TableSkeleton from '../components/skeletons/TableSkeleton'

const QuestionComponent = async () => {
  const { data: questions } = await getQuestions()
  const courses = await getCourses()
  const institutions = await getInstitutions()
  return (
    <div className='flex flex-col gap-3 flex-1 justify-start'>
        <section>
          <Link href={'/dashboard/questions/new'} className={cn(buttonVariants({
              variant: "link",
              className: "mb-4 mt-2 border border-primary"
          }))}>Add New Questions</Link>
        </section>
        <section>
          <Suspense fallback={<TableSkeleton />}>
            <QuestionTable questions={ questions } courses={courses as CourseList} institutions={institutions as InstitutionList}/>
          </Suspense>
        </section>
    </div>
  )
} 

export default QuestionComponent
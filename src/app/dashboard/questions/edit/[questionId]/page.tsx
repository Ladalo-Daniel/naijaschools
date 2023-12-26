import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import { CourseList, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import QuestionEditComponent from './QuestionEditComponent'

const QuestionEditPage = async ({ params }: { params: any}) => {
  const id = params?.questionId as any

    const courses = await getCourses()
    const institutions = await getInstitutions()
  return (
    <MaxWrapper className='bg-backround flex-1'>
        <h2 className="text-2xl py-2">Edit Question</h2>
        <section className='flex flex-col gap-3'>
            <QuestionEditComponent courses={courses as CourseList} institutions={institutions as InstitutionList} id={id} />
        </section>
    </MaxWrapper>
  )
}

export default QuestionEditPage
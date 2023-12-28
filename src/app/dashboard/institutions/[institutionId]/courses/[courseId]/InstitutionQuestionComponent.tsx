import QuestionTable from '@/app/dashboard/questions/QuestionTable'
import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import { QuestionList } from '@/supabase/questions'
import React from 'react'

const InstitutionCourseComponent = async ({ questions, courses, institutions } : { questions: QuestionList, courses: CourseList, institutions: InstitutionList }) => {
  
  return (
    <div className='flex flex-col gap-3 hover:opacity-90'>
        <section>
          <QuestionTable questions={questions} courses={courses as CourseList} institutions={institutions as InstitutionList} />
        </section>
    </div>
  )
}

export default InstitutionCourseComponent
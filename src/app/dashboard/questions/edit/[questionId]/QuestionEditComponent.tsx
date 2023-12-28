'use client'

import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import React from 'react'
import NewQuestionComponent from '../../new/NewQuestionComponent'
import { useGetQuestionById } from '@/lib/react-query'

const QuestionEditComponent = ({courses, institutions, id}: {
    courses: CourseList,
    institutions: InstitutionList,
    id: string
}) => {
    const { data: question } = useGetQuestionById(id || "")
  return (
    <div className=''>
        <NewQuestionComponent courses={courses as CourseList} institutions={institutions as InstitutionList} question={question?.data as any} />
    </div>
  )
} 

export default QuestionEditComponent
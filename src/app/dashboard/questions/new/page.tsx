import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import SelectInstitution from '../SelectInstitution'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import NewQuestionComponent from './NewQuestionComponent'
import { CourseList, getCourses } from '@/supabase/courses'

const NewQuestionPage = async () => {
    const institutions = await getInstitutions()
    const courses = await getCourses()
  return (
    <MaxWrapper className='bg-backround flex-1'>
        <h2 className='text-2xl py-2'>Add Questions</h2>
        <div className='flex flex-col gap-4'>
          <NewQuestionComponent institutions={institutions as InstitutionList} courses={courses as CourseList} />
        </div>
    </MaxWrapper>
  )
}

export default NewQuestionPage
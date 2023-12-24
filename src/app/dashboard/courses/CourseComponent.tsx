import React from 'react'
import AddCourseForm from './AddCourseForm'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'

const CourseComponent = async () => {
  const institutions = await getInstitutions()
  return (
    <div className=''>
        <AddCourseForm institutions={institutions as InstitutionList}/>
    </div>
  )
}

export default CourseComponent
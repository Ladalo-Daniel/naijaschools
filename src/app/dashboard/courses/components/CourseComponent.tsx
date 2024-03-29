import React from 'react'
import AddCourseForm from './AddCourseForm'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import CourseTable from './CourseTable'
import { CourseList, getCourses } from '@/supabase/courses'
import { getProfile } from '@/supabase/user'

const CourseComponent = async () => {
  const {data: institutions} = await getInstitutions()
  const courses = await getCourses()
  const currentUser = await getProfile()
  return (
    <div className=''>
        {currentUser?.data?.role === "admin" && <AddCourseForm institutions={institutions as InstitutionList}/>}
        <div className='flex flex-col gap-4 mb-3'>
          <CourseTable courses={courses as CourseList} institutions={institutions as InstitutionList}/>
        </div>
    </div>
  )
}

export default CourseComponent
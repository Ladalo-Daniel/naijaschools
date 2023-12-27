'use client'

import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import React from 'react'
import SelectInstitution from '../SelectInstitution'
import { SelectCourse } from './SelectCourse'
import { useSearchParams } from 'next/navigation'

const NewQuestionComponent = ({ institutions, courses }: { institutions: InstitutionList, courses: CourseList}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    const filteredCourses = courses.filter(old => old.institution === parseInt(institutionId as string))
  return (
    <div>
        <section className='flex flex-col justify-between gap-5'>
            <SelectInstitution institutions={institutions as InstitutionList} />
            {
                institutionId && <SelectCourse courses={filteredCourses as CourseList} />
            }
        </section>
    </div>
  )
}

export default NewQuestionComponent
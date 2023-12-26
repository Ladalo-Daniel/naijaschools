'use client'

import { CourseList } from '@/supabase/courses'
import { InstitutionList } from '@/supabase/institutions'
import React, { Suspense } from 'react'
import SelectInstitution from '../SelectInstitution'
import { SelectCourse } from './SelectCourse'
import { useSearchParams } from 'next/navigation'
import SelectCourseSkeleton from '../../components/skeletons/SelectCourseSkeleton'
import { Question } from '@/supabase/questions'

const NewQuestionComponent = ({ institutions, courses, question }: { institutions: InstitutionList, courses: CourseList, question?: Question}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    const filteredCourses = courses.filter(old => old.institution == institutionId)
  return (
    <div>
        <section className='flex flex-col justify-between gap-5 overflow-auto'>
            {!question && <SelectInstitution institutions={institutions as InstitutionList} />}
            {
                (institutionId || question) && <Suspense fallback={<SelectCourseSkeleton />}>
                    <SelectCourse courses={filteredCourses as CourseList} question={question} course_id={question?.course_id as number}/>
                </Suspense>
            }
        </section>
    </div>
  )
}

export default NewQuestionComponent
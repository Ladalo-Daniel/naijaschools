import MaxWrapper from '@/components/MaxWrapper'
import React, { Suspense } from 'react'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import NewQuestionComponent from './components/NewQuestionComponent'
import { CourseList, getCourses } from '@/supabase/courses'
import SelectCourseSkeleton from '../../components/skeletons/SelectCourseSkeleton'
import BackButton from '@/components/shared/BackButton'

const NewQuestionPage = async () => {
    const {data: institutions} = await getInstitutions()
    const courses = await getCourses()
  return (
    <MaxWrapper className='bg-backround flex-1 max-w-5xl'>
      <BackButton />
        <h2 className='text-2xl py-2'>Add Questions</h2>
        <div className='flex flex-col gap-4 flex-1'>
          <Suspense fallback={<SelectCourseSkeleton />}>
            <NewQuestionComponent institutions={institutions as InstitutionList} courses={courses as CourseList} />
          </Suspense>
        </div>
    </MaxWrapper>
  )
}

export default NewQuestionPage
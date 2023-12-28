import MaxWrapper from '@/components/MaxWrapper'
import React, { Suspense } from 'react'
import { CourseList, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import QuestionEditComponent from './QuestionEditComponent'
import Loading from '@/app/dashboard/loading'
import BackButton from '@/components/shared/BackButton'

const QuestionEditPage = async ({ params }: { params: any}) => {
  const id = params?.questionId as any

    const courses = await getCourses()
    const {data: institutions} = await getInstitutions()
  return (
    <MaxWrapper className='bg-card dark:bg-background flex-1'>
      <BackButton />
        <h2 className="text-2xl py-2">Edit Question</h2>
        <section className='flex flex-col gap-3'>
            <Suspense fallback={<Loading />}>
              <QuestionEditComponent courses={courses as CourseList} institutions={institutions as InstitutionList} id={id} />
            </Suspense>
        </section>
    </MaxWrapper>
  )
}

export default QuestionEditPage
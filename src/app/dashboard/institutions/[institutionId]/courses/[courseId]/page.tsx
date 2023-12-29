import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import InstitutionCourseComponent from './InstitutionQuestionComponent'
import { QuestionList, getQuestionsByQuery } from '@/supabase/questions'
import { CourseList, getCourseById, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutionById, getInstitutions } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const InstitutionCoursePage = async ({ params }: { params: { courseId: string, institutionId: string }}) => {

  const { courseId, institutionId } = params
  const { data: courseQuestions } = await getQuestionsByQuery('course_id', courseId)
  const {data: course} = await getCourseById(courseId)
  const courses = await getCourses()
  const {data: insititutions } = await getInstitutions()
  const profile = await getProfile()
  const {data: institution} = await getInstitutionById(institutionId)

  if (profile?.data?.role !== 'admin') return redirect('/dashboard')

  return (
    <MaxWrapper className='bg-background flex-1 max-w-7xl gap-2'>
      <BackButton />
      <h2 className='text-2xl py-1'><span className='text-primary'>{course.code}</span> ({course.name})</h2>
      <h2 className='text-[18px] py-1'>Total Number of Questions: <span className='text-primary'>{courseQuestions?.length || 0}</span></h2>
      <section>
          <Link href={`/dashboard/questions/new?institution=${institution.id}&course=${courseId}`} className={cn(buttonVariants({
              variant: "link",
              className: "mb-4 mt-2 border border-primary hover:no-underline hover:bg-primary hover:text-foreground-50 hover:transition-all"
          }))}>Add Questions</Link>
        </section>
      <InstitutionCourseComponent questions={courseQuestions as QuestionList} courses={courses as CourseList} institutions={insititutions as InstitutionList} />

      {courseQuestions?.length === 0 && <p className="text-muted-foreground">Sorry, there are not questions for the course <span className="text-primary">{course?.name}</span> yet.</p>}
    </MaxWrapper>
  )
}

export default InstitutionCoursePage
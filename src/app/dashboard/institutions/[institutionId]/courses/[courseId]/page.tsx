import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import InstitutionCourseComponent from './InstitutionQuestionComponent'
import { QuestionList, getQuestionsByQuery } from '@/supabase/questions'
import { CourseList, getCourseById, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'

const InstitutionCoursePage = async ({ params }: { params: { courseId: string }}) => {

  const { courseId } = params
  const { data: courseQuestions } = await getQuestionsByQuery('course_id', courseId)
  const {data: course} = await getCourseById(courseId)
  const courses = await getCourses()
  const {data: insititutions } = await getInstitutions()

  return (
    <MaxWrapper className='bg-background flex-1 max-w-7xl gap-2'>
      <BackButton />
      <h2 className='text-2xl py-1'><span className='text-primary'>{course.code}</span> ({course.name})</h2>
      <h2 className='text-[18px] py-1'>Total Number of Questions: <span className='text-primary'>{courseQuestions?.length || 0}</span></h2>

      <InstitutionCourseComponent questions={courseQuestions as QuestionList} courses={courses as CourseList} institutions={insititutions as InstitutionList} />

      {courseQuestions?.length === 0 && <p className="text-muted-foreground">Sorry, there are not questions for the course <span className="text-primary">{course?.name}</span> yet.</p>}
    </MaxWrapper>
  )
}

export default InstitutionCoursePage
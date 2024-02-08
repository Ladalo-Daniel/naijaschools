import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import StudentsCoursesComponent from './components/StudentsCoursesComponent'
import { User, getProfile } from '@/supabase/user'
import { CourseList, getCourses } from '@/supabase/courses'
import { InstitutionList, getInstitutions } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'

const StudentCoursePage = async () => {
    const profile = await getProfile()
    const courses = await getCourses()
    const {data: institutions} = await getInstitutions()
  return (
    <MaxWrapper className='max-w-7xl bg-background'>
      <BackButton/>
        <h1 className='text-2xl py-2'>Welcome back {profile?.data?.username},</h1>
        <section className='flex flex-col gap-4'>
            <StudentsCoursesComponent profile={profile?.data as User } courses={courses as CourseList} institutions={institutions as InstitutionList} />
        </section>
    </MaxWrapper>
  )
}

export default StudentCoursePage
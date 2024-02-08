import { supabaseClient } from '@/supabase'
import { getProfile } from '@/supabase/user'
import React from 'react'
import Component404 from '../../components/404Component'
import Link from 'next/link'
import CourseCard from './course/CourseCard'

interface LearnComponentProps {}

const LearnComponent: React.FC<LearnComponentProps> = async () => {
    const user = await getProfile()
    const {data: courses} = await supabaseClient.from("courses")
        .select()
        .eq("institution", user?.data?.institution!)
        .eq("faculty", user?.data?.faculty!)

  if (!courses?.length || !courses) {
    return (<div className="flex flex-col gap-3">
      <Component404 />

      <h2 className="text-2xl">Sorry, We could not find courses for your institution and faculty: <span className="text-primary">{user?.data?.faculty!}</span>
      <br />Please check back again or select a valid institution and faculty on <Link href={"/dashboard/profile"} className='text-primary underline'>the profile page.</Link>
      </h2>
    </div>)
  }

  return (
    <div className='flex flex-col gap-3'>
      <h2 className="text-4xl py-2 text-primary">Welcome to Naijaschools &quot;Learn&quot;, now select a course to continue.</h2>
      <p className="text-muted-foreground text-sm">Note that these courses reflects your institution and faculty of <span className="text-primary">{user?.data?.faculty}</span></p>
        <section className="flex flex-wrap flex-row gap-4">
          {
            courses?.map(course => (<CourseCard course={course} key={course.id} />))
          }
        </section>
    </div>
  )
}

export default LearnComponent
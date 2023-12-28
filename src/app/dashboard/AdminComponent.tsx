import { getCourses } from '@/supabase/courses'
import { getInstitutions } from '@/supabase/institutions'
import { getStudents } from '@/supabase/students'
import { getTeachers } from '@/supabase/teachers'
import { Card } from '@nextui-org/card'
import { ChevronRight, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LineChart from './admin/charts/LineChart'
import { DoughnutChart } from './admin/charts/Doughnut'
import { getQuestions } from '@/supabase/questions'

const AdminComponent = async () => {
  const { data: institutions } = await getInstitutions()
  const { data: students } = await getStudents()
  const { data: teachers } = await getTeachers()
  const courses = await getCourses()
  const {data: questions} = await getQuestions()

  return (
    <section className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-4 md:gap-16'>
        {/* <Link href={'/dashboard/teacher'} className={buttonVariants({
          className: "transition-all"
        })} >Teachers</Link>
        <Link href={'/dashboard/students'} className={buttonVariants({
          variant: "secondary",
          className: "transition-all bg-background"
        })} >Students</Link> */}
      </div>
      <h2 className="text-2xl pt-4 pb-2">Dasboard</h2>
      <section className='flex gap-6 flex-col lg:flex-row items-start'>
        <DoughnutChart 
          labels={['Institutions', 'Students', 'Teachers']} 
          data={[institutions.length ?? 0, students?.length ?? 0, teachers?.length ?? 0]}
        />
        <LineChart
          labels={['Institutions', 'Students', 'Teachers', 'Questions']} 
          data={[institutions.length ?? 0, students?.length ?? 0, teachers?.length ?? 0, questions?.length ?? 0]} 
        />
      </section>

      <h2 className="text-2xl pt-4 pb-2">Overview</h2>
      <div className='flex flex-wrap gap-4 w-auto py-5 md:flex-row max-xs:flex-col '>
        <Card className='p-6 h-44 border group flex flex-col gap-3 justify-between rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/teachers'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Teachers</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
            <h2 className='text-primary text-2xl'>{teachers?.length || 0}</h2>
        </Card>

        <Card className='p-6 h-44 border group flex flex-col gap-3 justify-between rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/students'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Students</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
            <h2 className='text-primary text-2xl'>{students?.length || 0}</h2>
        </Card>

        <Card className='p-6 h-44 border group flex flex-col gap-3 justify-between rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/institutions'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Institutions</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
            <h2 className='text-primary text-2xl'>{institutions?.length || 0}</h2>
        </Card>

        <Card className='p-6 h-44 border group flex flex-col gap-3 justify-between rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/courses'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Courses</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
            <h2 className='text-primary text-2xl'>{courses?.length || 0}</h2>
        </Card>
    </div>
    </section>
  )
}

export default AdminComponent
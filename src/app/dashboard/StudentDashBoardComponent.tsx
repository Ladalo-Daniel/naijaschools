import { getCoursesByQuery } from '@/supabase/courses'
import { getProfile } from '@/supabase/user'
import { Card } from '@nextui-org/card'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { BookPlusIcon, ChevronRight, HistoryIcon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StudentDashBoardComponent = async () => {
  const profile = await getProfile()
  const { data: courses } = await getCoursesByQuery("institution",  profile?.data?.institution! as string)

  return (
    <section className='flex flex-col gap-3 bg-gradient-to-tr'>
      <h2 className='text-3xl font-semibold py-3 flex-1'>Welcome back <span className="text-primary">{profile?.data?.username}</span>!</h2>
      <p className='py-2 flex-1 tracking-tighter'>Hi <span className="text-primary">{profile?.data?.username}</span>, You are most welcome back. Now jump right in!</p>

      <div className='flex flex-wrap gap-4 w-auto py-5 md:flex-row max-xs:flex-col '>
        <Card as={Link} href={'/dashboard/s/courses'} className='p-6 h-44 border group rounded-md flex justify-between w-72 hover:opacity-60 hover:transition-all dark:bg-slate-700 bg-slate-300 hover:animate-out cursor-pointer'>
            <div className='flex flex-col gap-2 flex-1'>
              <BookPlusIcon size={15}  />
              <p className='font-semibold text-sm'>Courses</p>
            </div>
            <ChevronRight className='text-primary' size={20} />
        </Card>
        <Card as={Link} href={'/dashboard/s/quiz'} className='p-6 h-44 border group rounded-md flex justify-between w-72 hover:opacity-60 hover:transition-all dark:bg-green-700 bg-green-300 hover:animate-out cursor-pointer'>
            <div className='flex flex-col gap-2 flex-1'>
              <QuestionMarkIcon height={15} width={15}  />
              <p className='font-semibold text-sm'>Quizzes</p>
            </div>
            <ChevronRight className='text-primary' size={20} />
        </Card>
        <Card as={Link} href={'/dashboard/s/quiz/history'} className='p-6 h-44 border group rounded-md hover:opacity-60 hover:transition-all dark:bg-orange-700 bg-orange-300 hover:animate-out cursor-pointer flex justify-between w-72'>
              <div className='flex flex-col gap-2 flex-1'>
                <HistoryIcon size={15}  />
                <p className='font-semibold text-sm'>History</p>
              </div>
              <ChevronRight className='text-primary' size={20} />
        </Card>
        <Card as={Link} href={'/dashboard/s/ai'} className='p-6 h-44 border group rounded-md flex justify-between w-72 hover:opacity-60 hover:transition-all dark:bg-blue-700 bg-blue-300 hover:animate-out cursor-pointer'>
            <div className='flex flex-col gap-2 flex-1'>
              <SparklesIcon size={15}  />
              <p className='font-semibold text-sm'>AI Guide</p>
            </div>
            <ChevronRight className='text-primary' size={20} />
        </Card>
      </div>
    </section>
  )
}

export default StudentDashBoardComponent
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@nextui-org/card'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { BookPlusIcon, ChevronRight, HistoryIcon, SparklesIcon, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StudentDashBoardComponent = () => {
  return (
    <section className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-4'>
        <Link href={'/dashboard/s/courses'} className={buttonVariants({
          className: "transition-all"
        })} >Courses</Link>
        <Link href={'/dashboard/s/quiz'} className={buttonVariants({
          variant: "secondary",
          className: "transition-all bg-background"
        })} >Quizzes</Link>
      </div>
      <h2 className="text-2xl pt-4 pb-2">Overview</h2>
      <div className='flex flex-wrap gap-4 w-auto py-5 md:flex-row max-xs:flex-col '>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:opacity-60 hover:transition-all hover:animate-out cursor-pointer'>
            <Link href={'/dashboard/s/courses'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <BookPlusIcon size={15}  />
                  <p className='font-semibold text-sm'>Courses</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:opacity-60 hover:transition-all hover:animate-out cursor-pointer'>
            <Link href={'/dashboard/s/quiz'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <QuestionMarkIcon height={15} width={15}  />
                  <p className='font-semibold text-sm'>Quizzes</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:opacity-60 hover:transition-all hover:animate-out cursor-pointer'>
            <Link href={'/dashboard/s/quiz/history'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <HistoryIcon size={15}  />
                  <p className='font-semibold text-sm'>History</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:opacity-60 hover:transition-all hover:animate-out cursor-pointer'>
            <Link href={'/dashboard/s/ai'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <SparklesIcon size={15}  />
                  <p className='font-semibold text-sm'>AI Guide</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
    </div>
    </section>
  )
}

export default StudentDashBoardComponent
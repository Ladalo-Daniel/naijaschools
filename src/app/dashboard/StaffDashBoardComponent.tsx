import { buttonVariants } from '@/components/ui/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ChevronRight, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StaffDashBoardComponent = () => {
  return (
    <section className='flex flex-col gap-3'>
      <div className='flex flex-wrap gap-4'>
        <Link href={'/dashboard/courses'} className={buttonVariants({
          className: "transition-all"
        })} >Courses</Link>
        <Link href={'/dashboard/students'} className={buttonVariants({
          variant: "secondary",
          className: "transition-all bg-background"
        })} >Students</Link>
      </div>
      <h2 className="text-2xl pt-4 pb-2">Overview</h2>
      <div className='flex flex-wrap gap-4 w-auto py-5 md:flex-row max-xs:flex-col '>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/students'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Students</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/institutions'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Institutions</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
        <Card className='p-6 h-44 border group rounded-md w-auto hover:transition-all hover:opacity-50 cursor-pointer'>
            <Link href={'/dashboard/courses'} className='flex justify-between w-72'>
                <div className='flex flex-col gap-2 flex-1'>
                  <User size={15}  />
                  <p className='font-semibold text-sm'>Courses</p>
                </div>
                <ChevronRight className='text-muted-foreground' size={20} />
            </Link>
        </Card>
    </div>
    </section>
  )
}

export default StaffDashBoardComponent
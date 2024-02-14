'use client'

import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Course } from '@/supabase/courses'
import { LessonList } from '@/supabase/lessons'
import Link from 'next/link'
import React, { useState } from 'react'
import NavigateLessonItem from './NavigateLessonItem'
import { Menu } from 'lucide-react'
import { learn_urls } from '@/app/dashboard/urls'

interface NavigateLessonsProps {
    lessons: LessonList,
    course: Course,
}

const NavigateLessons: React.FC<NavigateLessonsProps> = ({ lessons, course }) => {
    const [sheetOpen, setSheet] = useState(false)

  return (
    <div className=''>
        <Sheet open={sheetOpen} onOpenChange={setSheet}>
            <SheetTrigger asChild className='w-14 h-14 flex items-center cursor-pointer justify-center rounded-full hover:bg-secondary hover:transition-all'>
                <Menu size={15}/>
            </SheetTrigger>
          <SheetContent side={'right'} className='flex flex-col gap-3 flex-1 max-sm:w-full min-w-[280px]'>
            <h2 className='py-2 text-[18px] text-primary hover:transition-all'>{course?.name} ({course?.code})</h2>
            <Separator />
            <div className="min-h-screen overflow-auto">
              {
                lessons.length === 0 ? (
                  <div className='p-2 flex justify-center items-center'>
                    <p className='text-[18px] py-2 test-muted-foreground'>There are no lessons for the course <span className="text-primary">{course.name}</span> yet.</p>
                  </div>
                ): (
                  lessons.map(obj => (
                    <Link href={learn_urls(course?.id, obj.id)}  key={obj?.id + Math.random()} onClick={() => setSheet(false)}>
                      <NavigateLessonItem course={course} lesson={obj} setSheet={setSheet}/>
                    </Link>
                  ))
                )
              }
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default NavigateLessons
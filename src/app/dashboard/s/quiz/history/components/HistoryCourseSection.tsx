import React from 'react'

import { getCourseById } from '@/supabase/courses'
import { getQuizzesByQuery } from '@/supabase/quiz'
import { Card, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon, Clock } from 'lucide-react'
import Link from 'next/link'
import DeleteQuiz from './DeleteQuiz'
import { shortMultiFormatDateString } from '@/lib/utils'

const HistoryCourseSection = async ({ courseId }: { courseId: number }) => {
    const {data: quizzes} = await getQuizzesByQuery("course_id", courseId)
    const {data: course} = await getCourseById(courseId)
  return (
    <div className='flex flex-col gap-3 p-2' id={course?.name!}>
        <h2 className="text-[18px] text-primary hover:underline transition-all hover:transition-colors">{course?.name} ({course?.code})</h2>
        <section className="flex flex-wrap gap-4 max-sm:items-center">
            {
                quizzes.map(quiz => (
                    <>
                    <Card key={quiz.id + Math.random()} className='w-72 min-h-44 flex flex-col gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out'>
                        <CardHeader className='flex justify-between items-center'  as={Link} href={`/dashboard/s/quiz/history/${quiz.id}`}>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-[18px] tracking-tighter'>
                                    {course?.name} Quiz #{quiz.id}
                                </h2>
                                <p className={`py-2 font-bold ${quiz.total_score! < 40 ? "text-rose-500" : quiz.total_score! < 70 ? "text-primary-500" : "text-primary"}`}>Score: {quiz.total_score}%</p>
                                <p className={`py-2 font-bold text-muted-foreground flex items-center gap-1`}><Clock size={15}/> {shortMultiFormatDateString(quiz?.updated_at || quiz?.created_at || "")} ago.</p>
                            </div>
                            <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
                        </CardHeader>
                        <DeleteQuiz quiz={quiz!} />
                    </Card>
                    </>
                ))
            }
        </section>
    </div>
  )
}

export default HistoryCourseSection
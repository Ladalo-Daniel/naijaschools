import { getCourseById } from '@/supabase/courses'
import { getInstitutionById } from '@/supabase/institutions'
import { getQuestionsByQuery } from '@/supabase/questions'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StudentCourseViewComponent = async ({ courseId }: { courseId: string }) => {
    const { data: questions } = await getQuestionsByQuery("course_id", courseId)
    const { data: course } = await getCourseById(courseId)
    const { data: institution } = await getInstitutionById(course.institution?.toString()!)
  return (
    <div className='flex flex-col gap-3'>
        <h2 className='py-2 text-2xl text-primary hover:underline hover:transition-all'>{institution.name}</h2>

        <section>
            <Card 
                className='bg-card min-h-40 max-w-[300px] transition-all max-sm:w-full hover:animate-appearance-in hover:opacity-60 p-3' 
                key={course?.id}
                as={Link}
                href={`/dashboard/s/quiz/start/${institution.id}/course/${courseId}?noq=${50}`}
                >
                <CardHeader>
                    <h2 className='text-primary py-2'>
                        {course.name}
                    </h2>
                </CardHeader>
                <CardBody>
                    <p className='font-semibold py-2'>
                        {questions.length}+ Questions
                    </p>
                    <Link href={`/dashboard/s/quiz/start/${institution.id}/course/${courseId}?noq=${50}`} className='text-primary flex gap-2 items-center'>
                        Proceed to quiz. <MoveRight size={15} />
                    </Link>
                </CardBody>
            </Card>
        </section>
    </div>
  )
}

export default StudentCourseViewComponent
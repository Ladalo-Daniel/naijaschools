'use client'

import CardsSkeleton from '@/app/dashboard/components/skeletons/CardsSkeleton'
import DashboardSkeleton from '@/app/dashboard/components/skeletons/DashboardSkeleton'
import SelectInstitution from '@/app/dashboard/questions/SelectInstitution'
import { useGetCourseByQuery } from '@/lib/react-query'
import { InstitutionList } from '@/supabase/institutions'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const QuizStartComponent = ({ institutions, institution_id}: { institutions: InstitutionList, institution_id?: string | number}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    const { data: courses, isPending } = useGetCourseByQuery({
        column: "institution",
        row: institutionId!,
    })

    if (isPending && institutionId) return <CardsSkeleton />
    
  return (
    <div className='flex flex-col gap-3'>
        {institutionId ? (
            <div className='flex flex-wrap gap-4 md:flex-row flex-col py-2' >
                {
                    courses?.data.map(course => (
                        <Card key={course.id} className='w-72 min-h-44 flex flex-col gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out' as={Link} href={`/dashboard/s/quiz/start/${institutionId}/course/${course.id}`}>
                            <CardHeader className='flex justify-between items-center'>
                                <h2 className='text-[18px] tracking-tighter text-primary'>
                                    {course.code}
                                </h2>
                                <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
                            </CardHeader>
                            <CardBody className='flex flex-col gap-3 justify-between'>
                                <h2 className='tracking-tighter'>{course.name}</h2>
                                <p className='text-muted-foreground tracking-tighter'>{course.description}</p>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        ) : (
            <div className=''>
                <SelectInstitution institutions={institutions} institution_id={institution_id as number}/>
            </div>
        )}
    </div>
  )
}

export default QuizStartComponent
'use client'

import { useGetCourseByQuery, useGetInstitutionById } from '@/lib/react-query'
import { InstitutionList } from '@/supabase/institutions'
import { RocketIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import AutoComplete from '../../components/AutoComplete'
import { CourseList } from '@/supabase/courses'
import SelectInstitutionAutoComplete from '@/app/dashboard/questions/components/SelectInstitutionAutocomplete'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'
import Image from 'next/image'

const QuizStartComponent = ({ institutions, institution_id}: { institutions: InstitutionList, institution_id?: string | number}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    
    const { data: courses, isPending } = useGetCourseByQuery({
        column: "institution",
        row: parseInt(institutionId!),
    })
    const  { data: institution, isPending: isFetchingInstitutionData} = useGetInstitutionById(institutionId!)

    if (isPending && institutionId && isFetchingInstitutionData) return <GeneralSkeleton />
    
  return (
    <div className='flex flex-col gap-3 py-4'>
        {institutionId ? (
            <div className='flex flex-col gap-3'>
                <div className="flex-1">
                <Image
                    src={'/svg/hi_smooth.svg'}
                    width={500}
                    height={400}
                    quality={100}
                    alt='Gif of hi'
                    className='' 
                />
            </div>
                <Alert className='border-none'>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        Now select your desired Course from <span className="text-primary">{institution?.data.name}</span> to wrap it up.
                    </AlertDescription>
                </Alert>
                <AutoComplete courses={courses?.data as CourseList} institutionId={institutionId} />
            </div>
        ) : (
            <div className='flex flex-col gap-3'>
                <div className="flex-1">
                    <Image
                        src={'/svg/hi.svg'}
                        width={500}
                        height={500}
                        quality={100}
                        alt='Gif of welcome'
                        className='' 
                    />
                </div>
                <Alert className='border-none'>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        We are almost done spinning your quiz up... We only need to know your ultimate preferences so we can serve you better. Now select an institution to get started.
                    </AlertDescription>
                </Alert>
                <SelectInstitutionAutoComplete institutions={institutions} institution_id={institution_id as number}/>
            </div>
        )}
    </div>
  )
}

export default QuizStartComponent
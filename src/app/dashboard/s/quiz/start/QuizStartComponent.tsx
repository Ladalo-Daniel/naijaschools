'use client'

import { useGetCourseByQuery } from '@/lib/react-query'
import { InstitutionList, getInstitutionById } from '@/supabase/institutions'
import { RocketIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import AutoComplete from '../AutoComplete'
import { CourseList } from '@/supabase/courses'
import SelectInstitutionAutoComplete from '@/app/dashboard/questions/SelectInstitutionAutocomplete'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'

const QuizStartComponent = ({ institutions, institution_id}: { institutions: InstitutionList, institution_id?: string | number}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    const [institutionName, setInstitutionName] = useState('')
    const { data: courses, isPending } = useGetCourseByQuery({
        column: "institution",
        row: institutionId!,
    })

    getInstitutionById(institutionId ?? "").then(({data}) => setInstitutionName(data.name))

    if (isPending && institutionId) return <GeneralSkeleton />
    
  return (
    <div className='flex flex-col gap-3'>
        {institutionId ? (
            <div className='flex flex-col gap-3'>
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        Now select your desired Course from <span className="text-primary">{institutionName}</span> to wrap it up.
                    </AlertDescription>
                </Alert>
                <AutoComplete courses={courses?.data as CourseList} institutionId={institutionId} />
            </div>
        ) : (
            <div className='flex flex-col gap-3'>
                <Alert>
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
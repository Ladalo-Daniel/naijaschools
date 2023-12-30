'use client'

import CardsSkeleton from '@/app/dashboard/components/skeletons/CardsSkeleton'
import DashboardSkeleton from '@/app/dashboard/components/skeletons/DashboardSkeleton'
import SelectInstitution from '@/app/dashboard/questions/SelectInstitution'
import { useGetCourseByQuery } from '@/lib/react-query'
import { InstitutionList, getInstitutionById } from '@/supabase/institutions'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { ArrowRightCircleIcon, RocketIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import AutoComplete from '../AutoComplete'
import { CourseList } from '@/supabase/courses'
import SelectCourseSkeleton from '@/app/dashboard/components/skeletons/SelectCourseSkeleton'
import SelectInstitutionAutoComplete from '@/app/dashboard/questions/SelectInstitutionAutocomplete'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const QuizStartComponent = ({ institutions, institution_id}: { institutions: InstitutionList, institution_id?: string | number}) => {
    const searchParams = useSearchParams()
    const institutionId = searchParams.get("institution")
    const [institutionName, setInstitutionName] = useState('')
    const { data: courses, isPending } = useGetCourseByQuery({
        column: "institution",
        row: institutionId!,
    })

    getInstitutionById(institutionId ?? "").then(({data}) => setInstitutionName(data.name))

    if (isPending && institutionId) return <SelectCourseSkeleton />
    
  return (
    <div className='flex flex-col gap-3'>
        <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                We are almost done spinning your quiz up... We only need to know your ultimate preferences so we can serve you better. Now select a course from <span className="text-primary">{institutionName}</span> to continue.
            </AlertDescription>
        </Alert>
        {institutionId ? (<AutoComplete courses={courses?.data as CourseList} institutionId={institutionId} />
        ) : (
            <div className=''>
                <SelectInstitutionAutoComplete institutions={institutions} institution_id={institution_id as number}/>
            </div>
        )}
    </div>
  )
}

export default QuizStartComponent
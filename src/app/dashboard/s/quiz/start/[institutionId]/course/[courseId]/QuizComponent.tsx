'use client'

import { User } from '@/supabase/user'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import SelectQuestionNumber from './SelectQuestionNumber'
import { useFetchRandomQuestions, useGetCourseByQuery } from '@/lib/react-query'
import QuizInterface from '../../../../QuizInterface'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'

/**
 * I made the top level Component a client component because
 * this page is going to be highly interactive
 * @returns JSX.Element
 */
const QuizComponent = ({ 
    profile, 
    courseId, 
    userId, 
    coursName, 
    quizId, 
    institutionId 
}: { 
    profile: User, 
    courseId: string, 
    userId: string, 
    coursName: string, 
    quizId?: string | number,
    institutionId?: string | number 
}) => {
    const searchParams = useSearchParams()
    const noq = searchParams.get("noq")
    const retake = searchParams.get('retake')
    const {data: courses} = useGetCourseByQuery({
        column: "id",
        row: courseId
    })

    const { data: quizQuestions, isPending } = useFetchRandomQuestions({
        user_id: userId,
        course_id: parseInt(courseId),
        numberOfQuestions: parseInt(noq!),
        quizId: retake === 'true' ? quizId : undefined 
    })


    if (isPending) return <GeneralSkeleton />

    if (!noq) {
        return (<div className='flex flex-col gap-4 mb-3 mt-8'>
            <Alert className='border border-primary'>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Hi {profile?.username}!, </AlertTitle>
                <AlertDescription>
                    Please Complete Your Configuration for <span className="text-primary">{coursName}</span>. <br />
                    Don&#39;t worry, it won&#39;t take time. Select the number of questions you&#39;d love to answer. <br />
                    This is the final step.
                </AlertDescription>
            </Alert>
            <SelectQuestionNumber />
        </div>)
    }

    if (!quizQuestions?.data?.length) return <div className='p-4 border border-primary-500 rounded-md shadow'>
        There seems to be no questions for your configuration yet.
    </div>

  return (
    <div className='flex flex-col gap-3 border p-4 rounded-md'>
        <h2 className='text-2xl text-primary tracking-tighter py-2 px-4'>{courses?.data.at(0)?.name} ({courses?.data.at(0)?.code})</h2>
        <section className='flex flex-col gap-3'>
            <QuizInterface questions={quizQuestions?.data!} quizId={quizQuestions?.quizId!} courseId={courseId}/>
        </section>
    </div>
  )
}

export default QuizComponent
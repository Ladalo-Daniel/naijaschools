'use client'

import { User } from '@/supabase/user'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import SelectQuestionNumber from './SelectQuestionNumber'
import { useFetchRandomQuestions, useGetCourseByQuery } from '@/lib/react-query'
import QuizInterface from '../../../../../components/QuizInterface'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'
import { Button } from '@nextui-org/button'
import QOnboard from './QOnboard'
import Image from 'next/image'

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
    const [qOnboard, setQOnboard] = useState(true)
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


    if (isPending) return <div className="py-10 flex items-center justify-center flex-col gap-2">
        <div className="flex-1">
            <Image
                src={'/svg/running.svg'}
                width={500}
                height={500}
                quality={100}
                alt='Gif of welcome'
                className='' 
            />
        </div>
        <div className="flex flex-col gap-3">
        <h2 className='text-muted-foreground'>Hang on as we mould your quiz questions ...</h2>
        <Button isLoading={isPending} variant='flat' className='bg-transparent'>loading ...</Button>
        </div>
    </div>

    if (!noq) {
        return (<div className='flex flex-col gap-4 mb-3 mt-8'>
            <div className="flex-1">
                <Image
                    src={'/svg/hi.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    alt='Gif of hi'
                    className='' 
                />
            </div>
            <Alert className='border-none'>
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

    if (!quizQuestions?.data?.length) return <div className='p-4 rounded-md shadow flex flex-col gap-3'>
        <div className="flex-1">
            <Image
                src={'/svg/404.svg'}
                width={500}
                height={500}
                quality={100}
                alt='Gif of welcome'
                className='' 
            />
        </div>
        <p className='py-3 text-2xl'>There seems to be no questions for your configuration yet!</p>
    </div>

    if (qOnboard) return <QOnboard setQOnboard={setQOnboard} />

  return (
    <div className='flex flex-col gap-3 border p-4 rounded-md max-w-7xl'>
        <h2 className='text-2xl text-primary tracking-tighter py-2 px-4'>{courses?.data.at(0)?.name} ({courses?.data.at(0)?.code})</h2>
        <section className='flex flex-col gap-3'>
            <QuizInterface questions={quizQuestions?.data!} quizId={quizQuestions?.quizId!} courseId={courseId}/>
        </section>
    </div>
  )
}

export default QuizComponent
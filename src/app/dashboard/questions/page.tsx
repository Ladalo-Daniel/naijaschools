import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import QuestionComponent from './QuestionComponent'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'

const QuestionPage = async () => {
    const profile = await getProfile()
    if (!(profile?.data?.role === "admin" || profile?.data?.role === "staff")) redirect('/dashboard')
  return (
    <MaxWrapper className='bg-background max-w-7xl flex-1'>
        <h2 className="text-2xl py-2">
            Questions Overview
        </h2>
        <div className='flex flex-col gap-4'>
            <QuestionComponent />
        </div>
    </MaxWrapper>
  )
}

export default QuestionPage
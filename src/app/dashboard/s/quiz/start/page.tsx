import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import QuizStartComponent from './QuizStartComponent'
import { getInstitutions } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'

const QuizStartPage = async () => {
    const { data: institutions } = await getInstitutions()
  return (
    <MaxWrapper className='bg-background flex-1'>
        <BackButton />
        <h2 className="text-2xl py-2 md:py-4">Select a Course to continue.</h2>

        <section className='flex flex-col gap-3'>
            <QuizStartComponent institutions={institutions} />
        </section>
    </MaxWrapper>
  )
}

export default QuizStartPage
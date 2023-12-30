import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import StartQuizComponent from './StartQuizComponent'
import { User, getProfile } from '@/supabase/user'
import { Institution, getInstitutionById } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'

const QuizPage = async () => {
  const profile = await getProfile()
  const institution = await getInstitutionById(profile?.data?.institution as string)
  return (
    <MaxWrapper className='max-w-5xl bg-background p-2'>
      <BackButton />
      <h2 className="text-2xl tracking-tighter py-2">Start Quiz</h2>

      <section className='flex flex-col gap-3'>
        <StartQuizComponent profile={profile?.data as User} institution={ institution?.data as Institution} />
      </section>
    </MaxWrapper>
  )
}

export default QuizPage
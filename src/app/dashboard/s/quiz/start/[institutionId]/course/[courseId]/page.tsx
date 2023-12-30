import MaxWrapper from '@/components/MaxWrapper'
import { User, getProfile } from '@/supabase/user'
import React from 'react'
import QuizComponent from './QuizComponent'
import BackButton from '@/components/shared/BackButton'

const QuizDetailPage = async ({ params }: { params: { institutionId: string, courseId: string}}) => {
    const profile = await getProfile()
    const { courseId } = params

  return (
    <MaxWrapper className='flex-1 bg-background px-2'>
        <section className="py-2">
            <BackButton />
        </section>
        <QuizComponent profile={profile?.data as User} courseId={courseId} userId={profile?.data?.id as string} />
    </MaxWrapper>
  )
}

export default QuizDetailPage
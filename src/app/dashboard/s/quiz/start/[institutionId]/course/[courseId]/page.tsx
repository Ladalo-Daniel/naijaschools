import MaxWrapper from '@/components/MaxWrapper'
import { User, getProfile } from '@/supabase/user'
import React from 'react'
import QuizComponent from './QuizComponent'
import BackButton from '@/components/shared/BackButton'
import { getCourseById } from '@/supabase/courses'

const QuizDetailPage = async ({ params }: { params: { institutionId: string, courseId: string}}) => {
    const profile = await getProfile()
    const { courseId } = params
    const coursName = await (await getCourseById(courseId)).data.name

  return (
    <MaxWrapper className='flex-1 bg-background px-2 max-w-7xl'>
        <section className="py-2">
            <BackButton />
        </section>
        <QuizComponent profile={profile?.data as User} courseId={courseId} userId={profile?.data?.id as string} coursName={coursName!} />
    </MaxWrapper>
  )
}

export default QuizDetailPage
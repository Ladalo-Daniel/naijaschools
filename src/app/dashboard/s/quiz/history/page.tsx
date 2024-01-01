import MaxWrapper from '@/components/MaxWrapper'
import React, { Suspense } from 'react'
import QuizHistoryComponent from './QuizHistoryComponent'
import GeneralSkeleton from '@/app/dashboard/components/skeletons/GeneralSkeleton'
import BackButton from '@/components/shared/BackButton'

const QuizHistoryPage = () => {
  return (
    <MaxWrapper className='flex-1 bg-background gap-2'>
        <BackButton />
        <h2 className='text-2xl px-2'>Your Quiz History</h2>
        <section className="flex flex-col gap-3">
            <Suspense fallback={<GeneralSkeleton />}>
                <QuizHistoryComponent />
            </Suspense>
        </section>
    </MaxWrapper>
  )
}

export default QuizHistoryPage
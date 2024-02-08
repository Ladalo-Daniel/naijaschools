import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import LearnComponent from './components/LearnComponent'
import Loading from '../loading'

export const metadata: Metadata = {
    title: "Learn | Naijaschools | Welcome",
    description: "Learn any course @ Naijaschools"
}

const Page = () => {
  return (
    <MaxWrapper className='max-w-max p-5 w-full flex-1 bg-background'>
        <BackButton />

        <section className="flex flex-col gap-3">
          <Suspense fallback={<Loading />}>
            <LearnComponent />
          </Suspense>
        </section>
    </MaxWrapper>
  )
}

export default Page
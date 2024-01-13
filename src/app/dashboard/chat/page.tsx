import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import AIChatComponent from './AIChatComponent'
import { getAIChatResponse } from '@/openai'
import { User, getProfile } from '@/supabase/user'

const AIChatPage = async () => {
    const profile =  await getProfile()
  return (
    <MaxWrapper className='bg-background p-6 max-w-6xl'>
        <BackButton />

        <section className="flex flex-col gap-3">
            <AIChatComponent profile={profile?.data as User } />
        </section>
    </MaxWrapper>
  )
}

export default AIChatPage
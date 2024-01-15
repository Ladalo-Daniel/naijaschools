import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import AIChatComponent from './AIChatComponent'
import { User, getProfile } from '@/supabase/user'
import { Metadata } from 'next'
import ChatHistorySheet from './ChatHistorySheet'

export const metadata: Metadata = {
    title: "New Chat | Naijaschools AI",
    description: "New chat @Naijaschools AI.",
}

const AIChatPage = async () => {
    const profile =  await getProfile()
  return (
    <MaxWrapper className='bg-background p-6 max-w-5xl'>
        <ChatHistorySheet />

        <section className="flex flex-col gap-3">
            <AIChatComponent profile={profile?.data as User } />
        </section>
    </MaxWrapper>
  )
}

export default AIChatPage
import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import AIChatDetailComponent from './AIChatDetailComponent'
import { User, getProfile } from '@/supabase/user'
import { getChatById } from '@/supabase/chats'
import { Metadata, ResolvingMetadata } from 'next'
import ChatHistorySheet from '../components/ChatHistorySheet'
import AIChatComponent from '../components/AIChatComponent'

type Props = {
    params: { chatId: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
   
  export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const chatId = params.chatId
   
    const { data: chat } = await getChatById(chatId)
   
    const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: chat.title,
      openGraph: {
        images: [...previousImages],
      },
    }
  }

const AIChatDetailPage = async ({ params: { chatId }}: Props) => {
    const profile = await getProfile()
    const { data: chat } = await getChatById(chatId)
  return (
    <MaxWrapper className='bg-background p-5 max-w-5xl'>
        <ChatHistorySheet />
        <section className="flex flex-col gap-3">
            <AIChatComponent chat={chat} profile={profile?.data as User }/>
        </section>
    </MaxWrapper>
  )
}

export default AIChatDetailPage
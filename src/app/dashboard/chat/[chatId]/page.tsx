import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import AIChatDetailComponent from './AIChatDetailComponent'
import { User, getProfile } from '@/supabase/user'
import ChatHistorySheet from '../ChatHistorySheet'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@nextui-org/button'
import { History, HistoryIcon } from 'lucide-react'
import ChatHistory from '../ChatHistory'
import { getChatById } from '@/supabase/chats'

const AIChatDetailPage = async ({ params: { chatId }}:{ params: { chatId: string }}) => {
    const profile = await getProfile()
    const { data: chat } = await getChatById(chatId)
  return (
    <MaxWrapper className='bg-background p-5 max-w-5xl'>
        <div className="flex items-center justify-between">
            <BackButton />
            <Sheet>
                <SheetTrigger asChild>
                    <Button isIconOnly startContent={<History />} variant='flat' className='bg-transparent' />
                </SheetTrigger>
                <SheetContent side={'right'}>
                    <h2 className="text-[22px] py-1.5 flex items-center gap-1.5 font-semibold">Chat History <HistoryIcon /></h2>
                    <div className="overflow-auto min-h-screen">
                        <ChatHistory />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        <section className="flex flex-col gap-3">
            <AIChatDetailComponent chat={chat} profile={profile?.data as User }/>
        </section>
    </MaxWrapper>
  )
}

export default AIChatDetailPage
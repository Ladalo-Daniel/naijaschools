import BackButton from '@/components/shared/BackButton'
import { SheetContent, SheetTrigger, Sheet, SheetClose } from '@/components/ui/sheet'
import { Button } from '@nextui-org/button'
import { History, HistoryIcon } from 'lucide-react'
import React from 'react'
import ChatHistory from './ChatHistory'
import { getProfile } from '@/supabase/user'
import { getUserChats } from '@/supabase/chats'
import NewChatButton from './NewChatButton'

const ChatHistorySheet = async () => {
    const profile = await getProfile()
    const {data: chats} = await getUserChats(profile?.data?.id!)
  return (
    <div className="flex items-center justify-between">
        <BackButton />
        <Sheet>
            <SheetTrigger asChild>
                <Button isIconOnly startContent={<History />} variant='flat' className='bg-transparent' />
            </SheetTrigger>
            <SheetContent side={'right'}>
                <h2 className="text-[22px] py-1.5 flex items-center gap-1.5 font-semibold">Chat History <HistoryIcon /></h2>
                <SheetClose className="py-2.5">
                  <NewChatButton />
                </SheetClose>
                <div className="overflow-y-scroll min-h-[90%]">
                    <ChatHistory chats={chats}/>
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default ChatHistorySheet
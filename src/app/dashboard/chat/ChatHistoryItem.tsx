import { Chat } from '@/supabase/chats'
import Link from 'next/link'
import React from 'react'
import type { chat } from './types'
import DeleteChat from './DeleteChat'
import { SheetClose } from '@/components/ui/sheet'

const ChatHistoryItem = ({ chat }: {chat: Chat }) => {
    const prompts = JSON.parse(JSON.stringify(chat.prompts?.toString()!) || '[]') as chat[]
  return (
    <SheetClose asChild>
        <div className='flex flex-col gap-1.5 py-2 border-b' >
            <Link href={`/dashboard/chat/${chat?.id}`} className="text-[16px] py-1.5 text-primary">{chat?.title ||'New chat'}</Link>

            <div className="flex items-center gap-2">
                <DeleteChat chat={chat} />
            </div>
        </div>
    </SheetClose>
  )
}

export default ChatHistoryItem
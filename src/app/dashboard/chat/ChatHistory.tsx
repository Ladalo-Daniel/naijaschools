import { getUserChats } from '@/supabase/chats'
import { getProfile } from '@/supabase/user'
import React from 'react'
import ChatHistoryItem from './ChatHistoryItem'

const ChatHistory = async () => {
    const profile = await getProfile()
    const {data: chats} = await getUserChats(profile?.data?.id!)
  return (
    <div className='flex flex-col py-3 gap-3'>
        {
            chats.map(chat => (
                <ChatHistoryItem chat={chat} key={chat?.id} />
            ))
        }
    </div>
  )
}

export default ChatHistory

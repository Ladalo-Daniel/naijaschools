'use client'

import { Chats } from '@/supabase/chats'
import React, { createContext, useState } from 'react'
import ChatHistoryItem from './ChatHistoryItem'

export const ChatsContext = createContext<{
    chats: Chats,
    setChats: React.Dispatch<React.SetStateAction<Chats>>,
}>({
    chats: [],
    setChats: () => {}
})

const ChatHistory = ({ chats }: { chats: Chats }) => {
    const [chatsInState, setChats] = useState(chats)

    if (chatsInState?.length === 0) {
        return <div className='flex gap-3 py-4'>
            <p>There is nothing here yet, Enjoy the silence!</p>
        </div>
    }
  return (
    <ChatsContext.Provider value={{chats, setChats}}>
    <div className='flex flex-col py-3 gap-3 min-h-screen overflow-auto'>
        {
            chatsInState.map(chat => (
                <ChatHistoryItem chat={chat} key={chat?.id} />
                ))
            }
    </div>
    </ChatsContext.Provider>
  )
}

export default ChatHistory

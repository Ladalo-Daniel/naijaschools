import { User } from '@/supabase/user'
import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import type { chat } from './types'

const proxy_chats = [
    'What is Naijaschools all about?',
    'Care to give me an essay on "Strengths of Nigerian education"?',
    'Draw out today\'s todolist for me as a 200 Level law student?',
]

const ChatProxy = ({ profile, setPrompt, setChats }: { 
    profile: User,
    setPrompt?: React.Dispatch<React.SetStateAction<string>>,
    setChats?: React.Dispatch<React.SetStateAction<chat[]>>,
 }) => {
  return (
    <div className='flex relative p-4 max-w-5xl w-auto custom-scrollbar min-h-[90%] flex-col gap-3'>
        <div className="my-2">
            <Avatar src={'/logos/logo.png'} size='lg' />
        </div>
        <h2 className="text-[23px] py-2 text-primary">Hi {profile?.username}!, Welcome to Naijaschools AI</h2>
        <p className="py-1">Ask Naijaschools AI any question. Start chatting right away!</p>

        <div className="flex-col gap-3 hidden">
            {
                proxy_chats.map(j => (
                    <Button 
                        variant='ghost' 
                        className='w-fit min-w-[280px] text-left' 
                        endContent={<PlusIcon />}
                        key={j}
                        value={j}
                        onClick={(e) => {
                            setPrompt?.(j)
                            setChats?.(prev => ([...prev, {
                                content: j,
                                role: 'user',
                            }]))
                        }}
                    >{j}</Button>
                ))
            }
        </div>
        <div className="flex flex-col gap-3">
            <h2 className="text-warning-500 text-2xl py-1.5">Limitations</h2>

            <ul className="flex flex-col gap-3">
                <li>- Naijaschools AI is currently experimental and may produce incorrect responses. Be sure to verify important inormation.</li>
                <li>- Naijaschools AI cannot currently remember previous chats more than 5 levels up. Hang tight! The Naijaschools team is working on that.</li>
            </ul>
        </div>
  </div>
  )
}

export default ChatProxy
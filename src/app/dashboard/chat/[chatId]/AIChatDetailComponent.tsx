'use client'

import { useState } from 'react';
import { useChat } from 'ai/react';
import { User } from '@/supabase/user';
import { Chat, createUpdateChat } from '@/supabase/chats';
import { useRouter } from 'next/navigation';
import ChatInputForm from '../components/ChatInputForm';
import { chat } from '../types'
import { getLastNItems, scrollToBottom } from '../utils';
import ChatCrumb from '../components/ChatCrumb';

export default function AIChatComponent({ profile, chat }: { profile: User, chat: Chat }) {
  const [prompt, setPrompt] = useState('');
  const [fetching, setFetching] = useState(false);
  const router = useRouter()
  const [chats, setChats] = useState<chat[]>(JSON.parse(chat?.prompts?.toString()! || '[]') as chat[])
  
  const handlePromptSubmit = async (prompt: string, role: 'user' | 'assistant') => {
    setChats(prev => ([...prev, {
        content: prompt,
        role: role,
    }]))

    await createUpdateChat(JSON.stringify(chats), profile?.id, chat?.id)
    router.refresh()
}

  const { messages, handleSubmit, handleInputChange } = useChat({
    api: '/api/chat',
    onFinish: () => {
        const lastMessage = messages[messages.length - 1];
        const response = lastMessage?.role === 'assistant' ? lastMessage?.content : null
        setFetching(false)
        handlePromptSubmit(response!, 'assistant')
        scrollToBottom()
    },
  });

  const lastMessage = messages[messages.length - 1];
  const response = lastMessage?.role === 'assistant' ? lastMessage?.content : null
  const lastChats = getLastNItems(chats, 5)
  const followUpChatsAsString = JSON.stringify(lastChats)

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    handleInputChange(e);
  };

  console.log(chats)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePromptSubmit(prompt, 'user')
    setFetching(true);
    handleSubmit(e, {
        options: {
            body: {
                prompt: `"previousChats": ${followUpChatsAsString}; prompt: ${prompt}`,
                messages
            },
        },
    });
    setPrompt('')
  };

  return (
      <section className='flex relative max-w-5xl w-auto custom-scrollbar'>
        <h3 className='text-2xl my-2 text-primary hidden'>Naijaschools AI</h3>
        <div className='py-3 flex flex-col gap-3 min-h-[90%] relative max-w-5xl overflow-auto custom-scrollbar'>

            {chats.map((message, index) => (
                <ChatCrumb message={message} profile={profile} key={index} />
            ))}

            {messages.map((message, index) => (
              <ChatCrumb message={message as chat} profile={profile} key={index} />
            ))}
            
            <section className='relative max-w-5xl bg-background w-full custom-scrollbar'>
                <ChatInputForm 
                    fetching={fetching}
                    onSubmit={onSubmit}
                    onTextChange={onTextChange}
                    prompt={prompt}
                />
            </section>
         </div>
      </section>
  );
}

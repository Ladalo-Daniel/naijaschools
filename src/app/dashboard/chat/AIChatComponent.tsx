'use client'

import { useState } from 'react';
import { useChat } from 'ai/react';
import ChatMarkdown from '@/components/shared/ChatMarkdown';
import ChatInputForm from './ChatInputForm';
import { Avatar } from '@nextui-org/avatar';
import { User } from '@/supabase/user';
import type { chat } from './demo';
import { createUpdateChat } from '@/supabase/chats';
import { useRouter } from 'next/navigation';
import ChatProxy from './ChatProxy';
import { getLastNItems } from './utils';
import ChatCrumb from './ChatCrumb';

export default function AIChatComponent({ profile }: { profile: User }) {
  const [prompt, setPrompt] = useState('');
  const [fetching, setFetching] = useState(false);
  const [chats, setChats] = useState<chat[]>([])
  const [chatId, setChatId] = useState('')
  const router = useRouter()

  const handlePromptSubmit = async (prompt: string, role: 'user' | 'assistant') => {
    setChats(prev => ([...prev, {
        content: prompt,
        role: role,
    }]))

    const { data } = await createUpdateChat(JSON.stringify(chats), profile?.id, chatId || undefined)
    setChatId(data?.id!)
    router.refresh()
}

  const { messages, handleSubmit, handleInputChange } = useChat({
    api: '/api/chat',
    onFinish: () => {
        const lastMessage = messages[messages.length - 1];
        const response = lastMessage?.role === 'assistant' ? lastMessage?.content : null
        setFetching(false)
        handlePromptSubmit(response!, 'assistant')
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
  }

  return (
      <section className='flex relative max-w-5xl w-auto custom-scrollbar'>
        <h3 className='text-2xl my-2 text-primary hidden'>Naijaschools AI</h3>
        <div className='py-3 flex flex-col gap-3 min-h-[90%] relative max-w-5xl overflow-auto custom-scrollbar'>

            {
                chats.length === 0 ? (
                    <>
                        <ChatProxy profile={profile} setPrompt={setPrompt} />
                    </>
                ): (
                    <>
                        {messages.map((message, index) => (
                          <ChatCrumb message={message as chat} profile={profile} key={index} />
                        ))}
                    </>
                )
            }
            
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

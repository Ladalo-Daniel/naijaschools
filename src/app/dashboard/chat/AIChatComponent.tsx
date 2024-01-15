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
                        <div key={index} className="flex flex-col gap-4">
                            {message.role === 'user' && (
                            <div className="flex flex-row gap-2 py-4 px-2">
                                <div className="w-12 mr-2.5">
                                    <Avatar src={profile?.image_url || '/default-avatar.png'} />
                                </div>
                                <section className='flex flex-col gap-2'>
                                    <b className="pb-1.5">You</b>
                                    <ChatMarkdown content={message.content} />
                                </section>
                            </div>
                            )}
                            {message.role === 'assistant' && (
                            <div className="flex flex-row gap-2 py-4 px-2 bg-secondary dark:bg-zinc-900 rounded-md">
                                <div className="w-12 mr-2.5">
                                    <Avatar src="/logos/logo.png" />
                                </div>
                                <section className='flex flex-col gap-2 break-words overflow-auto max-w-5xl'>
                                    <b className="text-primary pb-1.5">Naijaschools AI</b>
                                    <ChatMarkdown content={message.content!} />
                                </section>
                            </div>
                            )}
                        </div>
                        ))}
                    </>
                )
            }
            
            <section className='relative max-w-5xl bg-background custom-scrollbar right-0 left-0'>
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

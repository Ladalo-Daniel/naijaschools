'use client'

import { useState } from 'react';
import { useChat } from 'ai/react';
import ChatMarkdown from '@/components/shared/ChatMarkdown';
import { Avatar } from '@nextui-org/avatar';
import { User } from '@/supabase/user';
import { Chat, createUpdateChat } from '@/supabase/chats';
import { useRouter } from 'next/navigation';
import ChatInputForm from '../ChatInputForm';
import { chat } from '../types'
import { getLastNItems } from '../utils';

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

//   if (gettingChats) return <Loading />

  return (
      <section className='flex relative max-w-5xl w-auto custom-scrollbar'>
        <h3 className='text-2xl my-2 text-primary hidden'>Naijaschools AI</h3>
        <div className='py-3 flex flex-col gap-3 min-h-[90%] relative max-w-5xl overflow-auto custom-scrollbar'>

            {chats.map((message, index) => (
            <div key={index} className="flex flex-col gap-4">
                {message.role === 'user' && (
                <div className="flex flex-row gap-2 py-2">
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
                    <div className="flex flex-row gap-2 py-2">
                    <div className="w-12 mr-2.5">
                    <Avatar src="/logos/logo.png" />
                    </div>
                    <section className='flex flex-col gap-2'>
                    <b className="text-primary pb-1.5">Naijaschools AI</b>
                    <ChatMarkdown content={message.content!} />
                    </section>
                </div>
                )}
            </div>
            ))}

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
            {/* {response && (
                <div className='flex flex-col gap-3'>
                <ChatMarkdown content={response} />
                </div>
            )} */}
            
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

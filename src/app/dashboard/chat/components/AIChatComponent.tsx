'use client'

import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import ChatInputForm from './ChatInputForm';
import { User } from '@/supabase/user';
import type { chat } from '../demo';
import { Chat, createUpdateChat } from '@/supabase/chats';
import { useRouter } from 'next/navigation';
import ChatProxy from './ChatProxy';
import { getLastNItems, scrollToBottom } from '../utils';
import ChatCrumb from './ChatCrumb';
import { toast } from 'sonner';
import NewChatButton from './NewChatButton';

export default function AIChatComponent({ profile, chat }: { profile: User, chat?: Chat }) {
  const [prompt, setPrompt] = useState('');
  const [fetching, setFetching] = useState(false);
  const [chats, setChats] = useState<chat[]>(JSON.parse(chat?.prompts?.toString()! || '[]') as chat[])

  const [chatId, setChatId] = useState(chat?.id)
  const router = useRouter()

  const handlePromptSubmit = async (prompt: string, role: 'user' | 'assistant') => {
    const { data } = await createUpdateChat(JSON.stringify(chats), profile?.id, chat?.id || chatId || undefined)
    setChatId(data?.id!)

    if (!chat?.id) {
      setChats(prev => ([...prev, {
        content: prompt,
        role: role,
      }]))
      router.refresh()
    }
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
  })
  useEffect(() => {
    if (!chat?.id)
      scrollToBottom()
  }, [messages, chat?.id])

  if (!messages || (messages as any) == '{"message": null"}') {
    setFetching(false)
    toast.error("Network error while placing request")
  }

  const lastMessage = messages[messages.length - 1];
  const response = lastMessage?.role === 'assistant' ? lastMessage?.content : null
  const lastChats = getLastNItems(chats, 5)
  const followUpChatsAsString = JSON.stringify(lastChats)


  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    handleInputChange(e);
    scrollToBottom()
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
                    { (chats.length && chat?.id) &&
                      chats.map((message, index) => (
                        <ChatCrumb message={message} profile={profile} key={index} />
                    ))
                    }

                    <div className='mb-6'>
                        {messages.map((message, index) => (
                          <ChatCrumb message={message as chat} profile={profile} key={index} />
                        ))}
                    </div>
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

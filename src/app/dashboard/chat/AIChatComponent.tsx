'use client'

import { useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import ChatMarkdown from '@/components/shared/ChatMarkdown';
import ChatInputForm from './ChatInputForm';
import { chat } from './demo';
import { Avatar } from '@nextui-org/avatar';
import { User } from '@/supabase/user';

export default function AIChatComponent({ profile }: { profile: User }) {
  const [prompt, setPrompt] = useState('');
  const [fetching, setFetching] = useState(false);
  const [chats, setChats] = useState<typeof chat>(chat)

  const { messages, handleSubmit, handleInputChange } = useChat({
    api: '/api/chat',
    onFinish: () => setFetching(false),
  });

//   useEffect(() => {
//     async function saveChat() {
//         if (!fetching && chats.length !== 0) {
//             // await 
//         }
//     }

//     saveChat()
//   }, [fetching])

  const lastMessage = messages[messages.length - 1];
  const response =
    lastMessage?.role === 'assistant' ? lastMessage?.content : null

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    handleInputChange(e);
};

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // setChats(prev => [{user_prompt: prompt, bot_response: response!}, ...prev])
    e.preventDefault();
    setFetching(true);
    handleSubmit(e, {
      options: {
        body: {
          prompt,
        },
      },
    });
  };

  return (
      <section className='flex flex-col gap-3'>
        <h3 className='text-2xl my-2 text-primary hidden'>Naijaschools AI</h3>
        <div className='py-3 flex flex-col gap-3 min-h-[90%] relative max-w-5xl overflow-auto'>
            {response && (
                <div className='flex flex-col gap-3 pb-20 mb-10'>
                    <ChatMarkdown content={response} />
                </div>
            )}

            {/* {chats.map(chat => (
                <div className='flex flex-col gap-4'>
                   { chat.user_prompt && (
                        <div className='flex flex-row gap-1 py-2'>
                            <div className='w-12'>
                                <Avatar src={profile?.image_url!}/>
                            </div>
                            <ChatMarkdown content={chat.user_prompt} />
                        </div>
                    )}
                    {response && (
                        <div className='flex flex-row gap-1 py-2'>
                            <div className='w-12'>
                                <Avatar src='/logos/logo.png'/>
                            </div>
                            <ChatMarkdown content={response} />
                        </div>
                    )}
                </div>
            ))}
             */}
            <section>
                <ChatInputForm 
                    fetching={fetching}
                    onSubmit={onSubmit}
                    onTextChange={onTextChange}
                    prompt={prompt}
                />
            </section>
         </div>
      </section>
  )
}

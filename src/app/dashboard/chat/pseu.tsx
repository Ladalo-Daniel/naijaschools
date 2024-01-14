'use client'

import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import ChatMarkdown from '@/components/shared/ChatMarkdown';
import ChatInputForm from './ChatInputForm';
import { Avatar } from '@nextui-org/avatar';
import { User } from '@/supabase/user';

export default function AIChatComponent({ profile }: { profile: User }) {
  const [prompt, setPrompt] = useState('');
  const [fetching, setFetching] = useState(false);
  const { messages, handleSubmit, handleInputChange } = useChat({
    api: '/api/chat',
    onFinish: () => setFetching(false),
  });

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    handleInputChange(e);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <section className="flex flex-col gap-3">
      <h3 className="text-2xl my-2 text-primary hidden">Naijaschools AI</h3>
      <div className="py-3 flex flex-col gap-3 min-h-[90%] relative max-w-5xl overflow-auto">

        {/* Render chat history */}
        {messages.map((message, index) => (
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
                  <ChatMarkdown content={message.content} />
                </section>
              </div>
            )}
          </div>
        ))}

        {/* Render the chat input form */}
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
  );
}

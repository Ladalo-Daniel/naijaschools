import { Textarea } from '@/components/ui/textarea'
import { Button } from '@nextui-org/button'
import { SendIcon } from 'lucide-react'
import React from 'react'

const ChatInputForm = ({
    onSubmit,
    onTextChange,
    prompt,
    fetching
}: {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    prompt: string,
    fetching: boolean
}) => {
  return (
    <form onSubmit={onSubmit} className='flex flex-row gap-1 z-30 bg-background w-full max-w-5xl items-end fixed bottom-0'>
        <div className='rounded-3xl py-5 px-2 flex items-end gap-1 max-w-5xl w-full relative'>
            <Textarea
                value={prompt}
                onChange={onTextChange}
                placeholder='Message Naijaschools AI'
                className='hover:border-none w-full focus:border-none resize col-auto  p-6  max-w-5xl overflow-hidden h-6 rounded-2xl text-[16px] border max-h-[70px]'
            />
            <Button 
                variant='flat' 
                isIconOnly color='primary' 
                isLoading={fetching} 
                type="submit" 
                disabled={fetching || !prompt}
                title='Send Naijaschools AI a message.'
                className='absolute top-[30px] right-2 bg-transparent'
            >
            <SendIcon size={24} />
            </Button>
        </div>
    </form>
  )
}

export default ChatInputForm
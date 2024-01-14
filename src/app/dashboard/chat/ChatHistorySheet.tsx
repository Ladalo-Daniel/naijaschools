'use client'

import BackButton from '@/components/shared/BackButton'
import { SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@nextui-org/button'
import { History, HistoryIcon, Sheet } from 'lucide-react'
import React from 'react'
import ChatHistory from './ChatHistory'

const ChatHistorySheet = () => {
  return (
    <div className="flex items-center justify-between">
    <BackButton />
    <Sheet>
        <SheetTrigger asChild>
            <Button isIconOnly startContent={<History />} variant='flat' className='bg-transparent' />
        </SheetTrigger>
        <SheetContent side={'right'}>
            <h2 className="text-[22px] py-1.5 flex items-center gap-1.5 font-semibold">Chat History <HistoryIcon /></h2>
            <div className="overflow-auto min-h-screen">
                <ChatHistory />
            </div>
        </SheetContent>
    </Sheet>
</div>
  )
}

export default ChatHistorySheet
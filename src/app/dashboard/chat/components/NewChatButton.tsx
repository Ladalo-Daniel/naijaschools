'use client'

import { Button } from '@nextui-org/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const NewChatButton = () => {
  
  const router = useRouter()
  const handleNewChat = () => {
    router.refresh()
    router.push('/dashboard/chat')
  }

  return (
    <Button
        startContent={
            <Plus size={14}/>
        }
        color='primary'
        variant='flat'
        size='sm'
        className={''}
        onClick={handleNewChat}
    >New Chat</Button>
  )
}

export default NewChatButton
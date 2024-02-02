'use client'

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { useDeleteChat } from '@/lib/react-query/chats'
import { Chat } from '@/supabase/chats'
import { Button } from '@nextui-org/button'
import { Trash, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { ChatsContext } from './ChatHistory'

const DeleteChat = ({ chat }: { chat: Chat }) => {
    const [open, setOpen] = useState(false)
    const { mutate: deleteChat, isPending: deletingChat } = useDeleteChat()
    const router = useRouter()
    const { chats, setChats} = useContext(ChatsContext)

    const handleDeleteChat = () => {
        deleteChat({
            chatId: chat?.id
        }, {
            onSuccess: ({status}) => {
                toast.success("Your chat has been taken off our servers successfully.")
                setOpen(false)
                const filteredChats = chats.filter(c => c.id !== chat?.id)
                setChats(prev => [...filteredChats])
                router.refresh()
                router.push('/dashboard/chat')
                return
            },
            onError: () => {
                toast.error("Sorry, we had encountered an issue taking your chat off our servers. Give it yet another shot!.")
                return
            },

        }) 
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button isIconOnly className='bg-transparent'>
                <Trash size={15} className='text-rose-600' />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:min-w-[500px] flex gap-2 flex-col">
            <div className="flex flex-col gap-4 py-4">
              <p className="text-muted-foreground">Are you really sure you want to delete this chat?!</p>
              <Button variant='flat' color='danger' isLoading={deletingChat} onClick={handleDeleteChat}>
                Continue
            </Button>
            </div>
            <DialogFooter>
            <Button startContent={<XIcon size={15} />} className='w-full' variant='flat' color='success' onClick={() => setOpen(false)}>
                Return
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
}

export default DeleteChat
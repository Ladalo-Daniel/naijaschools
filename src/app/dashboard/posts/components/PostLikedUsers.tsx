'use client'

import React, { useState } from 'react'

import { XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@nextui-org/button'
import PostLikeUserCard from './PostLikeUserCard'

const PostLikedUsers = ({ likes, likesTrigger }: { likes: string[], likesTrigger: React.JSX.Element }) => {
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            { likesTrigger }
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] min-w-300 md:min-w-[700px] p-4">
            {
                (likes.length === 0 ? <></> :
                (
                    <div className="flex flex-col gap-4 py-4 w-full min-h-[500px] overflow-auto justify-start items-start">
                        {
                            likes.map(id => (
                                <PostLikeUserCard key={id} userId={id!} />
                            ))
                        }
                    </div>
                ))
            }
            <DialogFooter className='flex gap-2 mb-2'>
            <Button startContent={<XIcon size={15} />} 
              color='danger' className='w-full bg-transparent' onClick={() => setOpen(false)}>
                Close
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default PostLikedUsers
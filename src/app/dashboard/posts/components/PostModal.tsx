'use client'

import React, { useState } from 'react'
import { Plus, XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@nextui-org/button'
import AddPost from './AddPost'
import { User } from '@/supabase/user'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useMediaQuery } from '@/hooks/use-media-query'
import { Post } from '@/supabase/posts'

const PostModal = ({ user, post, addPostButton }: { user: User, post?: Post, addPostButton?: React.JSX.Element }) => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {
              addPostButton ? (
                addPostButton
              ): (
                  post?.id && <Button startContent={<Plus size={15} />} variant='flat'className='w-fit' color='success'>
                    {post?.id ? "Reply" : "Add Post"}
                </Button>
              )
            }
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:min-w-[600px] p-4">
            <div className="flex flex-col gap-4 py-4">
              <AddPost user={user} setOpen={setOpen} post={post}/>
            </div>
            <DialogFooter>
            <Button startContent={<XIcon size={15} />} variant='flat' color='danger' className='w-full' onClick={() => setOpen(false)}>
                Close
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {
          addPostButton ? (
            addPostButton
          ): (
            <Button startContent={<Plus size={15} />} variant='flat'className='w-fit' color='success'>
                {post?.id ? "Reply" : "Add Post"}
            </Button>
          )
        }
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          <AddPost user={user} setOpen={setOpen} post={post}/>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
          <Button startContent={<XIcon size={15} />} variant='flat' color='danger' onClick={() => setOpen(false)}>
            Close
        </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default PostModal
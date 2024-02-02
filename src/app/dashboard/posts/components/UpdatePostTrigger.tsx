'use client'

import React, { useState } from 'react'
import { Edit, Plus, XIcon } from 'lucide-react'
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
    DrawerFooter,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { useMediaQuery } from '@/hooks/use-media-query'
import { Post } from '@/supabase/posts'

const UpdatePostTrigger = ({ user, post, isUpdate }: { user: User, post?: Post, isUpdate?: boolean }) => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button isIconOnly className='bg-transparent'>
                <Edit size={15} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:min-w-[600px]">
            <div className="flex flex-col gap-4 py-4">
              <AddPost user={user} setOpen={setOpen} post={post} isUpdate={isUpdate}/>
            </div>
            <DialogFooter>
            <Button startContent={<XIcon size={15} />} variant='flat' color='danger' onClick={() => setOpen(false)}>
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
        <Button isIconOnly className='bg-transparent'>
            <Edit size={15} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 p-4">
          <AddPost user={user} setOpen={setOpen} post={post} isUpdate />
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

export default UpdatePostTrigger
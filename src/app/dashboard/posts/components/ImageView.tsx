'use client'

import React, { useState } from 'react'
import { Post } from '@/supabase/posts'

import { Download, XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

const ImageView = ({ post, profile }: { post: Post, profile?: boolean }) => {
    const [open, setOpen] = useState(false)

    const handleDownloadClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault()
          const response = await fetch(post?.image!)
          const blob = await response.blob()
          const url = window.URL.createObjectURL(new Blob([blob]))
    
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', post.image!)
          document.body.appendChild(link)
          link.click()
    
          document.body.removeChild(link)
          setOpen(false)
        } catch (error) {
          console.error('Error downloading image:', error)
          toast.error('Failed to download image')
        }
      }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {profile ? (
              <Image src={post?.image!} width={500} height={500} quality={100} alt={post?.user!} className='h-36 w-36 rounded-full object-cover cursor-pointer' />
            ) : (
              <Image
                src={post.image!}
                alt={post.user + "'s post."}
                fill
                className={'md:rounded-2xl rounded-lg object-cover cursor-pointer'}
            />)}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] min-w-300 md:min-w-[700px] p-4">
            <div className="flex flex-col gap-4 py-4 w-full min-h-[500px] overflow-auto">
                <Image
                    src={post.image!}
                    alt={post.user + "'s post."}
                    fill
                    className='md:rounded-2xl rounded-lg object-contain w-full h-full'
                />
            </div>
            <DialogFooter className='flex gap-2 mb-2'>
            <Button
                as={Link}
                href={post.image!}
                download={post.image}
                startContent={<Download size={15} />}
                // variant='ghost'
                color='secondary'
                className='w-full bg-transparent'
                onClick={handleDownloadClick}
                >
                Download
            </Button>
            <Button startContent={<XIcon size={15} />} 
              // variant='ghost' 
              color='danger' className='w-full bg-transparent' onClick={() => setOpen(false)}>
                Close
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default ImageView
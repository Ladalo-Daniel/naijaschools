'use client'

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { useDeletePost } from '@/lib/react-query/posts'
import { Post } from '@/supabase/posts'
import { Button } from '@nextui-org/button'
import { Trash, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { PostContext } from '../PostProvider'

const DeletePost = ({ post }: { post: Post }) => {
    const [open, setOpen] = useState(false)
    const { mutate: deletePost, isPending: deletingPost } = useDeletePost()
    const router = useRouter()
    const { loadedPosts, setLoadedPosts } = useContext(PostContext)

    const handleDeletePost = () => {
        deletePost({
            id: post?.id
        }, {
            onSuccess: ({status}) => {
                toast.success("Your post has been taken off our servers successfully.")
                setOpen(false)
                if (status === 204) {
                  const filteredPosts = loadedPosts.filter(p => p.id !== post?.id)
                  setLoadedPosts((prev) => [...filteredPosts])
                }
                router.refresh()
                return
            },
            onError: () => {
                toast.error("Sorry, we had encountered an issue taking your post off our servers. Give it yet another shot!.")
                return
            },

        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button isIconOnly className='bg-transparent'>
                <Trash size={15} className='text-red-600' />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:min-w-[500px] flex gap-2 flex-col">
            <div className="flex flex-col gap-4 py-4">
              <p className="text-muted-foreground">Are you really sure you want to delete this post? This will also delete all it&#39;s comments!</p>
              <Button variant='flat' color='danger' isLoading={deletingPost} onClick={handleDeletePost}>
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

export default DeletePost
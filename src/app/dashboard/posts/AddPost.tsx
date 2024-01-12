'use client'

import React, { useContext } from 'react'
import CreatePostUploader from '@/components/shared/CreatePostUploader'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateUpdatePost } from '@/lib/react-query'
import { PostSchema } from '@/lib/validators/posts'
import { Post } from '@/supabase/posts'
import { User } from '@/supabase/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { SendHorizonal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { PostContext } from './PostProvider'
import { useSendReplyNotication } from '@/lib/react-query/notifications'

const AddPost = ({ user, setOpen, post, isUpdate}: { 
    user: User, 
    post?: Post, 
    isUpdate?: boolean, 
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
} ) => {

    const { mutate: updateCreatePost, isPending } = useCreateUpdatePost()
    const { mutate: sendReplyNotification} = useSendReplyNotication()
    const router = useRouter()
    const { loadedPosts, setLoadedPosts } = useContext(PostContext)

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            user: user?.username! || "",
            faculty: user?.faculty! || "",
            parent_post_id:( post?.id && !isUpdate ) ? post?.id : post?.parent_post_id || undefined,
            is_reply: ( post?.id && !isUpdate ) ? true : post?.is_reply || false,
            content: (post?.content && isUpdate) ? post?.content : "",
            institution: post?.institution?.toString() || undefined,
            location: post?.location || ""
        },
    })

    function onSubmit(values: z.infer<typeof PostSchema>) {
        try {
            updateCreatePost({...values,  image: values.image || [], postId: ( post?.id && isUpdate ) ? post?.id : undefined },
             {
                onSuccess: (info) => {
                    form.reset()
                    form.setValue("image", "")
                    toast.success("Success! Your ninja is now surfing the naijaschools galaxy.")
                    setOpen?.(false)
                    router.refresh()
                    if (info?.status === 201) {
                        if (isUpdate) {
                            const filteredPosts = loadedPosts.filter(p => p.id !== post?.id)
                            setLoadedPosts(prv => [...[info?.data as Post], ...filteredPosts])
                        return
                        }
                        setLoadedPosts(prv => [...[info?.data as Post], ...prv])
                        sendReplyNotification({post: info?.data})
                        return
                    }
                }
             });
          } catch (error) {
            console.error("Error submitting post:", error);
            toast.error("Seems like something's gone wrong!")
          }
      }

  return (
    <div className='flex flex-col max-w-2xl gap-3'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                      <Textarea placeholder='What is the question on your mind?' {...field} className='resize-y p-4 border-b hover:border-b focus:border-b' />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                      <CreatePostUploader fieldChange={field.onChange} mediaUrl={( post?.id && isUpdate) ? post?.image as string : undefined} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <div className=''>
            <Button variant={'flat'} type='submit' color='success' endContent={<SendHorizonal size={15}/>} isLoading={isPending} className='w-full'>
                {isUpdate ? "Update" : "Post"}
            </Button> 
            </div>
            </form>
        </Form>
    </div>
  )
}

export default AddPost
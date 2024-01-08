'use client'

import CreatePostUploader from '@/components/shared/CreatePostUploader'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateUpdatePost } from '@/lib/react-query'
import { PostSchema } from '@/lib/validators/posts'
import { User } from '@/supabase/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const AddPost = ({ user, setOpen }: { user: User, setOpen?: React.Dispatch<React.SetStateAction<boolean>>} ) => {

    const { mutate: updateCreatePost, isPending } = useCreateUpdatePost()
    const router = useRouter()

    const form = useForm<z.infer<typeof PostSchema>>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            image: "",
            user: user?.username! || "",
            faculty: user?.faculty! || ""
        },
    })

    function onSubmit(values: z.infer<typeof PostSchema>) {
        try {
            updateCreatePost({...values,  image: values.image || [],},
             {
                onSuccess: () => {
                    form.reset()
                    form.setValue("image", "")
                    toast.success("Success! Your ninja is now surfing the naijaschools galaxy")
                    setOpen?.(false)
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
                      <CreatePostUploader fieldChange={field.onChange}  />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <div className='mx-auto'>
            <Button variant={'flat'} type='submit' color='success' endContent={<SendHorizonal size={15}/>} isLoading={isPending} className='max-[480px]:w-full'>
                Post
            </Button> 
            </div>
            </form>
        </Form>
    </div>
  )
}

export default AddPost
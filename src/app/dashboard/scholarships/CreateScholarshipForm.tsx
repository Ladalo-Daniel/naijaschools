"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import PostFileUploader from "@/components/shared/PostFileUploader"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Session } from '@supabase/supabase-js'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Scholarship } from '@/supabase/scholarships'
import { ScholarshipSchema } from '@/lib/validators/scholarship'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCreateUpdateScholarship } from '@/lib/react-query/scholarships'
import { toast } from 'sonner'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

function CreateScholarshipForm({session, scholarship}: {scholarship?: Scholarship ,session?: Pick<Session, "user">}) {
    const [open, setOpen] = React.useState(false);

    const { mutate: updateCreateScholarship, isPending } = useCreateUpdateScholarship()
    const router = useRouter()

    const form = useForm<z.infer<typeof ScholarshipSchema>>({
        resolver: zodResolver(ScholarshipSchema),
        defaultValues: {
            author: session?.user.id!,
            content: scholarship?.content ? scholarship.content : "",
            title: scholarship?.title ? scholarship.title : "",
            tags: scholarship?.tags ? scholarship.tags : "",
            image: scholarship?.image_url ? scholarship.image_url : "", 
        },
    })



    function onSubmit(values: z.infer<typeof ScholarshipSchema>) {
        try {
             updateCreateScholarship({...values,  image: values.image || [], scholarshipId: scholarship?.id!,},
             {
                onSuccess: () => {
                    form.reset()
                    toast.success("Success!")
                    setOpen(false)
                    router.refresh()
                }
             });
          } catch (error) {
            console.error("Error submitting article:", error);
          }
      }


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Scholarship</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] max-sm:w-full overflow-auto">
        <SheetHeader>
          <SheetTitle>Add Scholarship</SheetTitle>
        </SheetHeader>
        <div className="w-full max-w-3xl">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Add image</FormLabel>
                    <FormControl>
                        <PostFileUploader fieldChange={field?.onChange} mediaUrl={scholarship?.image_url as string} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Scholarship Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Title..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                        <Textarea placeholder="content..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Input placeholder="Tags separated by commas..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button variant="outline" color="primary" type="submit">{isPending ? "Submiting" : "Submit"}</Button>
            </form>
         </Form>
       </div>
      </SheetContent>
    </Sheet>
  )
}

export default CreateScholarshipForm
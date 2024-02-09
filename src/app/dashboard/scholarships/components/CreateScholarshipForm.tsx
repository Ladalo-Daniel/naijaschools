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
import { Edit } from 'lucide-react'

function CreateScholarshipForm({session, scholarship, isUpdate, isEdit}: {scholarship?: Scholarship, isEdit?:boolean , isUpdate?:boolean ,session?: Pick<Session, "user">}) {
    const [open, setOpen] = React.useState(false);

    const { mutateAsync: updateCreateScholarship, isPending } = useCreateUpdateScholarship()
    const router = useRouter()

    const form = useForm<z.infer<typeof ScholarshipSchema>>({
        resolver: zodResolver(ScholarshipSchema),
        defaultValues: { 
            author: session?.user.id! || scholarship?.author!,
            content: scholarship?.content ? scholarship.content : "",
            title: scholarship?.title ? scholarship.title : "",
            tags: scholarship?.tags  ? scholarship.tags : "",
            image: scholarship?.image_url ? scholarship.image_url : "", 
        },
    })



    function onSubmit(values: z.infer<typeof ScholarshipSchema>) {
        try {
             updateCreateScholarship({...values,  image: values.image || [], scholarshipId: scholarship?.id!  },
             {
                onSuccess: () => {
                    form.reset()
                    isEdit  ? router.refresh() : router.refresh()
                    toast.success(`${isUpdate ? "Edited successfully" : "Created successfully"}`)
                    setOpen(false)
                }
             });
          } catch (error) {
            console.error("Error submitting article:", error);
          }
      }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{isUpdate ? <Edit size={16} className=' text-green-600' /> : "Create"}</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] max-sm:w-full overflow-auto">
        <SheetHeader>
          <SheetTitle>{isUpdate ? "Update Scholarship" : "Add Scholarship"}</SheetTitle>
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
                        <PostFileUploader fieldChange={field?.onChange} mediaUrl={scholarship?.image_url as string } />
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
                {
                    isUpdate ?
                    (
                     <Button variant="outline" color="primary" type="submit">{isPending ? "Editing..." : "Edit"}</Button>
                     
                     ) :
                     (
                    <Button variant="outline" color="primary" type="submit">{isPending ? "Creating..." : "Create"}</Button>
                     )
                }
            </form>
         </Form>
       </div>
      </SheetContent>
    </Sheet>
  )
}

export default CreateScholarshipForm
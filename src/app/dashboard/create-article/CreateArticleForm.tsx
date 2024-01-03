"use client"

import PostFileUploader from "@/components/shared/PostFileUploader"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateUpdateArticle } from "@/lib/react-query"
import { ArticleSchema } from "@/lib/validators/articles"
import { Article } from "@/supabase/articles"
import { User } from "@/supabase/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const CreateArticleForm = ({ article, session }: {article?: Article, session?: Pick<Session, 'user'> }) => {
    
    const { mutate: updateCreateArticle, isPending } = useCreateUpdateArticle()
    const router = useRouter()

    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            author: session?.user.id!,
            content: article?.content ? article.content : "",
            title: article?.title ? article.title : "",
            tags: article?.tags ? article.tags : "",
            minutes_read: article?.minutes_read ? article.minutes_read : "",
            image: article?.image_url ? article.image_url : "", 
        },
    })
    

      function onSubmit(values: z.infer<typeof ArticleSchema>) {
        try {
             updateCreateArticle({...values,  image: values.image || [], articleId: article?.id!,},
             {
                onSuccess: () => {
                    form.reset()
                    toast.success("Success!")
                    return article?.id ? router.push('/articles/' + article?.id) : router.push('/articles')
                }
             });
          } catch (error) {
            console.error("Error submitting article:", error);
          }
      }

  return (
    <div className="w-full max-w-3xl">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Add article image</FormLabel>
                    <FormControl>
                        <PostFileUploader fieldChange={field?.onChange} mediaUrl={article?.image_url as string} />
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
                    <FormLabel>Article Title</FormLabel>
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
                        <Textarea placeholder="content..." className="min-h-[250px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="minutes_read"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Minutes read</FormLabel>
                    <FormControl>
                        <Input placeholder="Minutes read..." {...field} />
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
                <Button variant="flat" color="primary" type="submit" isLoading={isPending}>Submit</Button>
            </form>
        </Form>
    </div>
  )
}

export default CreateArticleForm
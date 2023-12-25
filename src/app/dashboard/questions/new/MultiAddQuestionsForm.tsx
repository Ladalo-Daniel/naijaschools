import { QuestionSchema } from '@/lib/validators/questions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const MultiAddQuestionsForm = ({ course_id }: { course_id: number }) => {

    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
          course: course_id,
        },
      })
     
      function onSubmit(values: z.infer<typeof QuestionSchema>) {
        console.log(values)
      }
      
    return (
        <section className='flex flex-col gap-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                            <Textarea placeholder="question ..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option1"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 1</FormLabel>
                        <FormControl>
                            <Input placeholder="Option 1" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 2</FormLabel>
                        <FormControl>
                            <Input placeholder="Option 2" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option3"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 3</FormLabel>
                        <FormControl>
                            <Input placeholder="Option 3" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option4"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Option 4</FormLabel>
                        <FormControl>
                            <Input placeholder="Option 4" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Explanation (optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="Explanation" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        </section>
      )
}

export default MultiAddQuestionsForm
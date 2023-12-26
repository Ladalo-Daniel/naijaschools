import { QuestionSchema } from '@/lib/validators/questions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { useCreateQuestion } from '@/lib/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Question } from '@/supabase/questions'

const MultiAddQuestionsForm = ({ course_id, question }: { course_id: number, question?: Question }) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof QuestionSchema>>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
          course_id: question?.course_id || course_id,
          question: question?.question || "",
          option1:  question?.option1 || "",
          option2:  question?.option2 || "",
          option3:  question?.option3 || "",
          option4:  question?.option4 || "",
          explanation: question?.explanation || "",
        },
      }) 

      const { mutate: createQuestion, isPending } = useCreateQuestion()

      const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null>>({
        option1: null,
        option2: null,
        option3: null,
        option4: null,
    });

    const handleSwitchToggle = (fieldName: string, index: string) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [fieldName]: prevSelectedOptions[fieldName] === index ? null : index,
        }));
    };

    const firstNonNullOption = Object.keys(selectedOptions)
    .map(key => selectedOptions[key])
    .find(value => value !== null);

    function onSubmit(values: z.infer<typeof QuestionSchema>) {
        if (!firstNonNullOption) {
            toast.warning("You have not selected any option as an answer yet!")
            return 
        }
        createQuestion({...values, course_id: course_id, answer: firstNonNullOption} as any, {
            onSettled: () => {
                form.reset()
                setSelectedOptions({
                    option1: null,
                    option2: null,
                    option3: null,
                    option4: null,
                })
            }
        })
    }

    form.watch()

      if (!course_id) return <div className='flex flex-row border-warning-600 bg-warning-50 items-center justify-between rounded-lg border p-3 py-5 w-fit shadow-sm'>
        You have not selected a course yet. Select a course from the options above.
      </div>
      
    return (
        <section className='flex flex-col gap-3 overflow-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto">
                    <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                            <FormItem>
                            <FormLabel className='text-primary'>Question</FormLabel>
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
                        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <FormItem>
                            <FormLabel>Option 1</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Option 1 ..." {...field} className='min-w-[250px]' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            <Switch
                              checked={selectedOptions.option1 === 'option1'}
                              onCheckedChange={() => handleSwitchToggle('option1', 'option1')}
                              disabled={selectedOptions.option1 !== null && selectedOptions.option1 !== 'option1'}
                              aria-readonly
                            />
                        </div>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option2"
                    render={({ field }) => (
                        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <FormItem>
                            <FormLabel>Option 2</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Option 2 ..." {...field} className='min-w-[250px]' />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            <Switch
                                checked={selectedOptions.option2 === 'option2'}
                                onCheckedChange={() => handleSwitchToggle('option2', 'option2')}
                                disabled={selectedOptions.option2 !== null && selectedOptions.option2 !== 'option2'}
                                aria-readonly
                            />
                        </div>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option3"
                    render={({ field }) => (
                        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <FormItem>
                            <FormLabel>Option 3</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Option 3 ..." {...field} className='min-w-[250px]'/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            <Switch
                              checked={selectedOptions.option3 === 'option3'}
                              onCheckedChange={() => handleSwitchToggle('option3', 'option3')}
                              disabled={selectedOptions.option3 !== null && selectedOptions.option3 !== 'option3'}
                              aria-readonly
                            />
                        </div>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="option4"
                    render={({ field }) => (
                        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <FormItem>
                            <FormLabel>Option 4</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Option 4 ..." {...field} className='min-w-[250px]'/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            <Switch
                              checked={selectedOptions.option4 === 'option4'}
                              onCheckedChange={() => handleSwitchToggle('option4', 'option4')}
                              disabled={selectedOptions.option4 !== null && selectedOptions.option4 !== 'option4'}
                              aria-readonly
                            />
                        </div>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Explanation (optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Explanation" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex gap-3 flex-wrap'>
                        <Button type="submit">{isPending ? "Saving...": "Save"} {isPending && <Loader2 className='animate-spin' size={15}/>}</Button>
                        <Button variant={'outline'} type="submit">{isPending ? "Saving...": "Save and Add Another"} {isPending && <Loader2 className='animate-spin' size={15} />}</Button>
                        <Button variant={'secondary'}
                            onClick={() => {
                                (!isPending || !firstNonNullOption) && router.push('/dashboard/questions')
                            }} 
                            type="submit">{isPending ? "Saving...": "Save and exit"} {isPending && <Loader2 className='animate-spin ml-1' size={15} />}</Button>
                        <Button variant={'destructive'} type="button" onClick={() => {
                                form.reset()
                                setSelectedOptions({
                                    option1: null,
                                    option2: null,
                                    option3: null,
                                    option4: null,
                                })
                            }}>Reset</Button>
                    </div>
                </form>
            </Form>
        </section>
      )
}

export default MultiAddQuestionsForm
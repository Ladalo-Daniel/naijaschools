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
import { useEffect, useState } from 'react'
import { useCreateQuestion } from '@/lib/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Question } from '@/supabase/questions'

const MultiAddQuestionsForm = ({ course_id, question }: { course_id: number, question?: Question }) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const institution = searchParams.get('institution')

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

      const { mutate: createQuestion, isPending, isError } = useCreateQuestion()

      const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null | undefined>>({
        option1: question?.answer === question?.option1 ? question?.answer : null,
        option2: question?.answer === question?.option2 ? question?.answer : null,
        option3: question?.answer === question?.option3 ? question?.answer : null,
        option4: question?.answer === question?.option4 ? question?.answer : null,
      });      

    const nonNullValuesCount = Object.values(selectedOptions).filter(value => value !== null).length;
    
    const handleSwitchToggle = (fieldName: string, value: string) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [fieldName]: prevSelectedOptions[fieldName] === value ? null : value,
        }));
    };

    const firstNonNullOption = Object.keys(selectedOptions)
    .map(key => selectedOptions[key])
    .find(value => value !== null);
    
    type buttonPendingType = 'default' | 'basic' | 'exit' | 'reset'

    const [buttonType, setButtonType] = useState<buttonPendingType>('default')

    const handleButtonType = (buttonType: buttonPendingType) => {
        if (buttonType === 'default') {
            setButtonType('default')
        } 
        
        if (buttonType === 'basic') {
            setButtonType('basic');
        }
        
        if (buttonType === 'exit') {
            setButtonType('exit');
            if (!firstNonNullOption) return
            if (nonNullValuesCount > 1) return

            !(isPending && isError && navigator.onLine) ? router.push('/dashboard/questions'): null
        }
        
        if (buttonType === 'reset') {
            setButtonType('reset')
            form.reset()
            setSelectedOptions({
                option1: null,
                option2: null,
                option3: null,
                option4: null,
            })
            toast.success("All wiped now...! The fields are now clear as you'd expect.")
        }
    }
    
    function onSubmit(values: z.infer<typeof QuestionSchema>) {
        if (!firstNonNullOption) {
            toast.warning("You have not selected any option as an answer yet!")
            return 
        }

        if (nonNullValuesCount > 1) {
            toast.warning(`You have selected more than one option as answer! You selected ${nonNullValuesCount} options!`)
            return 
        }

        createQuestion({...values, course_id: course_id, answer: firstNonNullOption, id: question?.id } as any, {
            onSuccess: () => {
                question?.id ? toast.success("Question updated successfully."): toast.success("Question created successfully.")
                return router.refresh()
            },
            onSettled: () => {
                form.reset()
                buttonType === 'default' ? null : setSelectedOptions({
                    option1: null,
                    option2: null,
                    option3: null,
                    option4: null,
                })
            }
        })
    }

    form.watch()

      useEffect(() => {
        if (!course_id) {
            toast.info("You have not selected a course yet!", {
                description: "Select a course from the options above to continue with adding questions. Don't worry, it won't take time.",
                action: {
                    label: "Dismiss",
                    onClick: () => {},
                },
            })
          }
      }, [institution])

      useEffect(() => {
        if (!navigator.onLine) {
            toast.warning("You are currently offline and your changes may not be Saved!")
          }
      }, [navigator.onLine])

      if (!course_id) return
      
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
                              checked={(selectedOptions.option1 === field.value)}
                              defaultChecked={field.value === question?.answer}
                              onCheckedChange={() => handleSwitchToggle('option1', field.value)}
                              disabled={!!selectedOptions.option1 &&
                                selectedOptions.option1 !== field.value}
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
                                checked={(selectedOptions.option2 === field.value)}
                                onCheckedChange={() => handleSwitchToggle('option2', field.value)}
                                defaultChecked={field.value === question?.answer}
                                disabled={!!selectedOptions.option2 &&
                                    selectedOptions.option2 !== field.value}
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
                              checked={(selectedOptions.option3 === field.value)}
                              onCheckedChange={() => handleSwitchToggle('option3', field.value)}
                              defaultChecked={field.value === question?.answer}
                              disabled={!!selectedOptions.option3 &&
                                selectedOptions.option3 !== field.value}
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
                              checked={(selectedOptions.option4 === field.value)}
                              defaultChecked={field.value === question?.answer}
                              onCheckedChange={() => handleSwitchToggle('option4', field.value)}
                              disabled={!!selectedOptions.option4 &&
                                selectedOptions.option4 !== field.value}
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
                    {!question?.id && <div className='flex gap-3 flex-wrap'>
                        <Button 
                            type="submit"
                            onClick={() => handleButtonType('default')}
                            >{(isPending && buttonType === 'default') ? "Saving...": "Save"} {(isPending && buttonType === 'default') && <Loader2 className='animate-spin' size={15}/>}</Button>
                        <Button 
                            variant={'outline'} 
                            type="submit"
                            onClick={() => handleButtonType('basic')}
                            >{(isPending && buttonType === 'basic') ? "Saving...": "Save and Add Another"} {(isPending && buttonType === 'basic') && <Loader2 className='animate-spin' size={15} />}</Button>
                        <Button variant={'secondary'}
                            onClick={() => handleButtonType('exit')} 
                            type="submit">{(isPending && buttonType === 'exit') ? "Saving...": "Save and exit"} {(isPending && buttonType === 'exit') && <Loader2 className='animate-spin ml-1' size={15} />}</Button>
                        <Button
                            variant={'destructive'} 
                            type="button" 
                            onClick={() => handleButtonType('reset')}>Reset</Button>
                    </div>}
                    {question?.id && <div className='flex gap-3 flex-wrap'>
                        <Button 
                            type="submit"
                            onClick={() => handleButtonType('default')}
                            >{(isPending && buttonType === 'default') ? "Updating...": "Update"} {(isPending && buttonType === 'default') && <Loader2 className='animate-spin' size={15}/>}</Button>
                        <Button variant={'secondary'}
                            onClick={() => handleButtonType('exit')} 
                            type="submit">{(isPending && buttonType === 'exit') ? "Updating...": "Update and quit"} {(isPending && buttonType === 'exit') && <Loader2 className='animate-spin ml-1' size={15} />}</Button>
                    </div>}
                </form>
            </Form>
        </section>
      )
}

export default MultiAddQuestionsForm
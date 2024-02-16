'use client'

import React from 'react'
import { LessonSchema } from '@/lib/validators/lessons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useCreateUpdateLesson } from '@/lib/react-query/lessons'
import { Lesson } from '@/supabase/lessons'
import { toast } from 'sonner'
import { Button } from '@nextui-org/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { faculties } from '@/lib/faculties'
import { ComboboxForm } from '@/app/dashboard/components/Combobox'
import { useGetInstitutions } from '@/lib/react-query'
import { InstitutionList } from '@/supabase/institutions'
import MiniLoader from '../../../../../components/MiniLoader'
import RichTextEditor from '@/components/shared/RichTextEditor'

interface CreateUpdateLessonProps {
    lesson?: Lesson,
    institutions: InstitutionList
}

const CreateUpdateLesson: React.FC<CreateUpdateLessonProps> = ({lesson, institutions}) => {
  const { mutateAsync: createUpdateLesson, isPending } = useCreateUpdateLesson()
  
  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema),
    defaultValues: {
        title: lesson?.title ? lesson?.title : '',
        content: lesson?.content || '',
        summary: lesson?.summary || '',
        course: '23',
        faculty: lesson?.faculty || '',
        image_url: lesson?.image_url || '',
        institution: lesson?.institution?.toString() || '',
    },
  })
  
  async function onSubmit(values: z.infer<typeof LessonSchema>) {
    createUpdateLesson({...values, lessonId: lesson?.id!, image: values?.image_url}, {
        onSuccess: () => {
            toast.success("Lesson added successfully")
            form.reset()
        },
        onError: () => {
            toast.error("Failed to add lesson.")
        }
      })
  }

  form.watch()

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <ComboboxForm institutions={institutions as InstitutionList} form={form} />

        <FormField
          control={form.control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a valid faculty." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    faculties.map(f => (
                      <SelectItem value={f} key={f}>{f}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
                <Input placeholder="Topic..." {...field} />
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
                <Textarea placeholder="content..." className="resize-y min-h-unit-5" {...field} />
            </FormControl> 
            <FormMessage />
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
                <Textarea placeholder="summary" className="resize-y min-h-unit-5" {...field} />
              {/* <RichTextEditor onChange={field.onChange} value={form.getValues("summary") || ''} /> */}
            </FormControl> 
            <FormMessage />
            </FormItem>
        )}
        />
        <Button isLoading={isPending} className="" type="submit" variant="bordered" color="primary">{isPending ? "Update" : "Submit"}</Button>
      </form>
    </Form>
    </div>
  )
}

export default CreateUpdateLesson
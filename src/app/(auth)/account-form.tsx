'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import React from 'react'
import { Session } from '@supabase/auth-helpers-nextjs'

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
import { Textarea } from "@/components/ui/textarea"
import { ComboboxForm } from "../dashboard/components/Combobox"
import { institutions } from "@/lib/constants"
import { userFormSchema } from "@/lib/validators/user"
import DatePicker from "../dashboard/components/date-picker"
import { useUpdateProfile } from "@/lib/react-query"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { SheetClose } from "@/components/ui/sheet"
import { Database } from "../../types/supabase"
import FileUploader from "@/components/shared/FileUploader"
import { toast } from "sonner"

export default function AccountForm({ session, isUpdate, profile, isDashboard }: { 
  session: Session | null, 
  isUpdate?: boolean, 
  profile: Database['public']['Tables']['users']['Update'], 
  isDashboard?: boolean 
}) {

  const user = session?.user
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const router = useRouter()

  
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: profile?.username || "",
      dob: profile?.dob || "",
      institution: profile?.institution || "",
      bio: profile?.bio || "",
      email: user?.email,
      avatar: profile?.image_url || "",
    },
  })

  
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    updateProfile({...values, userId: user?.id || "", avatar: values.avatar, onboarded: true}, {
      onSuccess: () => {
        isDashboard ? router.refresh() : router.push("/dashboard")
      },
      onSettled: () => {
        form.reset()
      }
    })
  }
  isUpdating ? toast.loading("Updating profile...") : null

  form.watch()

  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="avatar"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
              <FileUploader fieldChange={field?.onChange} isProfile mediaUrl={profile?.image_url as string} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ComboboxForm institutions={institutions} form={form} />
        <DatePicker form={form}/>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com..." disabled={true} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="bio" className="resize-y min-h-unit-5" {...field} />
              </FormControl>
              <FormDescription>
                Tell us more about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button isLoading={isUpdating} className="" type="submit" variant="bordered" color="primary">{isUpdate ? "Update" : "Submit"}</Button>
      </form>
    </Form>
  )
}


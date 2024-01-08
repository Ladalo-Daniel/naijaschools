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
import { userFormSchema } from "@/lib/validators/user"
import DatePicker from "../dashboard/components/date-picker"
import { useUpdateProfile } from "@/lib/react-query"
import { Button } from "@nextui-org/button"
import { useRouter } from "next/navigation"
import { SheetClose } from "@/components/ui/sheet"
import FileUploader from "@/components/shared/FileUploader"
import { toast } from "sonner"
import { User } from "@/supabase/user"
import { InstitutionList } from "@/supabase/institutions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { faculties } from "@/lib/faculties"

export default function AccountForm({ session, isUpdate, profile, isDashboard, institutions }: { 
  session: Session | null, 
  isUpdate?: boolean, 
  profile: User, 
  isDashboard?: boolean,
  institutions:  InstitutionList,
}) {

  const user = session?.user
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: profile?.username || "",
      dob: profile?.dob || "",
      institution: parseInt(profile?.institution!),
      bio: profile?.bio || "",
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: user?.email,
      avatar: profile?.image_url || "",
      faculty: profile?.faculty ||""
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
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="first name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="last name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ComboboxForm institutions={institutions as any} form={form} />
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
              <FormDescription>
                <Link href="/faculty/l-m">Learn more.</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {!isDashboard && <Button isLoading={isUpdating} className="" disabled={!form.formState.isValid} type="submit" variant="bordered" color="primary">{isUpdate ? "Update" : "Submit"}</Button>}
          {
          isDashboard && 
          <SheetClose asChild={form.formState.isValid}>
            <Button isLoading={isUpdating} className="" disabled={!form.formState.isValid} type="submit" variant="bordered" color="primary">{isUpdate ? "Update" : "Submit"}</Button>
          </SheetClose>
          }
      </form>
    </Form>
  )
}


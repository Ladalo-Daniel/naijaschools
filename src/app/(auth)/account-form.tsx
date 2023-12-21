'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// import { Button } from "@/components/ui/button"
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
import { useGetProfile, useUpdateProfile } from "@/lib/react-query"
import { Button } from "@nextui-org/button"

export default function AccountForm({ session, isUpdate }: { session: Session | null, isUpdate?: boolean }) {

  const user = session?.user
  const supabase = createClientComponentClient<Database>()

  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const { data: profile, isPending } = useGetProfile(user?.id || "")
  console.log(profile)

  
  
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: profile?.data?.username || "",
      dob: profile?.data?.dob || "",
      institution: profile?.data?.institution || "",
      bio: profile?.data?.bio || "",
      email: user?.email,
    },
  })

  if (isPending) return <p>lo..........</p>
  
  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    updateProfile({...values, userId: user?.id || "", onboarded: true})
    form.reset()
  }

  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Textarea placeholder="bio" {...field} />
              </FormControl>
              <FormDescription>
                Tell us more about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isPending || isUpdating} className="" type="submit" variant="ghost" color="success">{isUpdate ? "Update" : "Submit"}</Button>
      </form>
    </Form>
  )
}
















// export default function AccountForm({ session }: { session: Session | null }) {
//   const supabase = createClientComponentClient<Database>()
//   const [loading, setLoading] = useState(true)
//   const [fullname, setFullname] = useState<string | null>(null)
//   const [username, setUsername] = useState<string | null>(null)
//   const [website, setWebsite] = useState<string | null>(null)
//   const [avatar_url, setAvatarUrl] = useState<string | null>(null)
//   const user = session?.user

//   const getProfile = useCallback(async () => {
//     try {
//       setLoading(true)

//       const { data, error, status } = await supabase
//         .from('profiles')
//         .select(`full_name, username, website, avatar_url`)
//         .eq('id', user?.id)
//         .single()

//       if (error && status !== 406) {
//         throw error
//       }

//       if (data) {
//         setFullname(data.full_name)
//         setUsername(data.username)
//         setWebsite(data.website)
//         setAvatarUrl(data.avatar_url)
//       }
//     } catch (error) {
//       alert('Error loading user data!')
//     } finally {
//       setLoading(false)
//     }
//   }, [user, supabase])

//   useEffect(() => {
//     getProfile()
//   }, [user, getProfile])

//   async function updateProfile({
//     username,
//     website,
//     avatar_url,
//   }: {
//     username: string | null
//     fullname: string | null
//     website: string | null
//     avatar_url: string | null
//   }) {
//     try {
//       setLoading(true)

//       const { error } = await supabase.from('profiles').upsert({
//         id: user?.id as string,
//         full_name: fullname,
//         username,
//         website,
//         avatar_url,
//         updated_at: new Date().toISOString(),
//       })
//       if (error) throw error
//       alert('Profile updated!')
//     } catch (error) {
//       alert('Error updating the data!')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="form-widget">
//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" type="text" value={session?.user.email} disabled />
//       </div>
//       <div>
//         <label htmlFor="fullName">Full Name</label>
//         <input
//           id="fullName"
//           type="text"
//           value={fullname || ''}
//           onChange={(e) => setFullname(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           type="text"
//           value={username || ''}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="website">Website</label>
//         <input
//           id="website"
//           type="url"
//           value={website || ''}
//           onChange={(e) => setWebsite(e.target.value)}
//         />
//       </div>

//       <div>
//         <button
//           className="button primary block"
//           onClick={() => updateProfile({ fullname, username, website, avatar_url })}
//           disabled={loading}
//         >
//           {loading ? 'Loading ...' : 'Update'}
//         </button>
//       </div>

//       <div>
//         <form action="/auth/signout" method="post">
//           <button className="button block" type="submit">
//             Sign out
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
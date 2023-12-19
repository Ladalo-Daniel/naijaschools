'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function AccountForm({ session }: { session: Session | null }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                <Input placeholder="shadcn" {...field} />
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
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textarea"
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
        <Button type="submit">Submit</Button>
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
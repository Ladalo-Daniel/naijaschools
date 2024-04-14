'use client'

import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { buttonVariants } from '@/components/ui/button'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa,
        extend: false,

        className: {
          button: "w-full bg-secondary text-foreground hover:bg-primary my-4 flex items-center gap-2 justify-center rounded-md transition-all py-2.5 space-y-4 mt-2 mb-2 block text-accent shadow border-none",
          label: "block space-y-4 text-muted-foreground mb-1 font-bold text-xl",
          input: "p-2 py-2.5 ring rounded-md shadow focus:ring-primary mt-2 transition-all mb-2 w-full",
          container: "flex flex-col gap-4 bg-background",
          message: "p-4 rounded-md bg-green-100 border border-green-500 shadow text-green-700 mt-2 w-full",
          anchor: buttonVariants({variant: "link"})
        }
      }}
      theme="dark"
      showLinks={false}
      redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL!}/auth/callback`}
      
      providers={['google']}
      queryParams={{
        access_type: 'offline',
        prompt: 'consent',
        // hd: 'naijaschools.vercel.app',
      }}
    />
  )
}
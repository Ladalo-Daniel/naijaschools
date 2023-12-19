'use client'

import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa,
        extend: false,

        className: {
          button: "w-full bg-primary rounded-md transition-all p-2 space-y-4 mt-2 mb-2 block text-accent shadow border-none",
          label: "block space-y-2 text-muted-foreground mb-1 font-bold",
          input: "p-2 ring rounded-md shadow focus:ring-primary mt-2 transition-all mb-2 w-full",
          container: "flex flex-col gap-4",
          message: "p-4 rounded-md bg-blue-100 border shadow text-primary-600 mt-2 w-full",
        }
      }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}
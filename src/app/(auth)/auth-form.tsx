'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from './database.types'
import { Button } from '@nextui-org/button'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa,
        extend: false,

        className: {
          button: "w-full bg-primary rounded-md p-2 space-y-4 mt-2 mb-2 block text-accent shadow border-none",
          label: "block space-y-2 text-muted-foreground mb-2",
          input: "p-2 ring rounded-md shadow focus:ring-primary mt-2 mb-2 w-full",
          container: "flex flex-col gap-4",
          message: "p-4 rounded-md bg-green-100 border shadow text-primary",

        }
      }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}
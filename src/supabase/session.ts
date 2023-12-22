"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const supabase = createServerComponentClient({ cookies })

export const getUserSession = async () => {
    const {
        data: { session },
      } = await supabase.auth.getSession()

    return session
}

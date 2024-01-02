// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../types/supabase"
import { createClient } from "@supabase/supabase-js"

// export const supabaseClient = createClientComponentClient<Database>()
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabaseClient = createClient<Database>(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
    {
        global: { fetch: fetch.bind(globalThis) }
    }
)

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../types/supabase"

export const supabaseClient = createClientComponentClient<Database>()
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

// export const supabase_ = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

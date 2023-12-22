import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
<<<<<<< HEAD
import { getUserSession } from "./session"
=======
import { Database } from "../types/supabase"
>>>>>>> cdaa9bffcd07c1652b13d7747e3a8ebede200163

export const supabaseClient = createClientComponentClient<Database>()
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

// export const supabase_ = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

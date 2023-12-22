import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getUserSession } from "./session"

export const supabaseClient = createClientComponentClient()
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export async function getUser() {
  const {data: session} = await supabaseClient.auth.getSession()
  if (!session.session) return null
  
  const {data, error} = await supabaseClient.auth.getUser()
  
  if (error)
    throw new Error(error.message)

  return data?.user
}

export const getProfile = async () => {
  const session = await getUserSession()
    try {

      const { data, error, status } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      return { data, error }
    } catch (error) {
    }
}

export async function updateProfile({
    userId,
    ...rest
  }: {
    userId: string,
    avatar?: File
  }) {
    try {
      
      const { error } = await supabaseClient.from('users').upsert({
        id: userId,
        updated_at: new Date().toISOString(),
        onboarded: true,
        community_id: `nsch_${userId.slice(0, 7)}` ,
        ...rest,
      })

      if (error) throw error

    } catch (error) {
      // lalal
    } 
  }












        
            // const data = await getUserSession()
        
            // let fileName = `avatar-${data?.user?.id}-${Math.random()}`
          
            // const {error: storageError} = await supabaseClient.storage
            //   .from('avatars')
            //   .upload(fileName, avatar)
          
            // if (storageError) throw new Error(storageError.message)
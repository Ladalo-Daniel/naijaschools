import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { getUserSession } from "./session"

export const supabaseClient = createClientComponentClient()

export async function getUser() {
  const {data: session} = await supabaseClient.auth.getSession()
  if (!session.session) return null
  
  const {data, error} = await supabaseClient.auth.getUser()
  
  if (error)
    throw new Error(error.message)

  return data?.user
}

export const getProfile = async ({ userId }: { userId: string }) => {
  const session = await getUserSession()
    try {

      const { data, error, status } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single()

        // console.log(data)

      if (error && status !== 406) {
        throw error
      }

      return { data, error }
    } catch (error) {
      // return { data: null, error }
    }
}

export async function updateProfile({
    userId,
    ...rest
  }: {
    userId: string
  }) {
    try {
      const { error } = await supabaseClient.from('users').upsert({
        id: userId,
        ...rest
        // updated_at: new Date().toISOString(),
      })
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      // alert('Error updating the data!')
    } 
  }
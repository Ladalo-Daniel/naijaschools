import { revalidatePath } from "next/cache"
import { supabaseClient, supabaseUrl } from "."
import { getUserSession } from "./session"
import { toast } from "sonner"

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
        .eq('id', session?.user.id ||'')
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
    avatar,
    ...rest
    }: {
    userId: string,
    avatar?: File[] | string
    }) {
    try {
    // @ts-ignore
    const hasImagePath = avatar?.startsWith?.(supabaseUrl)
    // @ts-ignore
    const imageName = `${Math.random()}-${avatar[0]?.name}`.replaceAll('/', '')
    const imagePath = hasImagePath ? avatar : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`
  

    const { error, data } = await supabaseClient.from('users').upsert({
        id: userId,
        updated_at: new Date().toISOString(),
        onboarded: true,
        community_id: `nsch_${userId.slice(0, 7)}` ,
        image_url: imagePath as string,
        ...rest,
    })

    if (error) throw error

    const { error: storageError } = await supabaseClient
    .storage
    .from('avatars')
    // @ts-ignore
    .upload(imageName, avatar[0] as File)
  
    if (storageError) {
      await supabaseClient
      .from('cabin-images')
      .delete()
      // @ts-ignore
      .eq('id', data?.id)
      throw storageError
    }
    } catch (error) {
    throw error
    } 
}

export async function makeAdmin({ role, userId }: { role: string, userId: string }) {
    
    const { data, error } = await supabaseClient
        .from('users')
        .update({ "role":  role})
        .eq('id', userId)
        .select()

        if (error) {
            console.error(error)
            return { data: null, error }
        }

    return { data, error }
}

export async function getProfileById(userId: string) {
    const { data, error } = await supabaseClient
        .from('users')
        .select()
        .eq('id', userId)
        .single()

        if (error) {
            console.error(error)
            return { data: null, error }
        }

    return { data, error }
}


// export async function doRealTime() {
//     const changes = supabaseClient
//     .channel('table-db-changes')
//     .on(
//         'postgres_changes',
//         {
//         event: '*',
//         schema: 'public',
//         table: 'users',
//         },
//         (payload) => {
//             console.log(payload)
//             toast("Wow! Realtime!")
//         }
//     )
//     .subscribe()
// }

// doRealTime()
  
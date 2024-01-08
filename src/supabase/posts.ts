import { Database } from "@/types/supabase";
import { supabaseClient, supabaseUrl } from ".";
import { User } from "./user";

export type PostList = Database['public']['Tables']['posts']['Row'][]
export type Post = Database['public']['Tables']['posts']['Row']

export const getInfiniteGeneralPosts = async (prevRange = 0, range = 20) => {
    const { data, error } = await supabaseClient.from("posts")
    .select()
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    .range(prevRange, range)

    if (error) throw error

    return { data, error }
}

export const getInfiniteRelevantPosts = async (user: User, prevRange = 0, range = 20) => {
    const { data, error } = await supabaseClient.from("posts")
    .select()
    .eq("institution", user.institution!)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    .range(prevRange, range)

    if (error) throw error

    return { data, error }
}

export async function getPostsByQuery(column: "user" | "id" | "institution" | "location", row: string, range?: number) {
    const { data, error, count} = await supabaseClient.from('posts')
    .select('*')
    .eq(column, row)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    

    if (error) throw error

    return { data, error, count }
}

export async function getPostById(id: string) {
    const { data, error } = await supabaseClient.from("posts")
    .select("*")
    .eq("id", id)
    .single()

    if(error) throw error

    return { data }

}


export async function createUpdatePost({
    postId,
    image,
    ...rest
    }: {
    postId?: string,
    image?: File[] | string
    }) {
    try {
    // @ts-ignore
    const hasImagePath = image?.startsWith?.(supabaseUrl)
    // @ts-ignore
    const imageName = `${Math.random()}-${image[0]?.name}`?.replaceAll('/', '')
    const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/posts/${imageName}`
  

    const { error, data } = await supabaseClient.from('posts').upsert({
        id: postId!,
        updated_at: new Date().toISOString(),
        image: imagePath as string,
        ...rest,
    })

    if (error) throw error

    const { error: storageError } = await supabaseClient
    .storage
    .from('posts')
    // @ts-ignore
    .upload(imageName, image[0] as File)
  
    if (storageError) {
      await supabaseClient
      .from('posts')
      .delete()
    //   @ts-ignore
      .eq('id', data?.id)
      throw storageError
    }
    } catch (error) {
    throw error
    } 
}

export async function deletePost(id:string) {
    const { error } = await supabaseClient.from("posts")
    .delete()
    .eq("id", id)

    if(error) throw error
}
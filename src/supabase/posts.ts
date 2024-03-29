// 'use server'

import { Database, Json } from "@/types/supabase";
import { supabaseClient, supabaseUrl } from ".";
import { User } from "./user";

export type PostList = Database['public']['Tables']['posts']['Row'][]
export type Post = Database['public']['Tables']['posts']['Row']

export const getInfiniteGeneralPosts = async (prevRange = 0, range = 20) => {
    const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .order('updated_at', { ascending: false })
    .eq("is_reply", false)
    .range(prevRange, range)

    if (error) throw error

    return { data, error }
}

export async function fetchInitialPostReplies(postId: string) {
    const { data, error, count} = await supabaseClient.from('posts')
    .select('*')
    .eq("parent_post_id", postId)
    .eq("is_reply", true)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    .limit(20)
    
    if (error) throw error

    return { data, error, count }
}


export const fetchInitialPosts = async () => {
    const { data, error } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .order('updated_at', { ascending: false })
    .limit(20)
    .eq("is_reply", false)

    if (error) throw error

    return { data, error }
}

export const getInfiniteRelevantPosts = async (user: User, prevRange = 0, range = 20) => {
    const { data, error } = await supabaseClient.from("posts")
    .select()
    .eq("institution", user.institution!)
    .eq("is_reply", false)
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

export async function getPostRepliesByQuery(column: "user" | "id" | "institution" | "location" | "parent_post_id", row: string) {
    const { data, error, count} = await supabaseClient.from('posts')
    .select('*')
    .eq(column, row)
    .eq("is_reply", true)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    

    if (error) throw error

    return { data, error, count }
}

export async function getPostsByQuery(column: "user" | "id" | "institution" | "location" | "parent_post_id", row: string) {
    const { data, error, count} = await supabaseClient.from('posts')
    .select('*')
    .eq(column, row)
    .eq("is_reply", false)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    .limit(50)
    

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
    const hasImagePath = (image as string)?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${(image?.[0] as File)?.name}`?.replaceAll('/', '')
    const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/posts/${imageName}`
  

    const { error, data, status } = await supabaseClient.from('posts').upsert({
        id: postId!,
        updated_at: new Date().toISOString(),
        image: (image?.[0] as File)?.name ? imagePath as string : image?.[0] as string,
        ...rest,
    })
    .select()
    .single()


    if (error) throw error
    if (!image || ((image[0] as File)?.name) === undefined) return { data, status }

    const { error: storageError } = await supabaseClient
    .storage
    .from('posts')
    .upload(imageName, image[0] as File)
  
    if (storageError) {
      await supabaseClient
      .from('posts')
      .delete()
      .eq('id', data?.id)
      throw storageError
    }
    return { data, status }
    
    } catch (error) {
    throw error
    } 
}

export async function deletePost(id:string) {
    const { error, statusText, status } = await supabaseClient.from("posts")
    .delete()
    .eq("id", id)

    if(error) throw error
    return { status, statusText }
}

export const getInfinitePostReplies = async (postId: string, prevRange = 0, range = 20) => {
    const { data, error } = await supabaseClient.from("posts")
    .select()
    .eq("parent_post_id", postId)
    .neq("is_reply", false)
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

export const likePost = async (postId: string, likes: Json) => {
    console.log(likes, postId)
    const { data, error } = await supabaseClient
    .from('posts')
    .update({ likes: likes })
    .eq("id", postId)
    .select()

    if (error) throw error

    return { data }
}

export const getBookmarks = async (userId: string) => {
    const { data, error } = await supabaseClient.from('bookmarks')
    .select()
    .eq("user", userId)
    .order("created_at", {ascending: false})

    if (error) throw error

    return { data }
}

export const getBookmarkById = async (id: string) => {
    const { data, error } = await supabaseClient.from('bookmarks')
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data }
}

export const getBookmarkQuery = async (query: 'user' | 'post', row: string | number) => {
    const { data, error } = await supabaseClient.from('bookmarks')
    .select()
    .eq(query, row)

    if (error) throw error

    return { data }
}

export const bookmarkPost = async (userId: string, postId: string, bookmarks?: Json) => {
    const { error } = await supabaseClient
    .from('posts')
    .update({ bookmarks })
    .eq("id", postId)
    .select()

    if (error) throw error

    const { error: bookmarkError, data } = await supabaseClient.from("bookmarks")
    .insert([{
        post: postId,
        user: userId
    }])
    .select()
    .single()

    if (bookmarkError) throw bookmarkError

    return { bookmark: data  }
}


export async function deleteBookmark(id:string) {
    const { error, statusText, status } = await supabaseClient.from("bookmarks")
    .delete()
    .eq("id", id)

    if(error) throw error
    return { status, statusText }
}
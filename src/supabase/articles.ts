// "use server"

import { Database } from "@/types/supabase"
import { supabaseClient, supabaseUrl } from "."

export type ArticleList = Database['public']['Tables']['articles']['Row'][]
export type Article = Database['public']['Tables']['articles']['Row']

export async function getArticles() {
    try {
        const {data, error, count} = await supabaseClient.from("articles").select("*")
        .order("updated_at", {
            ascending: false
        })
        .order("created_at", {
            ascending: false
        })

        if(error) throw error

        return {data, error, count}

    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getArticlesByQuery(column: "author" | "id" | "title" | "tags", row: string, range?: number) {
    const { data, error, count} = await supabaseClient.from('articles')
    .select('*')
    .eq(column, row)
    

    if (error) throw error

    return { data, error, count }
}

export async function getRecentArticles(range = 4) {
    const { data, error, count} = await supabaseClient.from('articles')
    .select('*')
    .order("created_at", {
        ascending: false
    })
    .range(0, range)
    .order("updated_at", {
        ascending: false
    })
    

    if (error) throw error

    return { data, error, count }
}


export async function getArticleById(id: string) {
    const { data, error } = await supabaseClient.from("articles")
    .select("*")
    .eq("id", id)
    .single()

    if(error) throw error

    return { data }

}


export async function createUpdateArticle({
    articleId,
    image,
    ...rest
    }: {
    articleId?: string,
    image?: File[] | string
    }) {
        console.log(image)
    try {
    // @ts-ignore
    const hasImagePath = image?.startsWith?.(supabaseUrl)
    // @ts-ignore
    const imageName = `${Math.random()}-${image[0]?.name}`?.replaceAll('/', '')
    const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/articles/${imageName}`
  

    const { error, data } = await supabaseClient.from('articles').insert({
        id: articleId!,
        updated_at: new Date().toISOString(),
        image_url: imagePath as string,
        ...rest,
    })

    if (error) throw error

    const { error: storageError } = await supabaseClient
    .storage
    .from('articles')
    // @ts-ignore
    .upload(imageName, image[0] as File)
  
    if (storageError) {
      await supabaseClient
      .from('articles')
      .delete()
    //   @ts-ignore
      .eq('id', data?.id)
      throw storageError
    }
    } catch (error) {
    throw error
    } 
}

export async function deleteArticle(id:string) {
    const { error } = await supabaseClient.from("articles")
    .delete()
    .eq("id", id)

    if(error) throw error
}

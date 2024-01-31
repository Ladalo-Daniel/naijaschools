'use server'

import { Database } from "@/types/supabase";
import { supabaseClient, supabaseUrl } from ".";

export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonList = Database['public']['Tables']['lessons']['Row'][]

export async function getLessonsByQuery(column: "faculty" | "title" | "id", row: string, range?: number) {
    const { data, error } = await supabaseClient.from("lessons")
        .select()
        .eq(column, row)
        .order(column)

    if (error) throw error

    return { data, error }
}

export async function createUpdateLesson({
    lessonId,
    image,
    ...rest
    }: {
    lessonId?: number,
    image?: File[] | string
    }) {
    try {
    const hasImagePath = (image as string)?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${(image?.[0] as File)?.name}`?.replaceAll('/', '')
    const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/lessons/${imageName}`
  

    const { error, data, status } = await supabaseClient.from('lessons').upsert({
        id: lessonId!,
        updated_at: new Date().toISOString(),
        image_url: (image?.[0] as File)?.name ? imagePath as string : image?.[0] as string,
        ...rest,
    })
    .select()
    .single()


    if (error) throw error
    if (!image || ((image[0] as File)?.name) === undefined) return { data, status }

    const { error: storageError } = await supabaseClient
    .storage
    .from('lessons')
    .upload(imageName, image[0] as File)
  
    if (storageError) {
      await supabaseClient
      .from('lessons')
      .delete()
      .eq('id', data?.id)
      throw storageError
    }
    return { data, status }
    
    } catch (error) {
    throw error
    } 
}

export async function deleteLesson(id:string) {
    const { error, statusText, status } = await supabaseClient.from("lessons")
    .delete()
    .eq("id", id)

    if(error) throw error
    return { status, statusText }
}

export async function getQuestionById(id:string) {
    const { data, error } = await supabaseClient.from('lesson_mcqs')
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data, error }
}

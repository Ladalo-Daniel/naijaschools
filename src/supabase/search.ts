'use server'

import { supabaseClient } from "."

export const searchCourses = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("courses")
    .select()
    .textSearch('name_code_description', `'${query}'`)
    .range(0, 100)

    if (error) throw error

    return { data, error, count }
}

export const searchInstitutions = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("institutions")
    .select()
    .textSearch('name_description', `'${query}'`)
    .range(0, 100)
    
    if (error) throw error
    return { data, error, count }
}

export const searchPosts = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("posts")
    .select()
    .textSearch('user_content', `'${query}'`)
    .eq("is_reply", false)
    .order("created_at", {
        ascending: false
    })
    .order("updated_at", {
        ascending: false
    })
    .range(0, 100)
    
    if (error) throw error
    return { data, error, count }
}

export const searchArticles = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("articles")
    .select()
    .textSearch('content_tags_title', `'${query}'`)
    .range(0, 100)
    
    
    if (error) throw error
    return { data, error, count }
}

export const search = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("quizzes")
    .select()
    .filter('id', 'eq', query)
    .range(0, 100)

    return { data, error, count }
}


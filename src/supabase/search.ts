'use server'

import { supabaseClient } from "."

export const searchCourses = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("courses")
    .select()
    .textSearch('name_code_description', `'${query}'`)

    if (error) throw error

    return { data, error, count }
}

export const searchInstitutions = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("institutions")
    .select()
    .textSearch('name_description', `'${query}'`)
    
    if (error) throw error
    return { data, error, count }
}

export const searchArticles = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("articles")
    .select()
    .textSearch('content_tags_title', `'${query}'`)
    
    
    if (error) throw error
    return { data, error, count }
}

export const search = async (query: string) => {
    const { data, error, count} = await supabaseClient.from("quizzes")
    .select()
    .filter('id', 'eq', query)

    return { data, error, count }
}


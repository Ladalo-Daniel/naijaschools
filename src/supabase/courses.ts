"use server"

import { Database } from "@/types/supabase"
import { supabaseClient } from "."

export type CourseList = Database['public']['Tables']['courses']['Row'][]
export type Course = Database['public']['Tables']['courses']['Row']

export const getCourses = async (range?: number) => {
    const courses = await supabaseClient.from('courses').select('*').order("created_at", {ascending: false})
    return courses.data
}

export const getCoursesByQuery = async (column: "code" | "description" | "id" | "institution", row: string | number ,range?: number) => {
    const { data, error, count } = await supabaseClient.from('courses')
    .select('*')
    .eq(column, row)
    .order("created_at", {
        ascending: false
    })

    if (error) throw error

    return {data, error, count}
}

export async function getCourseById(id:string | number) {
    const { data, error } = await supabaseClient.from('courses')
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data, error }
}


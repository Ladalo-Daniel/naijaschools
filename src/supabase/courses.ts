"use server"

import { Database } from "@/types/supabase"
import { supabaseClient } from "."

export type CourseList = Database['public']['Tables']['courses']['Row'][]
export type Course = Database['public']['Tables']['courses']['Row']

export const getCourses = async (range?: number) => {
    const courses = await supabaseClient.from('courses').select()
    return courses.data
}

export const getCoursesByQuery = async (column: "code" | "description" | "id" | "institution", row: string | number ,range?: number) => {
    const { data, error, count } = await supabaseClient.from('courses')
    .select()
    .eq(column, row)

    if (error) throw error

    return {data, error, count}
}

export async function getCourseById(id:string) {
    const { data, error } = await supabaseClient.from('courses')
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data, error }
}


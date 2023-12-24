"use server"

import { Database } from "@/types/supabase"
import { supabaseClient } from "."

export type CourseList = Database['public']['Tables']['courses']['Row'][]
export type Course = Database['public']['Tables']['courses']['Row']

export const getCourses = async (range?: number) => {
    const courses = await supabaseClient.from('courses').select()
    return courses.data
}

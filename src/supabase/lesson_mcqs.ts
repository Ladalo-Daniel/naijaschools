'use server'

import { Database } from "@/types/supabase";
import { supabaseClient } from ".";

export type LessonMCQ = Database['public']['Tables']['lesson_mcqs']['Row']
export type LessonMCQList = Database['public']['Tables']['lesson_mcqs']['Row'][]

export async function getLessonMCQsByQuery(column: "user" | "lesson" | "id", row: string, range?: number) {
    const { data, error } = await supabaseClient.from("lesson_mcqs")
        .select()
        .eq(column, row)
        .order(column)

    if (error) throw error

    return { data, error }
}

export async function createLessonMCQ(question: LessonMCQ) {
    const {id} = question

    if (id) {
        const { data, error } = await supabaseClient
        .from('lesson_mcqs')
        .upsert(question)
        .eq("id", id)
        .select()

        if (error) {
            console.error(error)
            throw error
        }

        return { data, error }
        }

        const { data, error } = await supabaseClient
        .from('lesson_mcqs')
        .upsert(question)
        .select()

        if (error) {
            console.error(error)
            throw error
        }

        return { data, error }
}

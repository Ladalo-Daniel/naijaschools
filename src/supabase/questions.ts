'use server'

import { Database } from "@/types/supabase";
import { supabaseClient } from ".";

export type QuestionList = Database['public']['Tables']['questions']['Row'][]
export type Question = Database['public']['Tables']['questions']['Row']

export async function createQuestion(question: Question) {
    const {id} = question

    if (id) {
        const { data, error } = await supabaseClient
        .from('questions')
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
        .from('questions')
        .upsert(question)
        .select()

        if (error) {
            console.error(error)
            throw error
        }

        return { data, error }
}

export async function getQuestions() {
    const { data, error } = await supabaseClient.from("questions")
    .select('*')
    .order('created_at', {
        ascending: false
    })
    .range(0, 100)

    if (error) throw error
    return { data, error }
}

export async function getQuestionById(id:string) {
    const { data, error } = await supabaseClient.from('questions')
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data, error }
}

export async function getQuestionsByQuery(column: 'course_id' | 'id' | 'question', row: string | number, range?: number) {
    const { data, error, count } = await supabaseClient.from('questions')
    .select('*')
    .eq(column, row)
    .order("created_at", {ascending: false})

    if (error) throw error

    return { data, error, count }
}

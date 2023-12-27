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
    .select()

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

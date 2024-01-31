'use server'

import { Database } from "@/types/supabase";
import { supabaseClient } from ".";

export type Progress = Database['public']['Tables']['progress']['Row']
export type ProgressList = Database['public']['Tables']['progress']['Row'][]

export async function getUserProgress(column: "user" | "lesson" | "id" | "complete" | "course", row: string | boolean | number, range?: number) {
    const { data, error } = await supabaseClient.from("progress")
        .select()
        .eq(column, row)
        .order(column)

    if (error) throw error

    return { data, error }
}

export async function saveUserProgress(progress: Progress) {
    const { data, error } = await supabaseClient.from("progress")
        .upsert({
            ...progress,
            complete: true,
        }).select()

    if (error) throw error

    return { data, error }
}



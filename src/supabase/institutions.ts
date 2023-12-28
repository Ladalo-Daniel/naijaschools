"use server"

import { Database } from "@/types/supabase"
import { supabaseClient } from "."

export type InstitutionList = Database['public']['Tables']['institutions']['Row'][]
export type Institution = Database['public']['Tables']['institutions']['Row']

export const getInstitutions = async () => {
    const { data, count, error } = await supabaseClient.from('institutions').select()
    if (error) throw error
    return {data, count, error}
}

export const getInstitutionById = async (institutionId: string) => {
    const { data, count, error } = await supabaseClient.
    from('institutions')
    .select()
    .eq('id', institutionId)
    .single()

    if (error) throw error
    return {data, count, error}
}
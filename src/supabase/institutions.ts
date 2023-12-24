"use server"

import { Database } from "@/types/supabase"
import { supabaseClient } from "."

export type InstitutionList = Database['public']['Tables']['institutions']['Row'][]
export type Institution = Database['public']['Tables']['institutions']['Row']

export const getInstitutions = async () => {
    const institutions = await supabaseClient.from('institutions').select()
    return institutions.data
}
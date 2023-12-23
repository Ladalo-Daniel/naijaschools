"use server"

import { supabaseClient } from "."

export const getInstitutions = async () => {
    const institutions = await supabaseClient.from('institutions').select()
    return institutions.data
}
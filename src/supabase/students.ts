'use server'

import { Database } from "@/types/supabase";
import { supabaseClient } from ".";

export type StudentList = Database['public']['Tables']['users']['Row'][]
export type Student = Database['public']['Tables']['users']['Row']

export async function getStudents(range?: number) {
    const { error, data } = await supabaseClient.from('users')
      .select('*')
      .eq("role", "user")

      if (error) {
        console.error(error)
      }

      return { data, error }
}

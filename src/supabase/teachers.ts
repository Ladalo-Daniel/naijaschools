'use server'

import { Database } from "@/types/supabase";
import { supabaseClient } from ".";

export type TeacherList = Database['public']['Tables']['users']['Row'][]
export type Teacher = Database['public']['Tables']['users']['Row']

export async function getTeachers(range?: number) {
    const { error, data } = await supabaseClient.from('users')
      .select('*')
      .neq("role", "user")

      if (error) {
        console.error(error)
      }

      return { data, error }
}

// "use server"

import { supabaseClient } from "@/supabase"

export async function deleteQuestion(prevState: any, formData: FormData) {
    const { error } = await supabaseClient.from("questions")
    .delete()
    .eq("id", formData.get("id") as string)
  
    if (error)
      return {
        message: error.message,
        success: false,
        pending: false
      }
    
    return {
      message: 'Success! Question has been deleted.',
      success: true,
      pending: false
    }
  }
  
import { supabaseClient } from "@/supabase"

export async function deleteQuiz(prevState: any, formData: FormData) {
    const { error } = await supabaseClient.from("quizzes")
    .delete()
    .eq("id", formData.get("id") as string)
  
    if (error)
      return {
        message: error.message,
        success: false,
        pending: false
      }
    
    return {
      message: 'Success! Quiz has been deleted.',
      success: true,
      pending: false
    }
  }
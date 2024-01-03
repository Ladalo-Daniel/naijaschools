import { supabaseClient } from "@/supabase"

export async function deleteArticle(prevState: any, formData: FormData) {
    const { error } = await supabaseClient.from("articles")
    .delete()
    .eq("id", formData.get("id") as string)
  
    if (error)
      return {
        message: error.message,
        success: false,
        pending: false
      }
    
    return {
      message: 'Success! Article has been deleted.',
      success: true,
      pending: false
    }
  }
import { deleteProfileById } from "@/supabase/user"
import { revalidatePath } from "next/cache"

export async function deleteUser(prevState: any, formData: FormData) {
    const { error } = await deleteProfileById(formData.get("id") as string)
  
    if (error)
      return {
        message: error.message,
        success: false,
        pending: false
      }
  
    revalidatePath('/dashboard/institutions')
  
    return {
      message: 'Success! This User has been deleted.',
      success: true,
      pending: false
    }
  }
  
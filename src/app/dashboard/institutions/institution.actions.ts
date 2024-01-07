'use server'
 
import { supabaseClient, supabaseUrl } from '@/supabase'
import { getUserSession } from '@/supabase/session'
import { getProfile } from '@/supabase/user'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
 
const schema = z.object({
  name: z.string({
    invalid_type_error: 'Provide a valid institution name',
  }).min(1, { message: "Let me not just say anything! Which institution has only 1 character as it's name?"}),
  description: z.string({
    invalid_type_error: 'Provide a valid description',
  }),
  motto: z.string().optional(),
  upsert_id: z.string().optional()
})

export default async function UpsertInstitution(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    upsert_id: formData.get("upsert_id"),
    motto: formData.get("motto"),
  })

  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Bad data submitted",
      success: false
    }
  }

  const session = await getUserSession()
  const profile = await getProfile()

  if (!session?.user || profile?.data?.role === 'user') 
  return {
    message: 'You are not authorized to carry out this operation.',
    success: false
  }

  
  const { data } = await supabaseClient.from("institutions").select()
  data?.forEach(i => {
    if (i.name.toLowerCase().trim() === validatedFields.data.name.toLowerCase().trim()) {
        return {
            message: 'This institution already exists in the database.',
            success: false
        }
    }
  })

  try {

  if (validatedFields.data.upsert_id) {
    const { error } = await supabaseClient.from('institutions')
    .upsert({
      id: parseInt(validatedFields.data.upsert_id),
      name: validatedFields.data.name.trim(),
      description: validatedFields.data.description.trim(),
      motto: validatedFields?.data?.motto?.trim(),
    })

    if (error)  
    return {
      message: error.message,
      success: false
    }

    revalidatePath('/dashboard/institutions')

    return {
        message: 'Success! Institution has been upserted.',
        success: true
    }

  }
 
  const { error } = await supabaseClient.from('institutions')
  .upsert({
    name: validatedFields.data.name.trim(),
    description: validatedFields.data.description.trim(),
    motto: validatedFields.data.motto?.trim(),
  })

  if (error)  
    return {
  message: error.message,
  success: false
    }

    revalidatePath('/dashboard/institutions')

    return {
        message: 'Success! Institution has been upserted.',
        success: true
    }

  } catch (error: any) {
    console.error(error)
    return {
      message: error?.message,
      success: false
    }
  }
}

export async function deleteInstitution(prevState: any, formData: FormData) {
  const { error } = await supabaseClient.from("institutions")
  .delete()
  .eq("id", formData.get("id") as string)

  if (error)
    return {
      message: error.message,
      success: false,
      pending: false
    }

  revalidatePath('/dashboard/institutions')

  return {
    message: 'Success! Institution has been deleted.',
    success: true,
    pending: false
  }
}


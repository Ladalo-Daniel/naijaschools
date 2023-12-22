'use server'
 
import { supabaseClient } from '@/supabase'
import { getUserSession } from '@/supabase/session'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
 
const schema = z.object({
  first_name: z.string({
    invalid_type_error: 'Provide a valid name',
  }),
  last_name: z.string({
    invalid_type_error: 'Provide a valid name',
  }),
})
 
export default async function updatePartialProfile(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const session = await getUserSession()
 
  const { error, data } = await supabaseClient.from('users')
  .upsert({
    id: session?.user?.id!,
    updated_at: new Date().toISOString(),
    first_name: validatedFields.data.first_name,
    last_name: validatedFields.data.last_name,
  })

  if (error)  
    return {
      message: 'Please provide valid credentials.',
      success: false
    }

    revalidatePath('/dashboard/settings')

    return {
        message: 'Success! Your profile has been updated.',
        success: true
    }

}


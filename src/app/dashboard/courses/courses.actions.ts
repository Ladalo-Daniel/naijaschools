'use server'
 
import { supabaseClient } from '@/supabase'
import { getUserSession } from '@/supabase/session'
import { getProfile } from '@/supabase/user'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
 
const schema = z.object({
  institution: z.string(),
  name: z.string({
    invalid_type_error: 'Provide a valid course name',
  }).min(1, { message: "Let me not just say anything! Which course has only 1 character as it's name?"}),
  code: z.string({
    invalid_type_error: 'Provide a valid course code ',
  }),
  faculty: z.string(),
  description: z.string().optional(),
  upsert_id: z.string().optional()
})
 
export default async function UpsertCourse(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    institution: formData.get('institution'),
    name: formData.get('name'),
    code: formData.get('code'),
    faculty: formData.get('faculty'),
    description: formData.get('description'),
    upsert_id: formData.get("upsert_id")
  })
  
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "We could not validate the data you entered into by this time. Please input the right data and try again.",
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

  if (validatedFields.data?.upsert_id) {
    const { error } = await supabaseClient.from('courses')
    .upsert({
      // @ts-ignore
      id: parseInt(validatedFields?.data?.upsert_id),
      name: validatedFields.data.name.trim(),
      description: validatedFields?.data?.description?.trim() || "",
      faculty: validatedFields.data.faculty,
      code: validatedFields.data.code,
      institution: parseInt(validatedFields.data.institution)
    })

    if (error)  
    return {
      message: error.message,
      success: false
    }

    revalidatePath('/dashboard/courses')

    return {
        message: 'Success! Course has been updated.',
        success: true
    }

  }
 
  const { error } = await supabaseClient.from('courses')
  .upsert({
    // @ts-ignore
    name: validatedFields.data.name.trim(),
    description: validatedFields?.data?.description?.trim() || "",
    faculty: validatedFields.data.faculty,
    code: validatedFields.data.code,
    institution: parseInt(validatedFields.data.institution)
  })

  if (error)  
    return {
      message: error.message,
      success: false
    }

    revalidatePath('/dashboard/courses')

    return {
        message: 'Success! Course has been added!.',
        success: true
    }

}

export async function deleteCourse(prevState: any, formData: FormData) {
  const { error } = await supabaseClient.from("courses")
  .delete()
  .eq("id", formData.get("id") as string)

  if (error)
    return {
      message: error.message,
      success: false,
      pending: false
    }

  revalidatePath('/dashboard/courses')

  return {
    message: 'Success! Course has been deleted.',
    success: true,
    pending: false
  }
}


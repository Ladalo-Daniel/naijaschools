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
  question_number: z.string().optional(),
  total_marks: z.string().optional(),
  description: z.string().optional(),
  upsert_id: z.string().optional()
})
 
export default async function UpsertCourse(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    institution: formData.get('institution'),
    name: formData.get('name'),
    code: formData.get('code'),
    question_number: formData.get('question_number'),
    total_marks: formData.get('total_marks'),
    description: formData.get('description'),
    upsert_id: formData.get("upsert_id")
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

  if (validatedFields.data?.upsert_id) {
    const { error } = await supabaseClient.from('courses')
    .upsert({
      id: parseInt(validatedFields?.data?.upsert_id),
      name: validatedFields.data.name.trim(),
      description: validatedFields?.data?.description?.trim() || "",
      question_number: validatedFields.data.question_number,
      total_marks: validatedFields.data.total_marks,
      code: validatedFields.data.code,
      institution: validatedFields.data.institution
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
    name: validatedFields.data.name.trim(),
    description: validatedFields?.data?.description?.trim() || "",
    question_number: validatedFields.data.question_number,
    total_marks: validatedFields.data.total_marks,
    code: validatedFields.data.code,
    institution: validatedFields.data.institution
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


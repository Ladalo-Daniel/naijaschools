import { Database } from "@/types/supabase";
import { supabaseClient, supabaseUrl } from ".";

export type ScholarshipList = Database['public']['Tables']['scholarships']['Row'][]
export type Scholarship = Database['public']['Tables']['scholarships']['Row']


export async function getScholarships(){
    try {
        const {data, error, count} = await supabaseClient.from("scholarships").select("*")
         .order("updated_at", {
            ascending: false
         })
         .order("created_at", {
            ascending: false
         })

         if(error) throw error

         return {data, error, count}
        
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function getScholarshipByTag(tag: string) {
    try {
        const {data, error, count} = await supabaseClient.from("scholarships").select("*")
        .order("updated_at", {
            ascending: false
        })
        .order("created_at", {
            ascending: false
        })
        .filter("tags", "like", tag)

        if(error) throw error

        return {data, error, count}

    } catch (error: any) {
        throw new Error(error)
    }
}


export async function getScholarshipById(id: string) {
    const { data, error } = await supabaseClient.from("scholarships")
    .select("*")
    .eq("id", id)
    .single()

    if(error) throw error

    return { data }

}


export async function createUpdateScholarship(
    {
     scholarshipId,
     image, 
     ...rest
    }: 
    {scholarshipId?: string,
     image?: File[] | string
    }) {

        try {
            // @ts-ignore
            const hasImagePath = image?.startsWith?.(supabaseUrl)
            // @ts-ignore
            const imageName = `${Math.random()}-${image[0]?.name}`?.replaceAll('/', '')
            const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/scholarships/${imageName}`

            const {data, error} = await supabaseClient.from("scholarships").upsert({
                id: scholarshipId!,
                updated_at: new Date().toISOString(),
                image_url: imagePath as string,
                ...rest
            })

            if(error) throw error

            const { error: storageError } = await supabaseClient
            .storage
            .from('scholarships')
            // @ts-ignore
            .upload(imageName, image[0] as File)
        
            if (storageError) {
            await supabaseClient
            .from('scholarships')
            .delete()
            //   @ts-ignore
            .eq('id', data?.id)
            throw storageError
            }
            
        } catch (error) {
            throw error
        }
    
}


export async function deleteScholarship(id:string) {
    const { error } = await supabaseClient.from("scholarships")
    .delete()
    .eq("id", id)

    if(error) throw error
}

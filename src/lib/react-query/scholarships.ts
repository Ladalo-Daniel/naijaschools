import { createUpdateScholarship, getScholarshipById, getScholarshipByTag } from "@/supabase/scholarships"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { QUERY_KEYS } from "./utils"
import { toast } from "sonner"

 const queryClient = new QueryClient()

export const useCreateUpdateScholarship = () => {
   const router = useRouter()

   return useMutation({
    mutationFn: (
        {
         scholarshipId,
         image,
         ...rest
        }: 
        {
         scholarshipId: string, 
         image?: File[],
        }) => createUpdateScholarship({scholarshipId, image, ...rest}),

    mutationKey: [QUERY_KEYS.create_update_scholarship_data],

    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.create_update_scholarship_data]
        })
        router.refresh()
    },

    onError: (error) => {
        toast.error(error.message)
    }
    
    })

}

export const useGetScholarshipById = (id: string) =>{
    return useQuery({
        queryKey: [QUERY_KEYS.get_scholarships],
        queryFn: () => getScholarshipById(id),
        enabled: true
    })
}

export const useGetScholarshipByTag = (tag: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_scholarships],
        queryFn: () => getScholarshipByTag(tag),
        enabled: true
    })
}
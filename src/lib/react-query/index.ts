import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./utils";
import { toast } from "sonner";
import { getProfile, getProfileById, makeAdmin, updateProfile } from "@/supabase/user";
import { useRouter } from "next/navigation";
import { getInstitutions } from "@/supabase/institutions";

export const useGetProfile = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile],
        queryFn: () => getProfile
    })
}

export const useUpdateProfile = () => {
    const router = useRouter()
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: ({userId, onboarded, avatar, ...rest}: { userId: string, onboarded: boolean, avatar?: File[] }) => updateProfile({userId, avatar, ...rest}),
        mutationKey: [QUERY_KEYS.update_user_profile],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            toast.success("Your profile was updated successfully.")
            router.refresh()
        },
        onError: () => {
            toast.error("Sorry, an error occured while we were trying to update your profile... but hang on, let us give it another shot.")
        }
    })
}

export const useMakeAdmin = () => {
    const router = useRouter()
    const queryClient = new QueryClient()
    return useMutation({
        mutationKey: [QUERY_KEYS.update_user_profile],
        mutationFn: ({ role, userId }: { role: string, userId: string }) => makeAdmin({role, userId}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            toast.success("Profile updated successfully.")
            router.refresh()
        },
        onError: () => {
            toast.error("Sorry, an error occured while we were trying to update this profile... but hang on, let us give it another shot.")
        } 
    })
}

export const useGetProfileById = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile, userId],
        queryFn: () => getProfileById(userId)
    })
}

export const useGetInstitutions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_institutions],
        queryFn: getInstitutions
    })
}


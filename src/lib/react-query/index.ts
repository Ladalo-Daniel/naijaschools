import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./utils";
import { toast } from "sonner";
import { getProfile, updateProfile } from "@/supabase/user";
import { useRouter } from "next/navigation";

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
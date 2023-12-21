import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./utils";
import { getProfile, updateProfile } from "@/supabase";

export const useGetProfile = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile],
        queryFn: () => getProfile({ userId })
    })
}

export const useUpdateProfile = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: ({userId, onboarded, ...rest}: { userId: string, onboarded: boolean }) => updateProfile({userId, ...rest}),
        mutationKey: [QUERY_KEYS.update_user_profile],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            console.log('success')
        },
        onError: () => {console.log('failed')}
    })
}

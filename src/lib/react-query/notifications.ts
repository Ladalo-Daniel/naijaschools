import { getRecentNotifications, sendReplyNotification } from "@/supabase/notifications"
import { Post } from "@/supabase/posts"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"

export const useSendReplyNotication = () => {
    return useMutation({
        mutationFn: ({post}: {post: Post}) => sendReplyNotification(post),
        mutationKey: [QUERY_KEYS.send_reply_notification],

        onSuccess: (data) => {
            console.log("ntf sent!")
        },
        onError: ({ message }) => {
            console.error(message)
        }
    })
}

export const useRecentNotifications = ( username: string ) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_recent_notications, username],
        queryFn: () => getRecentNotifications(username),
    })
}
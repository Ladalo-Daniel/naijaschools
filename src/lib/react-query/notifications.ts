import { getRecentNotifications, getSeenNotifications, seenNotification, sendLikeNotification, sendReplyNotification } from "@/supabase/notifications"
import { Post } from "@/supabase/posts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { useRouter } from "next/navigation"
import { User } from "@/supabase/user"

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

export const useSendLikeNotication = () => {
    return useMutation({
        mutationFn: ({post, post_like_user, likes}: {post: Post, likes: string[], post_like_user: User }) => sendLikeNotification(post, likes, post_like_user),
        mutationKey: [QUERY_KEYS.send_like_notification],

        onSuccess: (data) => {
            console.log("ntf sent!")
        },
        onError: ({ message }) => {
            console.error(message)
        }
    })
}

export const useSeenNotication = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({notificationId}: {notificationId: string}) => seenNotification(notificationId),
        mutationKey: [QUERY_KEYS.seen_reply],

        onSuccess: () => {
            console.log("ntf seen!")
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.get_recent_notications]})
            router.refresh()
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

export const useSeenNotifications = (username: string) => {
    return useQuery({
        queryFn:() => getSeenNotifications(username),
        queryKey: [QUERY_KEYS.seen_notifications],
    })
}


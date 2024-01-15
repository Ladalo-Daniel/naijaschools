import { createUpdateChat, deleteChat, getChatById, getUserChats } from "@/supabase/chats"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { Json } from "@/types/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useGetChatById = (chatId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_chat_by_id, chatId],
        queryFn: () => getChatById(chatId),
    })
}

export const useGetUserChats = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_chat_by_id, userId],
        queryFn: () => getUserChats(userId)
    })
}

export const useCreateUpdateChat = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            prompts,
            userId,
            chatId
        }: {
            prompts: Json,
            userId: string,
            chatId?: string
        }) => createUpdateChat(prompts, userId, chatId),
        mutationKey: [QUERY_KEYS.create_update_chat],

        onSuccess: ({data, status}) => {
            toast.success("Chat saved successfully.")
            router.refresh()
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.get_user_chats]})
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.create_update_chat]})
        },
        onError: ({message}) => {
            toast.error("An error occured while saving this chat, please try again.")
            console.error(message)
        }
    })
}

export const useDeleteChat = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({chatId}: {chatId: string}) => deleteChat(chatId),
        mutationKey: [QUERY_KEYS.create_update_chat],

        onSuccess: ({status}) => {
            // toast.success("Chat deleted successfully.")
            router.refresh()
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.get_user_chats]})
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.create_update_chat]})
        },
        onError: ({message})=> {
            toast.error("Failed to delete this chat... please try again.")
            console.error(message)
        } 
    }
  )
}

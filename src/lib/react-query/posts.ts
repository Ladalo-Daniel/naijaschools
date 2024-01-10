import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { deletePost, getInfiniteGeneralPosts, getPostRepliesByQuery, likePost } from "@/supabase/posts"
import { Json } from "@/types/supabase"
import { useRouter } from "next/navigation"

export const useGetPostRepliesByQuery = (column: "user" | "id" | "institution" | "location" | "parent_post_id", row: string, ) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_post_replies_by_query, column, row],
        queryFn: () => getPostRepliesByQuery(column, row)
    })
}

export const useDeletePost = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.delete_post],
        mutationFn: ({ id }: { id: string }) => deletePost(id)
    })
}
export const useGetInfiniteGeneralPosts = () => {
    const fetchPosts = ({ from = 0, to = 5 }) =>
    getInfiniteGeneralPosts(from, to)

    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.get_infinite_posts],
        //@ts-ignore
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, pages) => lastPage.data,
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    return useMutation({
        mutationFn: ({postId, likes}: {postId: string, likes: Json}) => likePost(postId, likes),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.id]})
            // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_RECENT_POSTS]})
            // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_USER_BY_ID]})
            // queryClient.invalidateQueries({queryKey: [QUERY_KEYS.GET_CURRENT_USER]})
            router.refresh()
        }
    })
}
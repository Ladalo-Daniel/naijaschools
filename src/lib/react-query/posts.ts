import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { deletePost, getInfiniteGeneralPosts, getPostRepliesByQuery } from "@/supabase/posts"

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

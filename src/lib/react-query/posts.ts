import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { deletePost, getPostRepliesByQuery } from "@/supabase/posts"

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

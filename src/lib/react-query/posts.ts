import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { deletePost, getInfiniteGeneralPosts, getPostRepliesByQuery, getPostsByQuery } from "@/supabase/posts"

export const useGetInfinitePosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.get_infinite_posts],
        // @ts-ignore
        queryFn: getInfiniteGeneralPosts,
        getNextPageParam: (lastPage, pages) => lastPage.data
        // queryFn: getInfiniteGeneralPosts,
        // getNextPageParam: ({ data }) => {
        //     if (data && data.length === 0) return null
        //     const lastId = data?.[data.length -1]?.id
        //     return lastId
        // },
        // initialPageParam: 0,
    })
}

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

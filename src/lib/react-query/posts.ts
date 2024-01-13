import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { bookmarkPost, deleteBookmark, deletePost, fetchInitialPosts, getBookmarkById, getBookmarkQuery, getInfiniteGeneralPosts, getPostRepliesByQuery, likePost } from "@/supabase/posts"
import { Json } from "@/types/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useGetPostRepliesByQuery = (column: "user" | "id" | "institution" | "location" | "parent_post_id", row: string, ) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_post_replies_by_query, column, row],
        queryFn: () => getPostRepliesByQuery(column, row)
    })
}

export const useFetchInitialPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_initial_posts],
        queryFn: fetchInitialPosts
    })
}

export const useDeletePost = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.delete_post],
        mutationFn: ({ id }: { id: string }) => deletePost(id),
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
        mutationKey: [QUERY_KEYS.like_post],
        onSuccess: (data) => {
            router.refresh()
        }
    })
}

export const useBookmarkPost = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    return useMutation({
        mutationFn: ({userId, postId, bookmarks}: {userId: string, postId: string, bookmarks?: Json}) => bookmarkPost(userId, postId, bookmarks),
        mutationKey: [QUERY_KEYS.create_bookmark],
        onSuccess: (data) => {
            router.refresh()
            return toast.success("Bookmarked succesfully.")
        },
        onError: ({message}) => {
            toast.error(message)
        }
    })
}

export const useDeleteBookmark = () => {
    const router = useRouter()
    return useMutation({
        mutationKey: [QUERY_KEYS.delete_bookmark],
        mutationFn: ({ id }: { id: string }) => deleteBookmark(id),
        onSuccess: () => {
            toast.success("Bookmark wiped out successfully.")
            router.refresh()
        }
    })
}

export const useGetBookmarkById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_bookmarks, id],
        queryFn: () => getBookmarkById(id)
    })
}

export const useGetBookmarkByQuery = (column: 'user' | 'post', row: string | number ) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_bookmarks, column, row],
        queryFn: () => getBookmarkQuery(column, row)
    })
}

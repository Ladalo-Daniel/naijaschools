import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { searchArticles, searchCourses, searchInstitutions, searchPosts } from "@/supabase/search"

export const useSearchCourses = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_search_courses, query],
        queryFn: () => searchCourses(query)
    })
}

export const useSearchArticles = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_search_articles, query],
        queryFn: () => searchArticles(query)
    })
}

export const useSearchPosts = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_search_posts, query],
        queryFn: () => searchPosts(query)
    })
}

export const useSearchInstitutions = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_search_institutions, query],
        queryFn: () => searchInstitutions(query)
    })
}

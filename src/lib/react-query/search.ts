import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./utils"
import { searchArticles, searchCourses, searchInstitutions } from "@/supabase/search"

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

export const useSearchInstitutions = (query: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_search_institutions, query],
        queryFn: () => searchInstitutions(query)
    })
}

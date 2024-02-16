import { QUERY_KEYS } from "@/lib/react-query/utils"
import { useMutation } from "@tanstack/react-query"
import { getAISearchResponse } from "./ai_backend"

const useGetAISearchResponse = () => {
  return useMutation({
    mutationFn: ({ query }: { query: string }) => getAISearchResponse(query),
    mutationKey: [QUERY_KEYS.get_ai_search_response] 
  })
}

export default useGetAISearchResponse
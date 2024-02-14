import { getAISearchResponse } from "@/app/api/chat/route"
import { QUERY_KEYS } from "@/lib/react-query/utils"
import { useMutation } from "@tanstack/react-query"

const useGetAISearchResponse = () => {
  return useMutation({
    mutationFn: ({ query }: { query: string }) => getAISearchResponse(query),
    mutationKey: [QUERY_KEYS.get_ai_search_response] 
  })
}

export default useGetAISearchResponse
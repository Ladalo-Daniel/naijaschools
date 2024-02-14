import { getQuizExplanation } from "@/app/api/chat/route"
import { QUERY_KEYS } from "@/lib/react-query/utils"
import { useMutation } from "@tanstack/react-query"

export const useGetQuizExplanation = () => {
    return useMutation({
        mutationFn: ({ message }: { message: string }) => getQuizExplanation(message),
        mutationKey: [QUERY_KEYS.get_quiz_explanations]
    })
}
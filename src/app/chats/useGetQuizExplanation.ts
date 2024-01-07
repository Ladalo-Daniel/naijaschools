import { QUERY_KEYS } from "@/lib/react-query/utils"
import { getQuizExplanation } from "@/openai"
import { useMutation } from "@tanstack/react-query"

export const useGetQuizExplanation = () => {
    return useMutation({
        mutationFn: ({ message }: { message: string }) => getQuizExplanation(message),
        mutationKey: [QUERY_KEYS.get_quiz_explanations]
    })
}
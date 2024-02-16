import { createUpdateLesson } from "@/supabase/lessons"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { QUERY_KEYS } from "./utils"

const queryClient = new QueryClient()

export const useCreateUpdateLesson = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ({lessonId, image, ...rest}: { lessonId?: number, image?: File[] }) => createUpdateLesson({lessonId, image, ...rest}),
        mutationKey: [QUERY_KEYS.create_update_lesson_data],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.create_update_lesson_data]
            })
            router.refresh()
        },
    })
}
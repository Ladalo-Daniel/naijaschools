import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./utils";
import { toast } from "sonner";
import { getProfile, getProfileById, makeAdmin, updateProfile } from "@/supabase/user";
import { useRouter } from "next/navigation";
import { getInstitutions } from "@/supabase/institutions"
import { Question, createQuestion, getQuestionById } from "@/supabase/questions";
import { getCoursesByQuery } from "@/supabase/courses";
import { fetchRandomQuestions, updateQuiz } from "@/supabase/quiz";
import { Json } from "@/types/supabase";

export const useGetProfile = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile],
        queryFn: () => getProfile
    })
}

export const useUpdateProfile = () => {
    const router = useRouter()
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: ({userId, onboarded, avatar, ...rest}: { userId: string, onboarded: boolean, avatar?: File[] }) => updateProfile({userId, avatar, ...rest}),
        mutationKey: [QUERY_KEYS.update_user_profile],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            toast.success("Your profile was updated successfully.")
            router.refresh()
        },
        onError: () => {
            toast.error("Sorry, an error occured while we were trying to update your profile... but hang on, let us give it another shot.")
        }
    })
}

export const useMakeAdmin = () => {
    const router = useRouter()
    const queryClient = new QueryClient()
    return useMutation({
        mutationKey: [QUERY_KEYS.update_user_profile],
        mutationFn: ({ role, userId }: { role: string, userId: string }) => makeAdmin({role, userId}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            toast.success("Profile updated successfully.")
            router.refresh()
        },
        onError: () => {
            toast.error("Sorry, an error occured while we were trying to update this profile... but hang on, let us give it another shot.")
        } 
    })
}

export const useGetProfileById = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile, userId],
        queryFn: () => getProfileById(userId)
    })
}

export const useGetInstitutions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_institutions],
        queryFn: getInstitutions
    })
}

export const useCreateQuestion = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (question: Question ) => createQuestion(question),
        mutationKey: [QUERY_KEYS.create_question],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_user_profile]
            })
            router.refresh()
        },
        onError: ({message}) => {
            toast.error(message)
        } 
    })
}

export const useGetQuestionById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_questions, id],
        queryFn: () => getQuestionById(id),
    })
}

export const useGetCourseByQuery = ({column, row, range}: { column: "code" | "description" | "id" | "institution", row: string | number, range?: number}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_courses, column, row],
        queryFn: () => getCoursesByQuery(column, row, range),
    })
}

export const useFetchRandomQuestions = ({user_id, course_id, numberOfQuestions}: { user_id: string, course_id: number | number, numberOfQuestions?: number}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_questions, user_id, course_id],
        queryFn: () => fetchRandomQuestions(user_id, course_id, numberOfQuestions),
    })
}

export const useUpdateQuiz = () => {
    const router = useRouter()
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: ({quizId, answers, score}: {quizId: string | number, answers: Json, score?: number} ) => updateQuiz(quizId, answers, score),
        mutationKey: [QUERY_KEYS.update_quiz_data],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.update_quiz_data]
            })
            toast.success("Your progress have been successfully. You can reference it later on the `history page`.")
            router.refresh()
        },
        onError: () => {
            toast.error("An error occured while saving your records to the database.")
        }
    })
}

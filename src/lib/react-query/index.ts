import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./utils";
import { toast } from "sonner";
import { getProfile, getProfileById, getProfileByUsername, makeAdmin, updateProfile } from "@/supabase/user";
import { useRouter } from "next/navigation";
import { getInstitutionById, getInstitutions } from "@/supabase/institutions"
import { Question, createQuestion, getQuestionById } from "@/supabase/questions";
import { getCoursesByQuery } from "@/supabase/courses";
import { fetchRandomQuestions, updateQuiz } from "@/supabase/quiz";
import { Json } from "@/types/supabase";
import { createUpdateArticle, getArticleById, getArticlesByQuery, getArticlesByTag, getRecentArticles } from "@/supabase/articles";
import { createUpdatePost } from "@/supabase/posts";

const queryClient = new QueryClient()

export const useGetProfile = () => {
    return useQuery({
        queryFn: getProfile,
        queryKey: [QUERY_KEYS.get_user_profile],
    })
}

export const useUpdateProfile = () => {
    const router = useRouter()
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
        onError: ({message}) => {
            console.log(message)
            if (message === 'duplicate key value violates unique constraint "unique_username"') {
                toast.error("Eyyah, this username already exists. Why don't you try another one?")
                return
            }
            toast.error("Sorry, an error occured while we were trying to update your profile... but hang on, let us give it another shot.")
            return
        }
    })
}

export const useMakeAdmin = () => {
    const router = useRouter()
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
        queryFn: () => getProfileById(userId),
        enabled: !!userId
    })
}

export const useGetProfileByUsername = (username: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_user_profile, username],
        queryFn: () => getProfileByUsername(username),
        enabled: !!username
    })
}

export const useGetInstitutions = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_institutions],
        queryFn: getInstitutions
    })
}

export const useCreateQuestion = () => {
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
        enabled: !!id
    })
}

export const useGetInstitutionById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_institutions, id],
        queryFn: () => getInstitutionById(id),
        enabled: !!id
    })
}

export const useGetCourseByQuery = ({column, row, range}: { column: "code" | "description" | "id" | "institution", row: string | number, range?: number}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_courses, column, row],
        queryFn: () => getCoursesByQuery(column, row, range),
        enabled: !!row
    })
}

export const useFetchRandomQuestions = ({user_id, course_id, numberOfQuestions, quizId}: { user_id: string, course_id: number | number, numberOfQuestions?: number, quizId?: number | string}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_questions, user_id, course_id, numberOfQuestions, quizId ?? null],
        queryFn: () => fetchRandomQuestions(user_id, course_id, numberOfQuestions, quizId),
    })
}

export const useUpdateQuiz = () => {
    return useMutation({
        mutationFn: ({quizId, answers, score, duration}: {quizId: string | number, answers: Json, score?: number, duration?: string} ) => updateQuiz(quizId, answers, score, duration),
        mutationKey: [QUERY_KEYS.update_quiz_data],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.update_quiz_data]
            })
        },
        onError: () => {
            toast.error("An error occured while saving your records to the database.")
        }
    })
}


export const useCreateUpdateArticle = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ({articleId, image, ...rest}: { articleId: string, image?: File[] }) => createUpdateArticle({articleId, image, ...rest}),
        mutationKey: [QUERY_KEYS.create_update_article_data],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.create_update_article_data]
            })
            router.refresh()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}

export const useGetArticlesByQuery = ({column, row, range}: { column:  "author" | "id" | "title" | "tags", row: string, range?: number}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_articles, column, row],
        queryFn: () => getArticlesByQuery(column, row, range),
        enabled: true
    })
}

export const useGetInstitutionArticleById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_articles, id],
        queryFn: () => getArticleById(id),
        enabled: true
    })
}

export const useGetArticlesByTag = (tag: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_articles, tag],
        queryFn: () => getArticlesByTag(tag),
        enabled: true
    })
}

export const useGetRecentArticles = (range: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.get_articles, range],
        queryFn: () => getRecentArticles(range),
        enabled: true
    })
}



export const useCreateUpdatePost = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ({postId, image, ...rest}: { postId?: string, image?: File[] }) => createUpdatePost({postId, image, ...rest}),
        mutationKey: [QUERY_KEYS.create_update_post],
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.create_update_post]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_infinite_posts]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.get_initial_posts]
            })
            router.refresh()
            console.log(data)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
import { useSearchParams } from 'next/navigation'
import { create } from 'zustand'
import { useFetchRandomQuestions } from '../react-query'

export const useStore = (userId: string, courseId: string) => create((set) => {
    const searchParams = useSearchParams()
    const noq = searchParams.get("noq")

    const { data: quizQuestions, isPending } = useFetchRandomQuestions({
        user_id: userId,
        course_id: parseInt(courseId),
        numberOfQuestions: parseInt(noq!)
    })
    return {
        questions: quizQuestions,
        increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
    }
})
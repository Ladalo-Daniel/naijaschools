'use server'

import { Database, Json } from "@/types/supabase";
import { supabaseClient } from ".";

export type QuizList = Database['public']['Tables']['quizzes']['Row'][]
export type Quiz = Database['public']['Tables']['quizzes']['Row']
export type QuizQuestionList = Database['public']['Tables']['questions']['Row'][]
export type QuizQuestion = Database['public']['Tables']['questions']['Row']

export const fetchRandomQuestions = async (user_id: string, course_id: number, numberOfQuestions = 10) => {
    try {

      /** Get the total count of questions in the @courses */
      const { data: totalQuestionsCount, error: countError } = await supabaseClient
        .from('questions')
        .select('id')
        .eq('course_id', course_id)
  
      if (countError) {
        console.error('Error fetching total questions count:', countError);
        throw countError
      }
  
      const totalQuestions = totalQuestionsCount.length;
      // if (!totalQuestions) {
      //   console.log("There are no questions associated with your configuration yet.")
      //   return 
      // }
  
      /** Calculate a random @start position within the total number of @questions */
      const randomStart = Math.floor(Math.random() * (totalQuestions - numberOfQuestions));
  
      /** Fetch @numberOfQuestions questions starting from the random position */
      const { data, error } = await supabaseClient
        .from('questions')
        .select('*')
        .eq('course_id', course_id)
        .order('id')
        .range(randomStart, randomStart + numberOfQuestions - 1);
  
      if (error) {
        console.error('Error fetching random questions:', error);
        return null;
      }

      
      if (!data?.length) {
        console.log("There are no questions associated with your configuration yet.")
        return 
      }

      const randomizedQuestions = data?.sort(() => Math.random() - 0.5)

      const { data: quizData, error: quizError, count } = await supabaseClient.from('quizzes')
        .insert({
            user_id,
            course_id,
            questions: JSON.stringify(randomizedQuestions),
        })
        .select()
        .single()

        if (quizError) {
            throw quizError
        }

      /** @data will contain the randomly selected questions */ 
      return { data: JSON.parse(quizData?.questions?.toString()!) as QuizQuestionList, count, quizId: quizData?.id };

    } catch (error) {
      throw error
    }
  }

  export async function updateQuiz(quizId: string | number, answers: Json, score?: number, duration?: string) {
    
    const { data, error } = await supabaseClient
        .from('quizzes')
        .update({ 
          "answers": answers,
          "total_score": score,
          "updated_at": new Date().toISOString(),
          "duration": duration
         })
        .eq('id', quizId)
        .select()

        if (error) {
            console.error(error)
            return { data: null, error }
        }

    return { data, error }
}

export async function getQuizzesByQuery(column: 'course_id' | 'user_id' | 'id', row: string | number, range?: number) {
  const { data, error, count } = await supabaseClient.from('quizzes')
  .select()
  .eq(column, row)

  if (error) throw error

  return { data, error, count }
}

export async function getQuizById(quizId: number | string) {
  const { data, error, count } = await supabaseClient.from('quizzes')
  .select()
  .eq("id", quizId)
  .single()

  if (error) throw error

  return { data, error, count }
}

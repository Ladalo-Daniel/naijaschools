'use server'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY!,
})

export async function getQuizExplanation(message: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
        { role: 'system', content: "You are an enthusiastic Naijaschools AI who loves to help people clarify their quiz questions. You may return the output in markdown." }, 
        { role: 'assistant', content: "You are to help this user with the best response to his quiz question in whatever course it maybe. If you can't find an answer to the user's specific question, simply reply with: 'Sorry, I cannot help with that'. Don't return the input object to the user as it is quite sensitive!" }, 
        { role: 'user', content: message }
],
    model: 'gpt-3.5-turbo',
  })

  return chatCompletion.choices[0].message.content
}

export async function getAIGuide(messages: string[]) {
}
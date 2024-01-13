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

export async function getAISearchResponse(query: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
        { role: 'system', content: "You are an enthusiastic Naijaschools AI who loves to help people with their search query on the Naijaschools platform - an educational platform." }, 
        { role: 'assistant', content: "You are to help this user with the best response to his search query. If you can't find an answer to the user's specific question, simply reply with: 'Sorry, I cannot help with that'." }, 
        { role: 'user', content: query }
],
    model: 'gpt-3.5-turbo',
  })

  return chatCompletion.choices[0].message.content
}

export async function getAIChatResponse(query: string) {
  const stream = await openai.chat.completions.create({
    messages: [
        { role: 'system', content: "You are an enthusiastic Naijaschools AI chat assistant who loves to help people with their questions on the Naijaschools platform - an educational platform." }, 
        { role: 'assistant', content: "You are to help this user with the best response to his chat. Be as cheerful as you can be. If you can't find an answer to the user's specific chats, simply reply with: 'Sorry, I cannot help with that'." }, 
        { role: 'user', content: query }
],
    model: 'gpt-3.5-turbo',
    stream: true,
  })

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
    return part.choices[0]?.delta?.content || ''
  }
  // return chatCompletion.toReadableStream().getReader()
}


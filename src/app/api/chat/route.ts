import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { chat } from '@/app/dashboard/chat/types'
import { NextResponse } from 'next/server'

const config = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY!,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json() as {prompt: string, messages: chat[]}

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: 'system', content: "You are an enthusiastic Naijaschools AI chat assistant who loves to help people with their questions on the Naijaschools platform - an educational platform." }, 
            { role: 'assistant', content: "You are to help this user with the best response to his chat. Be as cheerful as you can be. If you can't find an answer to the user's specific chats, simply reply with: 'Sorry, I cannot help with that'." },
            { role: 'user', content: prompt },
        ],
    })

    const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
  } catch (error) {
    return NextResponse.json({ messages: null })
  }
}

export async function getQuizExplanation(message: string) {
  const response = await openai.createChatCompletion({
    messages: [
        { role: 'system', content: "You are an enthusiastic Naijaschools AI who loves to help people clarify their quiz questions. You may return the output in markdown." }, 
        { role: 'assistant', content: "You are to help this user with the best response to his quiz question in whatever course it maybe. If you can't find an answer to the user's specific question, simply reply with: 'Sorry, I cannot help with that'. Don't return the input object to the user as it is quite sensitive!" }, 
        { role: 'user', content: message }
],
    model: 'gpt-3.5-turbo',
  })
  // const stream = OpenAIStream(response)

  // return new StreamingTextResponse(stream)
  return response.text()
}

export async function getAISearchResponse(query: string) {
  const response = await openai.createChatCompletion({
    messages: [
        { role: 'system', content: "You are an enthusiastic Naijaschools AI who loves to help people with their search query on the Naijaschools platform - an educational platform." }, 
        { role: 'assistant', content: "You are to help this user with the best response to his search query. If you can't find an answer to the user's specific question, simply reply with: 'Sorry, I cannot help with that'." }, 
        { role: 'user', content: query }
],
    model: 'gpt-3.5-turbo',
  })

  // const stream = OpenAIStream(response)

  // return new StreamingTextResponse(stream)
  return response.text()
}

"use server"

import { Database, Json } from "@/types/supabase";
import { supabaseClient } from ".";

export type Chats = Database["public"]["Tables"]['chats']['Row'][]
export type Chat = Database["public"]["Tables"]['chats']['Row']

export async function getChatById(id: string) {
    const { data, error, status } = await supabaseClient.from("chats")
    .select()
    .eq("id", id)
    .single()

    if (error) throw error

    return { data, status }
}

export async function getUserChats(userId: string) {
    const { data, status, error } = await supabaseClient.from("chats")
    .select()
    .eq("user", userId)
    .order("created_at", {ascending: false})
    .limit(50)

    if (error) throw error

    return { data, status }
}

export async function createUpdateChat(prompts: Json, userId: string, chatId?: string) {
    const {data, error, status} = await supabaseClient.from("chats")
    .upsert({
        id: chatId!,
        prompts: prompts,
        user: userId,
    })
    .select()
    .single()
 
    if (error) throw error

    return { data, status }
}

export const deleteChat = async (chatId: string) => {
    const {error, status} = await supabaseClient.from('chats')
    .delete()
    .eq("id", chatId)

    if (error) throw error

    return {
        status
    }
}

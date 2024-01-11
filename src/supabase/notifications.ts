import { Database } from "@/types/supabase";
import { supabaseClient } from ".";
import { Post, getPostById } from "./posts";

export type NotificationList = Database['public']['Tables']['notifications']['Row'][]
export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationType = "general" | "reply" | "post" | "reaction"

export const sendNotification = async (type: NotificationType, options: {
    user: string, content: any, seen?: boolean
}) => {
    const { data, error, status } = await supabaseClient
      .from('notifications')
      .insert([
        {
        content: options.content,
        notification_type: type,
        user: options.user
      }
    ])
      .select()
      .single()
    
  
    if (data) {
        return { data, status }
    } else {
      console.error('Error sending notification:', error);
      throw error
    }
  }
  
export async function sendReplyNotification(post: Post) {
    const isReply = post.parent_post_id as unknown as boolean || post.is_reply

    if (isReply) {
        const {data: parentPost} = await getPostById(post?.parent_post_id!)

        if (parentPost) {
            const author = parentPost.user
            await sendNotification("reply", {
                user: author!,
                content: JSON.stringify({
                    parentPost: parentPost,
                    reply: post
                }),
            })
        }
        
    }
}

export function notify() {
    const replyChannel = supabaseClient.channel("posts realtime")
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "posts",
    }, (payload)=>{
      const post = payload.new as Post
  
      async function send() {
          await sendReplyNotification(post)
      }
  
      send()
    })
    .subscribe()
  
    replyChannel.unsubscribe()
}

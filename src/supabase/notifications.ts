import { Database } from "@/types/supabase";
import { supabaseClient } from ".";
import { Post, getPostById } from "./posts";
import { User } from "./user";

export type NotificationList = Database['public']['Tables']['notifications']['Row'][]
export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationType = "general" | "reply" | "post" | "reaction"

export const sendNotification = async (type: NotificationType, options: {
    user: string, content: any, seen?: boolean, from: string
}) => {
    const { data, error, status } = await supabaseClient
      .from('notifications')
      .insert([
        {
        content: options.content,
        notification_type: type,
        user: options.user,
        from: options.from
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

export async function seenNotification(notificationId: string) {
  const { status } = await supabaseClient.from("notifications")
  .update({
    seen: true,
    seen_at: new Date().toISOString(),
  })
  .eq("id", notificationId)
}
  
export async function sendReplyNotification(post: Post) {
    const isReply = post.parent_post_id as unknown as boolean || post.is_reply

    if (isReply) {
        const {data: parentPost} = await getPostById(post?.parent_post_id!)

        if (parentPost) {
            const author = parentPost.user
            await sendNotification("reply", {
                user: author!,
                from: post?.user!,
                content: JSON.stringify({
                    parentPost: parentPost,
                    reply: post
                }),
            })
        }
        
    }
}
  
export async function sendLikeNotification(post: Post, likes: string[], post_like_user: User ) {
  const author = post.user
  const hasActuallyLiked = likes.includes(post_like_user?.id)
    await sendNotification("reaction", {
      user: author!,
      from: post_like_user.username!,
      content: JSON.stringify({
          post: post,
      }),
  })
}

export const getUserNotifications = async (username: string) => {
  const { data, error, status } = await supabaseClient.from("notifications")
  .select()
  .eq("user", username)
  .order("created_at", { ascending: false })

  if (error) throw error

  return { data, status }
}

export const getRecentNotifications = async (username: string) => {
  const { data, error, status } = await supabaseClient.from("notifications")
  .select()
  .eq("user", username)
  .eq("seen", false)
  .order("created_at", { ascending: false })

  if (error) throw error

  return { data, status }
}

export async function getSeenNotifications(username: string) {
    const { data, error } = await supabaseClient.from('notifications')
    .select()
    .eq("seen", true)
    .eq("user", username)
    .order("created_at", {ascending: false})
    .limit(50)
    if (error) throw error
    return { data, error }
}

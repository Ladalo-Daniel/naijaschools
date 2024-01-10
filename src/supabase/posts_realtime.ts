import { toast } from "sonner"
import { supabaseClient } from "."

// const handleRealtimePostInsert = (payload: any) => {
//     console.log('Change received!', payload)
//   }
  

//   supabaseClient
//   .channel('posts-insert')
//   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, handleRealtimePostInsert)
//   .subscribe()
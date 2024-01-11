'use client'

import { PostList } from '@/supabase/posts'
import React, { ReactNode, createContext, useState } from 'react'

export const PostContext = createContext<{
    loadedPosts: PostList,
    setLoadedPosts:  React.Dispatch<React.SetStateAction<PostList>>
}>({
  loadedPosts: [],
  setLoadedPosts: () => {}
})

const PostProvider = ({ children, posts }: { children: ReactNode, posts: PostList }) => {
  const [loadedPosts, setLoadedPosts] = useState(posts)
  const [createPost, setCreatePost] = useState(null)
  return (
    <PostContext.Provider value={{
       loadedPosts,
       setLoadedPosts
    }}>
        {children}
    </PostContext.Provider>
  )
}

export default PostProvider
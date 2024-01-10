'use client'

import { Post, PostList } from '@/supabase/posts';
import { create } from 'zustand';

const usePostStore = create((set) => ({
  posts: [],
  addPost: (post: Post) => set((state: PostList) => ({ posts: [...state, ...[post]] })),

  loadedPosts: (posts: PostList) => set((state: PostList) => ({ posts: [...posts, state] })),

  setPosts: (posts: PostList) => set({ posts }),
}));

export default usePostStore; 
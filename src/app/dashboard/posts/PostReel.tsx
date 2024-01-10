'use client'

import { Post, PostList, getInfiniteGeneralPosts } from '@/supabase/posts'
import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import { Alert } from '@/components/ui/alert'
import { debounce } from 'lodash'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/button'
import { supabaseClient } from '@/supabase'

const PostReel = ({ posts }: { posts?: PostList }) => {
    const PAGE_COUNT = 20
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [loadedPosts, setLoadedPosts] = useState(posts)
    const [offset, setOffset] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const [isLast, setIsLast] = useState(false)
    const [recentPost, setRecentPost] = useState<Post | any>({})

    const handleScroll = () => {
      if (containerRef.current && typeof window !== 'undefined') {
        const container = containerRef.current
        const { bottom } = container.getBoundingClientRect()
        const { innerHeight } = window
        setIsInView((prev) => bottom <= innerHeight)
      }
    }

    useEffect(() => {
      const handleDebouncedScroll = debounce(() => !isLast && handleScroll(), 200)
      window.addEventListener('scroll', handleDebouncedScroll)
      return () => {
        window.removeEventListener('scroll', handleDebouncedScroll)
      }
    }, [])

    const handleRealtimePostInsert = (payload: any) => {
    console.log('Change received!', payload?.new)
    setRecentPost(payload)
    }
    

    supabaseClient
    .channel('posts-insert')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, handleRealtimePostInsert)
    .subscribe()

    useEffect(() => {
      if (isInView) {
        loadMorePosts(offset)
      }
    }, [isInView, recentPost])

    const loadMorePosts = async (offset: number) => {
      setIsLoading(true)
      setOffset((prev) => prev + 1)
      const newPosts = await fetchPosts(offset, PAGE_COUNT)
      setLoadedPosts((prevPosts) => [...prevPosts!, ...newPosts!])
      setIsLoading(false)

      if (newPosts?.length! < PAGE_COUNT) {
        setIsLast(true)
      }
    }
    
    const fetchPosts = async (offset: number, PAGE_COUNT: number) => {
      const from = offset * PAGE_COUNT
      const to = from + PAGE_COUNT - 1

      const { data } = await getInfiniteGeneralPosts(from, to)
      return data
    }

    if (loadedPosts?.length === 0) {
      return (
          <Alert className='p-4 max-w-screen-sm'>
              There are no replies for this post yet.
          </Alert>
      )
  }
  return (
    <div className='flex flex-col gap-6' ref={containerRef}>
        {
            loadedPosts?.map((post, i) => {
              const recalculatedDelay =
            i >= PAGE_COUNT * 2 ? (i - PAGE_COUNT * (offset - 1)) / 15 : i / 15

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1],
                delay: recalculatedDelay,
              }}
            >
               <PostCard post={post} key={post.id} />
            </motion.div>
          )
        })
        }
        { isLoading && (
          <div className="py-3 max-w-screen-sm flex items-center justify-center">
            <Button isIconOnly isLoading={isLoading} variant='flat'  color='success' />
          </div>
        )}
    </div>
  )
}

export default PostReel

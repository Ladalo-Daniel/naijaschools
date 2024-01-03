'use client'

import React from 'react'
import { Session } from '@supabase/supabase-js'
import CreateArticleForm from '../create-article/CreateArticleForm'
import { useGetInstitutionArticleById } from '@/lib/react-query'
import { useSearchParams } from 'next/navigation'
import Loading from '../loading'

const UpdateArticleComponent = ({ session }: { session?: Pick<Session, 'user'> }) => {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("articleId")

  const { data: article, isLoading, isError } = useGetInstitutionArticleById(articleId ?? "")

  if (isLoading) {
    return <Loading />
  }

  if (isError || !article) {
    return <div className='flex ites-center justify-center text-rose-500'>Error loading article.</div>;
  }

  return (
    <div className='flex flex-col gap-3'>
      <CreateArticleForm session={session} article={article.data} />
    </div>
  )
}

export default UpdateArticleComponent

'use client'

import React from 'react'
import { Session } from '@supabase/supabase-js'
import CreateArticleForm from '../create-article/CreateArticleForm'
import { useGetInstitutionArticleById } from '@/lib/react-query'
import { useSearchParams } from 'next/navigation'
import Loading from '../loading'
import { Alert } from '@/components/ui/alert'
import { Button } from '@nextui-org/button'
import { LucideRefreshCcw } from 'lucide-react'

const UpdateArticleComponent = ({ session }: { session?: Pick<Session, 'user'> }) => {
  const searchParams = useSearchParams()
  const articleId = searchParams.get("articleId")

  const { data: article, isLoading, isError } = useGetInstitutionArticleById(articleId ?? "")

  if (isLoading) {
    return <Loading />
  }

  if (isError || !article) {
    return <Alert className='flex p-6 text-rose-500 flex-col gap-3 items-center'>
      <h2>Error loading article.</h2>
      <Button variant='flat' color='warning' isIconOnly><LucideRefreshCcw size={18}
          onClick={() => location.reload()}
        /></Button>
      </Alert>;
  }

  return (
    <div className='flex flex-col gap-3'>
      <CreateArticleForm session={session} article={article.data} />
    </div>
  )
}

export default UpdateArticleComponent

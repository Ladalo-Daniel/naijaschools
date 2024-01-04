import ArticleReel from '@/components/shared/ArticleReel'
import { Alert } from '@/components/ui/alert'
import {  getArticles } from '@/supabase/articles'
import React from 'react'

const ArticleComponent = async () => {
  const { data: articles } = await getArticles()
  return (
    <div className='flex flex-col gap-3'>
      {articles.length ? (<section className='flex flex-col gap-3'>
                <ArticleReel articles={articles} />
            </section>) : (
                <Alert>
                    There are no articles yet. Please check back again.
                </Alert>
            )}
    </div>
  )
}

export default ArticleComponent
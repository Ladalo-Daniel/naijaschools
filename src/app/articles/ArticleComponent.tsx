import ArticleReel from '@/components/shared/ArticleReel'
import { ArticleList } from '@/supabase/articles'
import React from 'react'

const ArticleComponent = ({ articles }: {articles: ArticleList}) => {
  return (
    <div className='flex flex-col gap-3'>
        <ArticleReel articles={articles} />
    </div>
  )
}

export default ArticleComponent
import { ArticleList } from '@/supabase/articles'
import React from 'react'
import ArticleReel from '@/components/shared/ArticleReel'

const AdminArticleComponent = ({ articles }: {articles: ArticleList}) => {
  return (
    <div className='flex flex-col gap-3'>
        <ArticleReel articles={articles} />
    </div>
  )
}

export default AdminArticleComponent
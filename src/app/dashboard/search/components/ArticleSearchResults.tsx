import { Alert } from '@/components/ui/alert'
import { ArticleList } from '@/supabase/articles'
import Link from 'next/link'
import React from 'react'
import AISearchResponse from './AISearchResponse'

const ArticleSearchResults = ({ articles, query }: { articles: ArticleList, query?: string }) => {
    if (!articles.length) return <div className='flex flex-col gap-3'>
        <Alert className="border-none">
            Your query <b>{query}</b> could not be found in our articles. You may proceed with Naijaschools AI.
        </Alert>
        <AISearchResponse query={query!} />
    </div>

  return (
    <div className='flex flex-col gap-3'>
        {
            articles.map(article => (
                <Link href={`/articles/${article.id}`} key={article.id} className='my-2 max-w-2xl py-2 border-b'>
                    <h2 className='text-[18px] text-primary py-2'>{article.title}</h2>
                    <p className="text-tiny tracking-tighter mt-1 flex flex-wrap gap-1">{article.tags?.split(',').map(tag => (
                        <span key={tag} className='shadow rounded-lg p-2 text-primary hover:underline hover:transition-all'>
                            {tag}
                        </span>
                    ))}</p>
                </Link>
            ))
        }
    </div>
  )
}

export default ArticleSearchResults
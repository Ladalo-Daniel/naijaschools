import MaxWrapper from '@/components/MaxWrapper'
import React, { Suspense } from 'react'
import ArticleComponent from './ArticleComponent'
import { getArticles } from '@/supabase/articles'
import { Alert } from '@/components/ui/alert'
import BackButton from '@/components/shared/BackButton'
import AuthTopNav from '@/components/AuthTopNav'
import { Metadata } from 'next'
import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton'

export const metadata: Metadata = {
    title: "All Articles",
    description: "A list of all articles to explore from @Naijaschools."
}

const ArticlePage = async () => {
    return (
      <div className="mx-auto flex flex-col gap-4 border bg-gradient-to-tr ">
        <AuthTopNav isHome  />
        <MaxWrapper className='bg-background flex-1 p-4 max-w-7xl'>
            <BackButton />
            <h2 className="text-2xl text-primary py-2">All Articles</h2>
            <Suspense fallback={<ArticleSkeleton />}>
                <ArticleComponent />
            </Suspense>
        </MaxWrapper>
    </div>
  )
}

export default ArticlePage
import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import ArticleComponent from '../ArticleComponent'
import { useSearchParams } from 'next/navigation'
import { useGetArticlesByTag } from '@/lib/react-query'
import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton'
import AuthTopNav from '@/components/AuthTopNav'


const TagsPage = () => {
    // const searchParams = useSearchParams()
    // const tag = searchParams.get('tag')
    // const { data: articles, isPending } = useGetArticlesByTag(tag!)

    // if (isPending) return <ArticleSkeleton />
  return (
    <div className='flex flex-col'>
        <AuthTopNav />
        <MaxWrapper className='flex bg-background p-4'>
            <section className="flex flex-col gap-3 mx-auto">
                {/* <ArticleComponent articles={articles?.data!} /> */}
            </section>
        </MaxWrapper>
    </div>
  )
}

export default TagsPage
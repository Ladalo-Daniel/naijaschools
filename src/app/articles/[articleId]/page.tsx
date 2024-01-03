import MaxWrapper from '@/components/MaxWrapper'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getArticleById } from '@/supabase/articles'
import Image from 'next/image'
import React from 'react'
import ArticleDetailComponent from './ArticleDetailComponent'
import BackButton from '@/components/shared/BackButton'
import AuthTopNav from '@/components/AuthTopNav'

const ArticleDetailPage = async ({params}: {params: { articleId: string }}) => {

    const {articleId} = params
    const { data: article } = await getArticleById(articleId)
  return (
    <div className="mx-auto flex flex-col gap-4 border bg-gradient-to-tr ">
        <AuthTopNav isHome  />
        <MaxWrapper className='bg-background p-4 max-w-7xl'>
            <BackButton />
            <h2 className='font-semibold text-3xl py-3'>{article.title}</h2>
            <AspectRatio ratio={5 / 2} className='object-cover'>
                <Image src={article.image_url!} fill alt={article.title!} className='object-cover rounded-md' />
            </AspectRatio>
            <ArticleDetailComponent article={article} />
        </MaxWrapper>
    </div>
  )
}

export default ArticleDetailPage
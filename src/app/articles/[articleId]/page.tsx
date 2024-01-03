import MaxWrapper from '@/components/MaxWrapper'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getArticleById } from '@/supabase/articles'
import Image from 'next/image'
import React from 'react'
import ArticleDetailComponent from './ArticleDetailComponent'
import BackButton from '@/components/shared/BackButton'

const ArticleDetailPage = async ({params}: {params: { articleId: string }}) => {

    const {articleId} = params
    const { data: article } = await getArticleById(articleId)
  return (
    <MaxWrapper className='bg-background p-4 max-w-7xl'>
        <BackButton />
        <h2 className='font-semibold text-3xl py-3'>{article.title}</h2>
        <AspectRatio ratio={16 / 9}>
            <Image src={article.image_url!} fill alt={article.title!} className='object-cover' />
        </AspectRatio>
        <ArticleDetailComponent article={article} />
    </MaxWrapper>
  )
}

export default ArticleDetailPage
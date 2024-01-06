import MaxWrapper from '@/components/MaxWrapper'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getArticleById } from '@/supabase/articles'
import Image from 'next/image'
import React from 'react'
import ArticleDetailComponent from './ArticleDetailComponent'
import BackButton from '@/components/shared/BackButton'
import AuthTopNav from '@/components/AuthTopNav'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import { getProfile } from '@/supabase/user'

import type { Metadata, ResolvingMetadata } from 'next'
type Props = {
  params: { articleId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const articleId = params.articleId
 
  const { data: article } = await getArticleById(articleId)
 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: article.title,
    openGraph: {
      images: [article.image_url!, ...previousImages],
    },
  }
}
 
const ArticleDetailPage = async ({params}: Props) => {

    const {articleId} = params
    const { data: article } = await getArticleById(articleId)
    const profile = await getProfile()
  return (
    <div className="mx-auto flex flex-col gap-4 border bg-gradient-to-tr ">
        <AuthTopNav isHome  />
        <MaxWrapper className='bg-background p-4 max-w-7xl'>
            <BackButton />
            {(profile?.data?.role === 'admin' || profile?.data?.role === 'staff' ) && <Button as={Link} href={`/dashboard/edit-article?articleId=${article.id}`} variant='ghost' color='primary' className='w-fit'><Edit size={18}/> Edit</Button>}
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
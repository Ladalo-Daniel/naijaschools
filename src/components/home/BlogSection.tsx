import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { getRecentArticles } from '@/supabase/articles';
import Markdown from 'react-markdown';
import ArticleReel from '../shared/ArticleReel';


const BlogSection = async () => {
  const { data: articles } = await getRecentArticles(6)
  return (
    <section className='flex flex-col gap-3'>
        <h2 className="text-2xl hover:underline py-2 transition-all text-primary">Some of Our Articles.</h2>

        <ArticleReel articles={articles} />
        <section className="py-4">
            <Link href={'/articles'} className={buttonVariants({
                variant: "link",
            })}>See more...</Link>
        </section>
    </section>
  )
}

export default BlogSection
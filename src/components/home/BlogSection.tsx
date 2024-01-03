import { Card, CardBody, CardHeader } from '@nextui-org/card'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { getRecentArticles } from '@/supabase/articles';
import Markdown from 'react-markdown';


const BlogSection = async () => {
  const { data: articles } = await getRecentArticles(6)
  return (
    <section className='flex flex-col gap-3'>
        <h2 className="text-2xl hover:underline py-2 transition-all text-primary">Some of Our Articles.</h2>

        <div className='flex flex-wrap gap-4'>
          {
            articles?.map(article => (
                <Card className='bg-gradient w-68 min-h-50 max-w-[320px] hover:opacity-60 hover:animate-in cursor-pointer max-sm:w-full from-green-950 to-zinc-800' key={article?.id} as={Link}
                    href={`/articles/${article.id}`}
                >
                    <CardHeader className='flex items-center justify-between'>
                        <AspectRatio ratio={16/9} className='bg-muted'>
                        <Image
                            src={article.image_url as string}
                            alt={article.title as string}
                            fill
                            className="rounded-md object-cover"
                        />
                        </AspectRatio>
                    </CardHeader>
                    <CardBody className='px-4'>
                        <h2 className='text-primary py-2 font-semibold'>
                            {article.title}
                        </h2>
                        <div className='py-2 text-muted-foreground'>
                            <Markdown>
                                {article.content?.slice(0, 80) + "..."}
                            </Markdown>
                        </div>
                    </CardBody>
                </Card>
            ))
        }
        </div>
        <section className="py-4">
            <Link href={'/articles'} className={buttonVariants({
                variant: "link",
            })}>See more...</Link>
        </section>
    </section>
  )
}

export default BlogSection
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArticleList } from '@/supabase/articles'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ArticleComponent = ({ articles }: {articles: ArticleList}) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap gap-4'>
        {
            articles?.map(article => (
                <Card className='bg-gradient w-68 min-h-50 max-w-[500px] hover:opacity-60 hover:animate-in cursor-pointer max-sm:w-full from-green-950 to-zinc-800' key={article?.id} as={Link}
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
                        <p className='py-2 text-muted-foreground'>
                            {article.content?.slice(0, 80) + "..."}
                        </p>
                    </CardBody>
                </Card>
            ))
        }
        </div>
    </div>
  )
}

export default ArticleComponent
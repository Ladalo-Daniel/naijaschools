"use client"

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import React from 'react'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { Article } from '@/supabase/articles'
import Link from 'next/link'
import { useGetProfile } from '@/lib/react-query'
import { Button } from '@nextui-org/button'
import DeleteArticle from '@/app/dashboard/articles/components/DeleteArticle'
import { Edit2 } from 'lucide-react'

const ArticleItem = ({article}: { article: Article }) => {
    let { data: _profile, isPending } = useGetProfile()
    const profile = _profile?.data

  return (
    <Card className='bg-gradient hover:opacity-60 h-[500px] hover:animate-in cursor-pointer from-green-950 to-zinc-800' key={article?.id} 
    >
        <CardHeader className='flex items-center justify-between'>
            <AspectRatio ratio={16/9} className='bg-muted'>
            <Image
                src={article.image_url as string || '/icons/file-upload.svg'}
                alt={article.title as string}
                fill
                className="rounded-md object-cover"
            />
            </AspectRatio>
        </CardHeader>
        <CardBody className='px-4' as={Link}
        href={`/articles/${article.id}`}>
            <h2 className='text-primary py-2 font-semibold'>
                {article.title}
            </h2>
            <div className='py-2 text-muted-foreground'>
                <Markdown>
                    {article.content?.slice(0, 80) + "..."}
                </Markdown>
            </div>
                    </CardBody>
                    {(profile?.role === 'admin' || profile?.role === 'staff') && <CardFooter className='flex gap-2 flex-wrap'>
                        <Button variant='flat' color='primary' isIconOnly as={Link} href={`/dashboard/edit-article?articleId=${article.id}`}><Edit2  size={15}/></Button>
                        <DeleteArticle article={article!} />
                    </CardFooter>}
    </Card>
  )
}

export default ArticleItem
import MarkdownPreview from '@/components/shared/MarkdownPreview'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArticleList } from '@/supabase/articles'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Edit2, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdminArticleComponent = ({ articles }: {articles: ArticleList}) => {
  return (
    <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap gap-4'>
        {
            articles?.map(article => (
                <Card className='bg-gradient w-68 min-h-50 max-w-[350px] hover:opacity-60 hover:animate-in cursor-pointer max-sm:w-full from-green-950 to-zinc-800' key={article?.id} 
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
                    <CardBody className='px-4' as={Link}
                    href={`/articles/${article.id}`}>
                        <h2 className='text-primary py-2 font-semibold'>
                            {article.title}
                        </h2>
                        <div className='py-2 text-muted-foreground'>
                            <MarkdownPreview content={article.content?.slice(0, 80) + "..."} className='text-tiny' />
                        </div>
                    </CardBody>
                    <CardFooter className='flex gap-2 flex-wrap'>
                        <Button variant='flat' color='primary' isIconOnly as={Link} href={`/dashboard/edit-article?articleId=${article.id}`}><Edit2  size={15}/></Button>
                        <Button variant='flat' color='danger' isIconOnly ><Trash  size={15} /></Button>
                    </CardFooter>
                </Card>
            ))
        }
        </div>
    </div>
  )
}

export default AdminArticleComponent
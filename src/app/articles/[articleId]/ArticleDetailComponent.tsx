import MarkdownPreview from '@/components/shared/MarkdownPreview'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { shortMultiFormatDateString } from '@/lib/utils'
import { Article } from '@/supabase/articles'
import { getProfileById } from '@/supabase/user'
import { TimerIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ArticleDetailComponent = async ({ article }: { article: Article }) => {
    const { data: author } = await getProfileById(article.author! ?? "")
  return (
    <div className='flex flex-col gap-3'>
        <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 py-2">
                <TimerIcon size={15} className='' /> {article.minutes_read} mins read.
            </p>
            <p className="flex items-center gap-2 py-2 font-semibold">
               By {author?.first_name} {author?.last_name}
            </p>
        </div>
        <Separator />
        <div className="p-2 flex gap-1">
           {
            article.tags?.split(',').map(tag => (
                <Link key={tag} href={`/articles/tags?tag=${tag}`} className={buttonVariants({
                    variant: "link",
                    className: "hover:no-underline hover:bg-primary transition-all hover:text-gray-50"
                })}>
                    {tag}
                </Link>
            ))
           }
        </div>
        <Separator />
        <div className='read-only'>
            <MarkdownPreview content={article.content!} />
        </div>
        <div className="p-2">
            Last updated <b>{shortMultiFormatDateString(article.updated_at!)}</b> ago.
        </div>
    </div>
  ) 
}

export default ArticleDetailComponent
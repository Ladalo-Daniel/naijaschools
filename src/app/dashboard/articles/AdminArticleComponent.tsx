import MarkdownPreview from '@/components/shared/MarkdownPreview'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArticleList } from '@/supabase/articles'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Edit2, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Markdown from 'react-markdown'
import DeleteArticle from './DeleteArticle'
import ArticleReel from '@/components/shared/ArticleReel'

const AdminArticleComponent = ({ articles }: {articles: ArticleList}) => {
  return (
    <div className='flex flex-col gap-3'>
        <ArticleReel articles={articles} />
    </div>
  )
}

export default AdminArticleComponent
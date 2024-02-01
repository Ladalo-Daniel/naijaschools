import MaxWrapper from '@/components/MaxWrapper'
import React, { Suspense } from 'react'
import AdminArticleComponent from './AdminArticleComponent'
import { getArticles } from '@/supabase/articles'
import BackButton from '@/components/shared/BackButton'
import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const AdminAndStaffArticleView = async () => {
    const { data: articles, count } = await getArticles()
  return (
    <MaxWrapper className='flex bg-background max-w-7xl'>
        <BackButton />
        <Button as={Link} variant='flat' color='primary' className='w-fit' href='/dashboard/create-article'><Plus size={18} /> Add</Button>
        <h2 className="text-2xl py-2 text-primary">
            All Articles...({articles.length}).
        </h2>

        <section className='flex flex-col gap-3'>
            <Suspense fallback={<ArticleSkeleton />}>
              <AdminArticleComponent articles={articles} />
            </Suspense>
        </section>
    </MaxWrapper>
  ) 
}

export default AdminAndStaffArticleView
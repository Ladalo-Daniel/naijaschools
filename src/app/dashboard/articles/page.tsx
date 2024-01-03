import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import AdminArticleComponent from './AdminArticleComponent'
import { getArticles } from '@/supabase/articles'
import BackButton from '@/components/shared/BackButton'

const AdminAndStaffArticleView = async () => {
    const { data: articles, count } = await getArticles()
  return (
    <MaxWrapper className='flex bg-background max-w-7xl'>
        <BackButton />
        <h2 className="text-2xl py-2 text-primary">
            All Articles...({articles.length}).
        </h2>

        <section className='flex flex-col gap-3'>
            <AdminArticleComponent articles={articles} />
        </section>
    </MaxWrapper>
  )
}

export default AdminAndStaffArticleView
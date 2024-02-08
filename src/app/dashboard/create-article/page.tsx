import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import CreateArticleComponent from './components/CreateArticleComponent'
import { getUserSession } from '@/supabase/session'
import BackButton from '@/components/shared/BackButton'

const CreateArticlePage = async () => {
    const session = await getUserSession()

  return (
    <MaxWrapper className=' flex-1 bg-background max-w-4xl'>
        <BackButton />
        <h1 className=' text-2xl text-primary py-2'>Create Article</h1>
        <section className=' flex flex-col gap-3'>
            <CreateArticleComponent session={session!} />
        </section>
    </MaxWrapper>
  )
}

export default CreateArticlePage
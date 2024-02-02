import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import UpdateArticleComponent from './components/UpdateArticleComponent'
import { getUserSession } from '@/supabase/session'
import BackButton from '@/components/shared/BackButton'

const EditArticlePage = async () => {
  const session = await getUserSession()
  return (
    <MaxWrapper className='flex-1 bg-background p-4'>
      <BackButton />
        <h2 className="text-2xl py-2 text-primary">Edit Article</h2>

        <section>
            <UpdateArticleComponent session={session!} />
        </section>
    </MaxWrapper>
  )
}

export default EditArticlePage
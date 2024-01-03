import React from 'react'
import CreateArticleForm from './CreateArticleForm'
import { Session } from '@supabase/supabase-js'

const CreateArticleComponent = ({ session }: { session?: Pick<Session, 'user'> }) => {

  return (
    <div className=' flex flex-col gap-3'>
        <CreateArticleForm session={session} />
    </div>
  )
}

export default CreateArticleComponent
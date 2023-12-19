import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import AccountForm from '../account-form'
import MaxWrapper from '@/components/MaxWrapper'

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <MaxWrapper noOverflow className='flex flex-col gap-3 max-w-5xl'>
    <div className='space-y-5'>
      <h2 className="text-3xl font-medium text-primary">Complete your profile so we can serve you better.</h2>
    </div>
    <AccountForm session={session} />
  </MaxWrapper>
}
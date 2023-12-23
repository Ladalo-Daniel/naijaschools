import AccountForm from '../account-form'
import MaxWrapper from '@/components/MaxWrapper'
import { getUserSession } from '@/supabase/session'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'

export default async function Account() {
  const session = await getUserSession()
  const profile = await getProfile()
  if (profile?.data?.onboarded) redirect("/dashboard")
  if (!session?.user) redirect("/sign-up")

  return <MaxWrapper noOverflow className='flex flex-col gap-3 max-w-5xl'>
    <div className='max-w-[600px] mx-auto'>

    <div className='space-y-5 mb-4 mt-2'>
      <h2 className="text-3xl font-medium text-primary">Complete your profile so we can serve you better.</h2>
    </div>
    <AccountForm session={session} profile={profile?.data as any} />
    </div>
  </MaxWrapper>
}
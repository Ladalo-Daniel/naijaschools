import { getInstitutions } from '@/supabase/institutions'
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
  const {data: institutions} = await getInstitutions()

  return <MaxWrapper noOverflow className='flex flex-col gap-3 max-w-5xl'>
    <div className='max-w-[600px] mx-auto p-4 md:p-8 border rounded-md'>

    <div className='space-y-5 mb-4 mt-2'>
      <h2 className="text-2xl font-medium text-primary">You are almost set! <br />Complete your profile so we can serve you better.</h2>
    </div>
    <AccountForm session={session} profile={profile?.data as any} institutions={institutions}/>
    </div>
  </MaxWrapper>
}
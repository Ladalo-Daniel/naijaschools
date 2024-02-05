import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import CreateScholarshipForm from './CreateScholarshipForm'
import { getUserSession } from '@/supabase/session'
import { getScholarships } from '@/supabase/scholarships'
import ScholarshipReal from './ScholarshipReal'
import { getProfile } from '@/supabase/user'



const ScholarshipPage = async () => {
  const session = await getUserSession()
  const profile = await getProfile()


  const {data: scholarships} = await getScholarships()
  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
       <div className=' flex justify-between items-center flex-row'>
        <BackButton />
        {profile?.data?.role === "admin" &&
        (<CreateScholarshipForm session={session!} />)
        }
       </div>
        <h1 className="text-2xl py-2">Scholarships Updates</h1>
        <p>Explore available scholarships updates here seamlessly, anytime anyday, we care deeply about your success, Best of lurk!</p>
        <div>
          <ScholarshipReal scholarships={scholarships} profile={profile?.data!} />
        </div>
    </MaxWrapper>
  )
}

export default ScholarshipPage
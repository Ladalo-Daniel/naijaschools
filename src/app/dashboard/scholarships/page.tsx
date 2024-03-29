import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React, { Suspense } from 'react'
import CreateScholarshipForm from './components/CreateScholarshipForm'
import { getUserSession } from '@/supabase/session'
import { getScholarshipByRange, getScholarships } from '@/supabase/scholarships'
import ScholarshipReal from './components/ScholarshipReal'
import { getProfile } from '@/supabase/user'
import BackToTopButton from '../learn/components/BackToTopButton'
import MiniLoader from '@/components/MiniLoader'



const ScholarshipPage = async () => {
  const session = await getUserSession()
  const profile = await getProfile()


  const {data: scholarships} = await getScholarshipByRange(0, 99)

  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
       <div className=' flex justify-between items-center flex-row'>
        <BackButton />
        {profile?.data?.role === "admin" &&
        (<CreateScholarshipForm session={session!} />)
        }
       </div>
        <h1 className="text-2xl py-2">Scholarships Updates</h1>
        <p>Explore available scholarships updates here seamlessly, anytime anyday, we care deeply about your success, Best of luck!</p>
        <div>
          <Suspense fallback={<MiniLoader />}>
            <ScholarshipReal scholarships={scholarships} profile={profile?.data!} />
          </Suspense>
        </div>
    </MaxWrapper>
  )
}

export default ScholarshipPage
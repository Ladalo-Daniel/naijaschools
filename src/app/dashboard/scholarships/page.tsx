import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import CreateScholarshipForm from './CreateScholarshipForm'
import { getUserSession } from '@/supabase/session'
import { getScholarships } from '@/supabase/scholarships'
import ScholarshipReal from './ScholarshipReal'



const ScholarshipPage = async () => {
  const session = await getUserSession()


  const {data: scholarships} = await getScholarships()
  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
       <div className=' flex justify-between items-center flex-row'>
        <BackButton />
        <CreateScholarshipForm session={session!} />
       </div>
        <h1 className="text-2xl py-2">Scholarships Updates</h1>
        <p>Explore available scholarships updates here seamlessly, anytime anyday, we care deeply about your success, Best of lurk!</p>
        <div>
          <ScholarshipReal scholarships={scholarships} />
        </div>
    </MaxWrapper>
  )
}

export default ScholarshipPage
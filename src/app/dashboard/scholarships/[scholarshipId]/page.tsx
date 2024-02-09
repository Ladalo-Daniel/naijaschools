import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import React from 'react'
import ScholarshipDetailComponent from './ScholarshipDetailComponent'
import { getScholarshipById } from '@/supabase/scholarships'

type Props = {
    params: { scholarshipId: string }
}

const ScholarshipDetailPage = async ({params}: Props) => {

    const {scholarshipId} = params
    const scholarship = await getScholarshipById(scholarshipId);

  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
        <div className=' flex flex-col'>
            <BackButton />
            <ScholarshipDetailComponent scholarship={scholarship?.data} />
        </div>
    </MaxWrapper>
  )
}

export default ScholarshipDetailPage
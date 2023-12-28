import MaxWrapper from '@/components/MaxWrapper'
import { getInstitutionById } from '@/supabase/institutions'
import React from 'react'
import InstitutionDetailComponent from './InstitutionDetailComponent'
import BackButton from '@/components/shared/BackButton'
import { getCoursesByQuery } from '@/supabase/courses'

const InstitutionDetailPage = async ({ params }: { params: { institutionId: string } }) => {
    const { institutionId } = params
    const {data: institution} = await getInstitutionById(institutionId)
    const { data: courses } = await getCoursesByQuery("institution", institutionId)
  return (
    <MaxWrapper className='flex-1 bg-background'>
        <BackButton />
        <h1 className='text-2xl py-2 text-primary'>{institution.name}</h1>
        <p className='text-muted-foreground tracking-tighter'>{institution.description}</p>

        <InstitutionDetailComponent institution={institution} courses={courses} />
    </MaxWrapper>
  )
}

export default InstitutionDetailPage
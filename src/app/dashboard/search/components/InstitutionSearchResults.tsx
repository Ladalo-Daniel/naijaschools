import { Alert } from '@/components/ui/alert'
import { InstitutionList } from '@/supabase/institutions'
import Link from 'next/link'
import React from 'react'
import AISearchResponse from './AISearchResponse'

const InstitutionSearchResults = ({ institutions, query }: { institutions: InstitutionList, query?: string }) => {
    if (!institutions.length) return <div className='flex flex-col gap-3'>
        <Alert className="border-none">
            Your query <b>{query}</b> could not be found in our Institutions. You may proceed with Naijaschools AI.
        </Alert>
        <AISearchResponse query={query!} />
    </div>
  return (
    <div className='flex flex-col gap-3'>
        {
            institutions.map(institution => (
                <Link href={`/dashboard/s/institutions/${institution.id}`} key={institution.id} className='my-2 max-w-2xl border-b py-2'>
                    <h2 className='text-[18px] text-primary py-2'>{institution.name}</h2>
                    <p className="text-tiny tracking-tighter mt-1">{institution.description}</p>
                </Link>
            ))
        }
    </div>
  )
}

export default InstitutionSearchResults
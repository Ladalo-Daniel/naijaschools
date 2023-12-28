import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import InstitutionComponent from './InstitutionComponent'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'
import InstitutionTable from './InstitutionTable'
import { supabaseClient } from '@/supabase'
import BackButton from '@/components/shared/BackButton'

const InstitutionsPage = async () => {
    const profile = await getProfile()
    const institutions = await supabaseClient.from("institutions").select("*")
    if (profile?.data?.role === 'admin' || profile?.data?.role === 'staff') {
        // pass
    } else {
        return redirect('/dashboard')
    }

  return (
    <MaxWrapper className='bg-background max-w-7xl'>
        <BackButton />
        <h2 className="text-2xl py-4 pb-2">Institutions</h2>
        <section className='flex flex-col gap-3'>
            <InstitutionComponent />
            <InstitutionTable institutions={institutions.data as any} />
        </section>
    </MaxWrapper>
  )
}

export default InstitutionsPage
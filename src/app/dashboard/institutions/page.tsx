import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import InstitutionComponent from './InstitutionComponent'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'

const InstitutionsPage = async () => {
    const profile = await getProfile()
    if (profile?.data?.role === 'admin' || profile?.data?.role === 'staff') {
        // pass
    } else {
        return redirect('/dashboard')
    }

  return (
    <MaxWrapper>
        <h2 className="text-2xl py-4 pb-2">Institutions</h2>
        <section>
            <InstitutionComponent />
        </section>
    </MaxWrapper>
  )
}

export default InstitutionsPage
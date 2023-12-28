import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import { Settings2Icon } from 'lucide-react'
import { getProfile } from '@/supabase/user'
import Settings from './Settings'
import BackButton from '@/components/shared/BackButton'

const SettingsPage = async () => {
  const profile = await getProfile()
  return (
    <MaxWrapper className='flex-1'>
      <BackButton/>
      <h2 className='text-3xl space-y-4 flex items-center gap-3'><Settings2Icon /> Settings</h2>
      <div className="flex flex-col gap-3">
        <Settings profile={profile?.data as any}/>
      </div>
    </MaxWrapper>
  )
}

export default SettingsPage
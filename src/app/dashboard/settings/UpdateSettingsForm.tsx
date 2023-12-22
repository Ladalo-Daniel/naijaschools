"use client"

import React from 'react'
import updatePartialProfile from './UpdateSettings'
import { Database } from '@/types/supabase'
import { CardDescription} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SaveButton } from './SaveSettingsButton'
import { useFormState } from 'react-dom'
import { cn } from '@/lib/utils'

const initialState = {
    message: "",
    success: false
}  

const UpdateSettingsForm = ({ profile }: { profile: Database['public']['Tables']['users']['Row']}) => {
  const [state, formAction] = useFormState(updatePartialProfile, initialState)

  return (
    <form className='flex flex-col gap-3' action={formAction}>
        <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
            <span className='font-semibold flex-1'>First Name:</span>
            <Input name='first_name' required className='rounded-md border flex-1 dark:border-zinc-700 shadow' defaultValue={profile.first_name || ""}/>
        </CardDescription>
        <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
            <span className='font-semibold flex-1'>Last Name:</span>
            <Input name='last_name' required className='rounded-md border flex-1 dark:border-zinc-700 shadow' defaultValue={profile.last_name || ""}/>
        </CardDescription>
        <CardDescription className='flex justify-end md:items-center md:flex-row flex-col gap-2'>
            <SaveButton />
        </CardDescription>
        {state.message && <CardDescription aria-live="polite" className={cn('flex p-4 mt-2 mb-2 rounded-sm shadow justify-between md:items-center md:flex-row flex-col gap-2', {
            "bg-rose-100 text-rose-800": !state.success,
            "bg-green-100 text-green-800": state.success
        })}>
          {state?.message}
        </CardDescription>}
    </form>
  )
}

export default UpdateSettingsForm
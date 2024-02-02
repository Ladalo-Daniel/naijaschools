"use client"

import React, { useEffect } from 'react'
import updatePartialProfile from './UpdateSettings'
import { Database } from '@/types/supabase'
import { CardDescription} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SaveButton } from './SaveSettingsButton'
import { useFormState } from 'react-dom'
import { cn } from '@/lib/utils'
import { toast } from "sonner"

const initialState = {
    message: "",
    success: false
}  

const UpdateSettingsForm = ({ profile }: { profile: Database['public']['Tables']['users']['Row']}) => {
  const [state, formAction] = useFormState(updatePartialProfile, initialState)

  useEffect(() => {
    if (state?.message) {
      state?.success ? toast.success("Awwn, Tada! Your update was successful! Your profile is now in sync.") : 
      toast.error("Sorry, we could not update your profile by this time, but don't fret, let's give it another shot!")
    }
  }, [state])

  return (
    <form className='flex flex-col gap-3' action={formAction}>
        <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
            <span className='font-semibold flex-1'>First Name:</span>
            <Input name='first_name' required className='rounded-md border p-3.5 flex-1 dark:border-zinc-700 shadow' defaultValue={profile.first_name || ""}/>
        </CardDescription>
        <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
            <span className='font-semibold flex-1'>Last Name:</span>
            <Input name='last_name' required className='rounded-md border p-3.5 flex-1 dark:border-zinc-700 shadow' defaultValue={profile.last_name || ""}/>
        </CardDescription>
        <CardDescription className='flex justify-end md:items-center md:flex-row flex-col gap-2'>
            <SaveButton />
        </CardDescription>
    </form>
  )
}

export default UpdateSettingsForm
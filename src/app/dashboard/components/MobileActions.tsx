"use client"

import { User } from '@/supabase/user'
import { Avatar } from '@nextui-org/avatar'
import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button as NextButton } from '@nextui-org/button'
import Link from 'next/link'


const MobileActions = ({ profile }: {profile: User}) => {
  return (
    <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Avatar src={profile?.image_url || ""} name={profile?.username || ""} color='primary' className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent side={'top'} className='flex flex-col mx-auto items-center gap-3 flex-1 w-full'>
            <h2>Options</h2>
            <Separator />
            <Avatar src={profile?.image_url || ""} name={profile?.username || ""} size='lg' as={Link} href={'/dashboard/profile'} color='primary' className='cursor-pointer' />
            <form action={'/auth/signout'} method='post' className=''>
                <Button className={'items-center flex  gap-2'} variant={'outline'} size={'sm'} type='submit'>
                    <span>Sign Out</span>
                    <ArrowRight size={15} className='text-rose-500'/>
                </Button>
             </form>
             <NextButton as={Link} href='/dashboard/profile' variant='ghost' className='rounded-md'>
                Go to profile
             </NextButton>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileActions
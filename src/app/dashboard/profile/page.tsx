import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../database.types'
import MaxWrapper from '@/components/MaxWrapper'
import { Button } from "@/components/ui/button"
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
import AccountForm from '@/app/(auth)/account-form'
import { Pencil } from 'lucide-react'
import { getUserSession } from '@/supabase/session'

export default async function Profile() {
  const session = await getUserSession()

  return <MaxWrapper className='gap-3 max-w-5xl'>
    <div className='bg-background'>
    <div className='flex items-center flex-row justify-between flex-1'>
    <div>
      <h2 className="text-2xl font-medium text-primary">Your profile.</h2>
    </div>
      
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className='flex items-center gap-2 bg-background'>Edit <Pencil size={15} /></Button>
      </SheetTrigger>
      <SheetContent className='max-sm:w-full overflow-auto'>
        <SheetHeader className='flex flex-col gap-3 flex-1 items-start'>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription className='text-start'>
            Make changes to your profile here. Click save when {"you're"} done.
          </SheetDescription>
        </SheetHeader>
        <AccountForm session={session} isUpdate />
      </SheetContent>
      </Sheet>
    </div>
    </div>
  </MaxWrapper>
}
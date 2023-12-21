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
import { getProfile } from '@/supabase'
import ProfileCard from './ProfileCard'

export default async function Profile() {
  const session = await getUserSession()
  const profile = await getProfile()

  return <MaxWrapper className='gap-3 max-w-5xl bg-background'>
    <div className=''>
    <div className='flex items-center flex-row justify-between flex-1'>
    <div>
      <h2 className="text-2xl font-medium text-primary">Your profile.</h2>
    </div>
      
    {session?.user?.id === profile?.data?.id && <Sheet>
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
        <AccountForm session={session} isUpdate isDashboard profile={profile} />
      </SheetContent>
      </Sheet>}
    </div>
    <ProfileCard />
    </div>

  </MaxWrapper>
}
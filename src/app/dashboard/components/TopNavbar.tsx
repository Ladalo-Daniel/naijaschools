import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import MobileSidebar from './MobileSidebar'
import { User, getProfile } from '@/supabase/user'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import MobileActions from './MobileActions'
import { ModeToggle } from '@/components/ModeToggle'

const TopNavbar = async () => {
  const profile = await getProfile()
  return (
    <nav className='bg-gray-200 backdrop-blur-md bg-transparent px-2 flex md:px-10 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-10 h-16 border-b border-r-gray-600'>
      <Link href={'/'} className={'md:block hidden'}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>

      <MobileSidebar profile={profile?.data as User} />

      <div className='flex items-center gap-3'>
        <ModeToggle />
        <Link href={'/dashboard/profile'} className='hidden md:block'>
          <Avatar src={profile?.data?.image_url || ""} name={profile?.data?.username || ""} color='primary' />
        </Link>
        <form action={'/auth/signout'} method='post' className='hidden md:block'>
          <Button className={'items-center flex  gap-2'} variant={'outline'} size={'sm'} type='submit'>
            <span>Sign Out</span>
            <ArrowRight size={15} className='text-rose-500'/>
          </Button>
        </form>

        {/** ======= Mobile ====== */}
        <MobileActions profile={profile?.data as User} />
      </div>
    </nav>
  )
}

export default TopNavbar
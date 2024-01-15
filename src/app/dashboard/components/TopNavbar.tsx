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
import NavSearchBar from '../search/NavSearchBar'
import NotificationBadge from '../notifications/NotificationBadge'
import { NotificationList, getRecentNotifications } from '@/supabase/notifications'

const TopNavbar = async () => {
  const profile = await getProfile()
  const {data: notifications} = await getRecentNotifications(profile?.data?.username!)
  return (
    <nav className='bg-gray-200 backdrop-blur-md bg-transparent px-2 flex md:px-10 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-40 h-16 border-b border-r-gray-600'>
      <Link href={'/'} className={'md:block hidden'}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>

      <MobileSidebar profile={profile?.data as User} />

      <div className="justify-between md:hidden items-center gap-4">
        <Link href={'/'} passHref>
          <Image 
            src={'/logos/logo.png'}
            width={500}
            height={500}
            quality={100}
            alt='Naijaschools logo'
            className='w-6 h-6 mr-14'
          />
        </Link>
      </div>

      <div className="justify-between hidden items-center gap-4">
        <Button>All</Button>
        <Button>For you</Button>
      </div>


      <div className='flex items-center md:gap-3 gap-2'>
        <NavSearchBar />
        <NotificationBadge user={ profile?.data as User } notifications={notifications as NotificationList}/>
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
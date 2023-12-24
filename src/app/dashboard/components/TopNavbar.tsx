import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import MobileSidebar from './MobileSidebar'
import { User, getProfile } from '@/supabase/user'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const TopNavbar = async () => {
  const profile = await getProfile()
  return (
    <nav className='bg-gray-200 backdrop-blur-md bg-transparent px-2 flex md:px-10 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-10 h-16 border-b border-r-gray-600'>
      <Link href={'/'} className={'md:block hidden'}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>

      <MobileSidebar profile={profile?.data as User} />

      <div className='flex items-center gap-3'>
        <Link href={'/dashboard/profile'}>
          <Avatar src={profile?.data?.image_url || ""} name={profile?.data?.username || ""} color='primary' />
        </Link>
        <form action={'/auth/signout'} method='post' className='hidden md:block'>
          <Button className={'mr-2'} variant={'ghost'} size={'sm'} type='submit'>Sign Out <DoubleArrowRightIcon height={15} width={15} className=''/></Button>
        </form>
      </div>
    </nav>
  )
}

export default TopNavbar
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import MobileSidebar from './MobileSidebar'

const TopNavbar = () => {
  
  return (
    <nav className='bg-gray-200 backdrop-blur-md bg-transparent px-2 flex md:px-10 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-10 h-16 border-b border-r-gray-600'>
      <Link href={'/'} className={'md:block hidden'}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>

      <MobileSidebar />

      <div className='flex items-center gap-3'>
        <Avatar src='/images/human.png' isBordered color='primary' />
        <Button variant='faded' className='hidden' color='primary'>Logout</Button>
        <Button variant='faded' className='hidden' color='primary'>Admin</Button>
      </div>
    </nav>
  )
}

export default TopNavbar
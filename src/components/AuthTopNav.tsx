import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import { buttonVariants } from './ui/button'

const AuthTopNav = () => {
  return (
    <nav className='bg-gray-200 backdrop-blur-md bg-transparent px-2 flex md:px-10 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-10 h-14 border-b border-r-gray-600'>
      <Link href={'/'} className={''}>
        <Image src={'/images/logt2.png'} width={100} height={30} alt="logo" />
      </Link>
      <div className='flex items-center gap-3'>
        {/* <Avatar src='/images/human.png' isBordered hidden color='primary' /> */}
        <Button variant='faded' className={buttonVariants({variant: "link"})} color='primary'>Log In</Button>
        <Button variant='faded' className='' color='danger'>Log Out</Button>
      </div>
    </nav>
  )
}

export default AuthTopNav
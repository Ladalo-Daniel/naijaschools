import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar } from '@nextui-org/avatar'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

const AuthTopNav = ({ isHome }: { isHome?: boolean}) => {
  return (
    <nav className={cn('bg-gray-100 backdrop-blur-md bg-transparent px-2 md:px-16 items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-10 h-16 border-b border-r-gray-600', {
      "flex bg-white dark:bg-black": isHome,
      "hidden": !isHome
    })}>
      <Link href={'/'} className={''}>
        <Image src={'/images/logt2.png'} width={100} height={100} alt="logo" />
      </Link>
      <div className='flex items-center gap-3'>
        {/* <Avatar src='/images/human.png' isBordered hidden color='primary' /> */}
        <Link className={buttonVariants({variant: "link"})} href={'/sign-up'} color='primary'>Log In</Link>
        {/* <Button variant='faded' className='' color='danger'>Log Out</Button> */}
      </div>
    </nav>
  )
}

export default AuthTopNav
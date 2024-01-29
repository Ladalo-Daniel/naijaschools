import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { getUserSession } from '@/supabase/session'
import SignOut from './shared/SignOut'
import { NavMenu } from './NavigationMenu'
import { ModeToggle } from './ModeToggle'
import { Button } from '@nextui-org/button'

const AuthTopNav = async ({ isHome }: { isHome?: boolean}) => {
  const session = await getUserSession()
  return (
    <nav className={cn('bg-white backdrop-blur-md bg-transparent px-2 md:px-16 shadow-sm items-center justify-between bg-gradient-to-tr fixed top-0 w-full z-30 h-16 border-b border-r-gray-600', {
      "flex light:bg-white dark:bg-black bg-transparent backdrop-blur-lg": isHome,
      "hidden": !isHome
    })}>
      <Link href={'/'} className={'inline-block'}>
        <Image src={'/logos/logo.png'} width={30} height={30} quality={100} alt="logo" />
      </Link>
      <div className='flex items-center gap-3'>
        <NavMenu />
        {
          session?.user ? (
            <div className='flex items-center gap-2'>
              <Link className={buttonVariants({variant: "link", className: "no-underline hover:bg-primary hover:transition-all border rounded-md hover:text-foreground hover:no-underline text-sm"})} href={'/dashboard'}>Dashboard</Link>
              <SignOut />
            </div>
          ): (
            <>
            <ModeToggle />
              <Button as={Link} className={'text-sm'} href={'/sign-up'} variant='bordered' color='primary'>Log In</Button>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default AuthTopNav
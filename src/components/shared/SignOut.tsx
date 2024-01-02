import { ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const SignOut = async () => {
  return (
    <form action={'/auth/signout'} method='post'>
        <Button className={'mr-2'} variant={'default'} type='submit'>Sign Out <ArrowRightIcon size={15}/></Button>
    </form>
  )
}

export default SignOut
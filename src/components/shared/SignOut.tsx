import { ArrowRightIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Button as NextButton } from '@nextui-org/button'

const SignOut = async ({content}: { content?: string | React.JSX.Element | boolean }) => {
  return (
    <form action={'/auth/signout'} method='post'>
        {
          content ? (
            <NextButton variant='faded' color='danger' endContent={<ArrowRightIcon size={15} />} className='bg-background border-rose-500' type="submit">{content}</NextButton>
          ) :
          <Button className={'mr-2'} variant={'default'} type='submit'>Sign Out <ArrowRightIcon size={15}/></Button>}
    </form>
  )
}

export default SignOut
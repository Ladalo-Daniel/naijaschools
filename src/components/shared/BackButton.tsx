import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  return (
    <Button className='bg-transparent flex gap-1' variant={'ghost'}>
        <ArrowLeft size={15} />
        <span className='md:block hidden'>Back</span>
    </Button>
  )
}

export default BackButton
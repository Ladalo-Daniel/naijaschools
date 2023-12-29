'use client'

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  try {
    if (window.history.length === 0) return
  } catch (error) {
    console.error(error)
  }
  return (
    <div className='my-2'>
      <Button 
        className='bg-transparent flex gap-1 md:gap-2.5' 
        variant={'outline'}
        onClick={() => window?.history?.back()}
      >
      <ArrowLeft size={15} />
      <span className='md:block hidden'>Back</span>
    </Button>
    </div>
  )
}

export default BackButton
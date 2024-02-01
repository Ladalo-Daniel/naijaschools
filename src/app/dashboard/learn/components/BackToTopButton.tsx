'use client'

import { Button } from '@nextui-org/button'
import { ArrowUp } from 'lucide-react'
import React from 'react'

const BackToTopButton = () => {
  return (
    <Button
        isIconOnly
        startContent={
            <ArrowUp />
        }
        color='primary'
        variant='solid'
        className={' '}
        onClick={() => {
            scrollTo({
                behavior: "smooth",
                top: 0
            })
        }}
    ></Button>
  )
}

export default BackToTopButton
'use client'

import { Button } from '@nextui-org/button'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Button
        isIconOnly
        startContent={
            <ArrowUp />
        }
        color='primary'
        variant='solid'
        className={isVisible ? 'flex animate-bounce' : 'hidden animate'}
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
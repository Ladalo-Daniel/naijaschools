import { Button } from '@nextui-org/button'
import Link from 'next/link'
import React from 'react'

type Pro_IntroProps = {}

const Pro_IntroSection: React.FC<Pro_IntroProps> = () => {
  return (
    <section className='flex py-20 flex-col gap-3'>
        <div className="flex md:flex-row justify-between gap-4 flex-col">
            <div className="flex flex-col gap-3">
                <h2 className="text-3xl py-3">Welcome to Naijaschools, your ultimate encyclopedia of knowledge!</h2>

                <Button className='w-fit' as={Link} href='#' size='lg' variant='solid' color='secondary'>Get Started</Button>
            </div>
        </div>
    </section>
  )
}

export default Pro_IntroSection
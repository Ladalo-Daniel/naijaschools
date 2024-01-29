import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MaxWrapper from '../MaxWrapper'

type Pro_IntroProps = {}

const Pro_IntroSection: React.FC<Pro_IntroProps> = () => {
  return (
    <MaxWrapper className='flex py-20 flex-col gap-3 max-w-7xl'>
        <div className="flex md:flex-row justify-between gap-4 flex-col-reverse">
            <div className="flex flex-col gap-3 flex-1">
                <h2 className="text-3xl py-3">Welcome to Naijaschools, your ultimate encyclopedia of knowledge!</h2>

                <p className="tracking-tighter py-3 text-muted-foreground">Think of us as that <span className="text-primary">ocean  of knowledge</span>, where you can find all you need to thrust through the seemingly difficult atmosphere of academics in Nigerian institutions.</p>

                <Button 
                    className='w-fit hover:transition-all hover:opacity-60 hover:animate-in mt-10' 
                    as={Link} 
                    href='#' size='lg' variant='solid' color='primary'>Get Started</Button>
            </div>
            <div className="flex-1">
                <Image
                    src={'/svg/welcome.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    alt='Gif of welcome'
                    className='' 
                />
            </div>
        </div>
    </MaxWrapper>
  )
}

export default Pro_IntroSection
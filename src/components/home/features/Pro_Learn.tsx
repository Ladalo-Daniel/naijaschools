import MaxWrapper from '@/components/MaxWrapper'
import { Button } from '@nextui-org/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Pro_LearnProps {}

const Pro_Learn: React.FC<Pro_LearnProps> = () => {
  return (
    <MaxWrapper className='flex py-20 flex-col gap-3 max-w-7xl'>
        <div className="flex md:flex-row justify-between gap-4 flex-col-reverse">
            <div className="flex flex-col gap-3 flex-1">
                <h2 className="text-3xl py-3">Learn and enjoy our follow-up guides.</h2>

                <p className="tracking-tighter py-3 text-muted-foreground">Learn at your own pace on the <span className="text-primary">Naijaschools platform</span>, Choose any course you wish to learn and your desired topic!</p>

                <Button 
                    className='w-fit hover:transition-all hover:opacity-60 hover:animate-in mt-10' 
                    as={Link} 
                    href='/dashboard/learn' 
                    size='lg' 
                    variant='bordered' 
                    color='primary' 
                    endContent={<ArrowRight size={15} />}
                >Get Started</Button>
                <Image
                    src="/images/home-pic1.jpg"
                    width={500}
                    height={500}
                    quality={100}
                    alt=''
                    className=' rounded-lg mt-5' 
                />
            </div>
            <div className="flex-1 flex flex-col">
                <Image
                    src={'/svg/learn.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    alt=''
                    className='' 
                />
                <p className="tracking-tighter py-1 text-muted-foreground">Dive into the depths of our virtual ocean, where the currents of knowledge flow seamlessly, carrying with them the insights, resources, and guidance needed to conquer the academic challenges that lie ahead.
                </p>
            </div>
        </div>
    </MaxWrapper>
  )
}

export default Pro_Learn
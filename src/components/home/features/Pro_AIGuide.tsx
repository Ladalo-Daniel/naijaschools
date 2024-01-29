import MaxWrapper from '@/components/MaxWrapper'
import { Button } from '@nextui-org/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Pro_AIGuideProps {}

const Pro_AIGuide: React.FC<Pro_AIGuideProps> = () => {
  return (
    <MaxWrapper className='flex py-20 flex-col gap-3 bg-secondary max-w-7xl'>
        <div className="flex md:flex-row justify-between gap-4 flex-col-reverse">
            <div className="flex flex-col gap-3 flex-1">
                <h2 className="text-3xl py-3">We also provide generative-AI-rich features at nearly every point.</h2>

                <p className="tracking-tighter py-3 text-muted-foreground">Learn in an amazing way with our AI-features wired up to our <span className="text-primary">quiz, search and broadcast functionalities</span>, We also provide a dedicated space for having a completely personalized chat with our AI!</p>

                <Button 
                    className='w-fit hover:transition-all hover:opacity-60 hover:animate-in mt-10' 
                    as={Link} 
                    href='/dashboard/chat' 
                    size='lg' 
                    variant='bordered' 
                    color='primary' 
                    endContent={<ArrowRight size={15} />}
                >Get Started</Button>
            </div>
            <div className="flex-1">
                <Image
                    src={'/svg/robot.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    alt=''
                    className='' 
                />
            </div>
        </div>
    </MaxWrapper>
  )
}

export default Pro_AIGuide
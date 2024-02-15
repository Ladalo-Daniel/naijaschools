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
                <Image
                    src="/images/home-pic2.jpg"
                    width={500}
                    height={500}
                    quality={100}
                    alt=''
                    className='rounded-lg' 
                />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <Image
                    src={'/svg/robot.svg'}
                    width={500}
                    height={500}
                    quality={100}
                    alt=''
                    className='' 
                />
                <div className=' flex flex-col gap-2'>
                <h2 className="text-2xl py-3">Naijaschools,where every wave of information propels you closer to your academic goals.</h2>

                <p className="tracking-tighter py-3 text-muted-foreground">Our platform is not just a repository of facts but a dynamic ecosystem where the tides of learning ebb and flow, ensuring that you stay afloat in the ever-changing landscape of education.</p>
                </div>
            </div>
        </div>
    </MaxWrapper>
  )
}

export default Pro_AIGuide
import MaxWrapper from '@/components/MaxWrapper'
import { Button } from '@nextui-org/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Pro_QuizProps {}

const Pro_Quiz: React.FC<Pro_QuizProps> = () => {
  return (
    <MaxWrapper className='flex py-20 flex-col gap-3 bg-secondary max-w-7xl'>
        <div className="flex md:flex-row justify-between gap-4 flex-col-reverse">
            <div className="flex flex-col gap-3 flex-1">
                <h2 className="text-3xl py-3">Take Interactive Quizzes!</h2>

                <p className="tracking-tighter py-3 text-muted-foreground">Our pool of interactive quiz questions are feature-rich. They are tailored to your desired <span className="text-primary">institution and course</span>. We also provide follow-up guides for our quizzes. Name it while we load it!</p>

                <Button 
                    className='w-fit hover:transition-all hover:opacity-60 hover:animate-in mt-10' 
                    as={Link} 
                    href='/dashboard/quiz' 
                    size='lg' 
                    variant='bordered' 
                    color='primary' 
                    endContent={<ArrowRight size={15} />}
                >Get Started</Button>
            </div>
            <div className="flex-1">
                <Image
                    src={'/svg/think.svg'}
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

export default Pro_Quiz
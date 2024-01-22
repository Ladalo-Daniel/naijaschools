'use client'

import { Button } from '@nextui-org/button'
import { Rocket } from 'lucide-react'
import React from 'react'

const QOnboard = ({ setQOnboard }: { setQOnboard: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className='flex flex-col gap-4'>
        <h2 className="text-2xl text-primary py-2">
            Hi there! Your quiz questions are ready for this course.
        </h2>
        <h2 className="text-xl font-bold">
            Instructions and guides for this quiz. You are just a step away from starting this Quiz!
        </h2>

        <ul className="flex flex-col gap-3 tracking-tighter">
            <li>
                Each question has an average of <span className="text-primary">45 seconds</span> to be answered.
            </li>
            <li>You are enjoined to focus on every knitty gritty detail to obtain good scores.</li>
            <li>Our AI support should not be abused. You do not have to use the AI utility when you are attempting a full-blown quiz to test your abilities.
            </li>
            <li>When you are ready to kick off on this quiz, click on &quot;Proceed&quot;.</li>

        </ul>

        <div className="flex">
            <Button variant='flat' color='primary' className='my-3 text-xl' endContent={<Rocket />} onClick={() => setQOnboard(false)}>Proceed!</Button>
        </div>
    </div>
  )
}

export default QOnboard
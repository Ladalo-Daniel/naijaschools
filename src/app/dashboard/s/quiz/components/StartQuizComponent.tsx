import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { ArrowRightCircleIcon, SmileIcon } from 'lucide-react'
import { Card, CardHeader } from '@nextui-org/card'

import { User } from '@/supabase/user'
import { Institution } from '@/supabase/institutions'
import Link from 'next/link'


const StartQuizComponent = ({ profile, institution }: { profile: User, institution: Institution }) => {
  return (
    <div className='flex flex-col gap-3'>
        <p className='max-sm:tracking-tight'>Hi <span className="text-primary">{profile?.username}</span>!, Welcome to today&#39;s episode... <br />
        So tell us, how&#39;d you love to start this quiz? <br />
        Select an option from below to start.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Learn More</AccordionTrigger>
            <AccordionContent>
              You remember when you were registering? <br />
              Selecting <span className="text-primary">My Institution</span> would automatically attach your school <span className="text-primary">{institution?.name}</span> to the quiz - your registered institution.
              <br />
              There you would see all the courses in <span className="text-primary">{institution?.name}</span> to choose from. <br />
              However, if you choose <span className="text-primary">Other  Institutions</span>, you&#39;d be open to a variety of institutions and their courses.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="recommendation">
            <AccordionTrigger>Recommended?</AccordionTrigger>
            <AccordionContent>
              We recommend you start out with your registered institution, however, if you feel comfortable with other ones and you really want to give them a shot, why waste the ingenuity? <SmileIcon className='inline-block text-primary' />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className='flex flex-wrap gap-4 md:flex-row flex-col py-2'>
            <Card key={'lm'} className='w-72 min-h-44 flex flex-col gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out' as={Link} href={`/dashboard/s/quiz/start?institution=${institution?.id}`}>
                <CardHeader className='flex justify-between items-center'>
                    <h2 className='text-[18px] tracking-tighter'>
                        My Institution
                    </h2>
                    <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
                </CardHeader>
            </Card>
            <Card key={'other'} className='w-72 min-h-44 flex flex-col gap-3 p-4 max-sm:w-full hover:opacity-60 hover:transition-all hover:animate-out' as={Link} href={`/dashboard/s/quiz/start`}>
                <CardHeader className='flex justify-between items-center'>
                    <h2 className='text-[18px] tracking-tighter'>
                        Other Institutions
                    </h2>
                    <ArrowRightCircleIcon size={15} className='text-primary hover:animate-pulse' />
                </CardHeader>
            </Card>
        </div>

    </div>
  )
}

export default StartQuizComponent
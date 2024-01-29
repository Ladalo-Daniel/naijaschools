import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader,  } from '@nextui-org/card'
import { BookCheckIcon, HelpingHand, LucideSparkles, SettingsIcon } from 'lucide-react'
import React from 'react'
import MaxWrapper from '../MaxWrapper'


const testimonials = [
    {
        name: "Ann",
        description: "@Naijaschools is a game changer for universities. It's quiz interface has become my addiction lol.",
        avatar: '/images/human.png'
    },
    {   
        name: "Vhickie",
        description: "I will always recommend @naijaschools. It has huge potentials.",
        avatar: '/images/bg.jpg'
    },
    {   
        name: "Daniel",
        description: "I was always the lazy type when it came to studying for test and exams. It got entirely different when I stormed on @naijaschools.",
        avatar: '/images/sign-up.jpg'
    },
    {   
        name: "Nehemiah",
        description: "As a developer at @naijaschools, I must say that this engineering project has been one of the most fulfilling for me.",
        avatar: '/images/sign_up.jpg'
    },
]

const TestimonialsSection = () => {
  return (
    <MaxWrapper className='max-w-7xl'>
        <section className='flex flex-col gap-4 p-4 py-16'>
        <p className={"text-primary hover:underline py-2 transition-all hidden"}>#testimonials</p>
        <h2 className="text-2xl hover:underline py-2 transition-all text-primary">Testimonials</h2>
        <div className='flex flex-wrap gap-4'>
        {
            testimonials?.map(testimonial => (
                <Card
                    className='bg-transparent max-w-[500px] hover:opacity-60 hover:animate-in cursor-pointer max-sm:w-full p-4 bg-gradient-to-t backdrop-blur flex gap-2'
                    key={testimonial?.name}
                    >
                    <CardHeader className='flex items-start justify-start'>
                        <div className='w-[55px]'>
                        <Avatar src={testimonial.avatar} alt={testimonial.name} size='lg'/>
                        </div>
                        <CardBody className='flex flex-col gap-2 ml-2 -mt-3'>
                        <h2 className='text-primary py-2 pt-0'> {testimonial.name} </h2>
                        <p className='py-2'> {testimonial.description} </p>
                        </CardBody>
                    </CardHeader>
                </Card>
            ))
        }
        </div>
    </section>
    </MaxWrapper>
  )
}

export default TestimonialsSection
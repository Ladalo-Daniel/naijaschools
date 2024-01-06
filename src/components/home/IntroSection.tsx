'use client'

import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

import { motion } from 'framer-motion'
import { Session } from '@supabase/supabase-js'

const IntroSection = ({ session }: { session: Session }) => {
  return (
    <section className="flex flex-col gap-4 p-4 py-16 bg-background from-green-950 to-zinc-800 mt-4"
    >
      <p className={"text-primary hover:underline py-2 transition-all hidden"}>#intro</p>
      <h2 className="text-5xl font-bold py-2.5 text-primary hover:underline transition-all">Welcome to <span className="text-warning-800">Naijaschools</span>;</h2>
      <>
        <motion.h2 
          className="text-4xl text-primary py-3"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          >
          Driving Impact for Nigerian Students <br />
          through flexible online learning Experience.
        </motion.h2>
      </>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} 
        className='animate-accordion-up text-muted-foreground tracking-tighter py-2'
        >Our goal is to maximize the educational confidence of Nigerian Students by equipping them with the neccessary knowledge to help them have fun while studying and to take advantage of AI to easily get the best knowledge in a fun and interactive way. <br />
        This will help them connect easily with other students from diverse Institutions which will foster community growth and socialization through learning. 
      </motion.div>

      <div className="flex max-sm:flex-col gap-4 flex-wrap py-4">
        {
          session?.user ? (
            <>
            <Link className={buttonVariants({
              size: "lg",
              className: "rounded-full"
            })} href={'/dashboard'}>Go to dashboard</Link>
            </>
          ): (
            <>
            <Link className={buttonVariants({
              size: "lg",
              className: "rounded-full"
            })} href={'/sign-up'}>Get Started</Link>
            </>
          )
        }
      </div>
    </section>
  )
}

export default IntroSection
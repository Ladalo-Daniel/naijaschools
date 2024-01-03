import MaxWrapper from '@/components/MaxWrapper'
import React from 'react'
import StartQuizComponent from './StartQuizComponent'
import { User, getProfile } from '@/supabase/user'
import { Institution, getInstitutionById } from '@/supabase/institutions'
import BackButton from '@/components/shared/BackButton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRightCircleIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

const QuizPage = async () => {
  const profile = await getProfile()
  if (!profile?.data?.id) return redirect('/')

  const institution = await getInstitutionById(profile?.data?.institution as string)
  return (
    <MaxWrapper className='max-w-5xl bg-background p-2'>
      <BackButton />
      <h2 className="text-2xl tracking-tighter py-2">Start Quiz</h2>
      <p>
        <Link 
          href={'/dashboard/s/quiz/history'}
          className={cn(buttonVariants({
          variant: "link"
        }), "flex-1 p-0 gap-2")} >Go to quiz History <ArrowRightCircleIcon size={15} className='ml-1'/></Link>
      </p>

      <section className='flex flex-col gap-3'>
        <StartQuizComponent profile={profile?.data as User} institution={ institution?.data as Institution} />
      </section>
    </MaxWrapper>
  )
}

export default QuizPage
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const QuestionComponent = () => {
  return (
    <div>
        <Link href={'/dashboard/questions/new'} className={cn(buttonVariants({
            variant: "link"
        }))}>New Question</Link>
        <section></section>
    </div>
  )
}

export default QuestionComponent
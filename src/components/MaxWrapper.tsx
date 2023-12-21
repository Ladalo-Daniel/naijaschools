import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWrapper = ({ children, className, noOverflow }: { children: ReactNode, className?: string, noOverflow?: boolean}) => {
  return (
<<<<<<< HEAD
    <div className={cn('py-20 max-w-5xl mx-auto min-h-screen h-full common-container bg-background', className)}>
=======
    <div className={cn('py-16 max-w-5xl px-4 min-h-screen h-full mx-auto', className, {
      "common-container": !noOverflow,
    })}>
>>>>>>> 0662fdc3a59c2f32d55952b23011ef323d8e3923
      {children}
    </div>
  )
}

export default MaxWrapper
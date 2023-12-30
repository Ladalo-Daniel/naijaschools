import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWrapper = ({ children, className, noOverflow }: { children: ReactNode, className?: string, noOverflow?: boolean}) => {
  return (
    <div className={cn('md:py-16 p-6 max-w-5xl px-4 min-h-screen h-full mx-auto', className, {
      "common-container": !noOverflow,
    })}>
      {children}
    </div>
  )
}

export default MaxWrapper
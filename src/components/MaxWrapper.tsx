import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWrapper = ({ children, className, noOverflow }: { children: ReactNode, className?: string, noOverflow?: boolean}) => {
  return (
    <div className={cn('py-20 max-w-5xl mx-auto', className, {
      "common-container": !noOverflow,
    })}>
      {children}
    </div>
  )
}

export default MaxWrapper
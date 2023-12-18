import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWrapper = ({ children, className }: { children: ReactNode, className?: string}) => {
  return (
    <div className={cn('py-20 max-w-5xl mx-auto common-container', className)}>
      {children}
    </div>
  )
}

export default MaxWrapper
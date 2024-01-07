'use client'
 
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
 
export function SaveButton({onClick}: {onClick?: () => void}) {
  const { pending } = useFormStatus()
 
  return (
    <Button type='submit' onClick={onClick} variant={'default'} disabled={pending} aria-disabled={pending}>Sav{pending ? "ing..." : 'e'}</Button>
  )
}
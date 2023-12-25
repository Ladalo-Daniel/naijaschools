'use client'
 
import { Button, buttonVariants } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
    
export default function DeleteButton() {
    const { pending } = useFormStatus()
    
    return (
        <Button type="submit" className={buttonVariants({
            variant: "destructive",
            className: "flex items-center gap-2"
        })}>{pending ? "Deleting..." : "Continue"} {pending && <Loader2 className="animate-spin" />}</Button>
    )
}
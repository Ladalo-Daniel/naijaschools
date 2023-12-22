import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Database } from '@/types/supabase'
import UpdateSettingsForm from './UpdateSettingsForm'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'

const Settings = ({ profile }: { profile: Database['public']['Tables']['users']['Row']}) => {
  return (
    <div className='flex flex-col gap-3 shadow-sm'>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    Account Information
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Username:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.username!}</span>
                </CardDescription>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Email:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.email!}</span>
                </CardDescription>
            </CardContent>
        </Card>

        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-3'>
                <CardTitle>
                    Profile Information
                    <Separator className='dark:bg-zinc-700 mt-4' />
                </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateSettingsForm profile={profile} />
            </CardContent>
        </Card>

        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-3'>
                <CardTitle>
                    Accessability
                    <Separator className='dark:bg-zinc-700 mt-4' />
                </CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeToggle />
            </CardContent>
        </Card>
        
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-3'>
                <CardTitle>
                    Sign Out
                    <Separator className='dark:bg-zinc-700 mt-4' />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={'/auth/signout'} method='post'>
                  <Button className={'mr-2'} type='submit'>Sign Out <ArrowRightIcon size={20}/></Button>
                </form>
            </CardContent>
        </Card>

    </div>
  )
}

export default Settings
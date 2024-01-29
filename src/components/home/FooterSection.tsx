import { side_bar_links } from '@/lib/utility'
import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import MaxWrapper from '../MaxWrapper'

const auth_links = [
    {
        href: "/sign-up",
        tooltip: "Log in",
    },
    {
        href: "/sign-up",
        tooltip: "Sign up",
    },
    {
        href: "/dashboard",
        tooltip: "Dashboard",
    },
]

const contact_links = [
    {
        href: '/about',
        tooltip: 'About',
    },
    {
        href: '/how-to',
        tooltip: 'How to',
    },
    {
        href: '/learn-more',
        tooltip: 'Learn More',
    },
    {
        href: '/docs',
        tooltip: 'Docs',
    },
]

const FooterSection = () => {
  return (
    <MaxWrapper className='max-w-7xl'>
        <footer className='flex flex-col gap-3'>
        <Separator />
        <h2 className="text-2xl hover:underline py-2 transition-all text-primary max-sm:text-center">Naijaschools</h2>
        <section className='flex flex-col md:flex-row gap-3 py-3 justify-between max-sm:items-center max-sm:text-center'>
            <div className="flex flex-col gap-2">
                {
                    auth_links.map(link => (
                        <Link href={link.href} key={link.tooltip} className={"hover:underline py-2 transition-all text-primary"}>{link.tooltip}</Link>
                    ))
                }
            </div>
            <div className="flex flex-col gap-2">
                {
                    side_bar_links.map(link => (
                        <Link href={link.href} key={link.tooltip} className={cn("hover:underline py-2 transition-all text-primary", {
                            "hidden": link.hidden
                        })} >{link.tooltip}</Link>
                    ))
                }
            </div>
            <div className="flex flex-col gap-2">
                {
                    contact_links.map(link => (
                        <Link href={link.href} key={link.tooltip} className={"hover:underline py-2 transition-all text-primary"} >{link.tooltip}</Link>
                    ))
                }
            </div>
        </section>
        <Separator />
        <p className="text-muted-foreground tracking-tighter py-2 max-sm:text-center">&copy;Naijaschools Inc. @Bala Mathias && Ladalo</p>
    </footer>
    </MaxWrapper>
  )
}

export default FooterSection
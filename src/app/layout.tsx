import type { Metadata } from 'next'
import { Inter, Jost, Fira_Code } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
const jost = Jost({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Naijaschools',
  description: 'A educational refactoring project built to enhance the ultimate capabiities of Nigerian students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={cn(jost.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

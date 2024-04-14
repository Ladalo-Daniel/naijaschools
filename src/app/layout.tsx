import type { Metadata } from 'next'
import { Inter, Jost, Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '@/components/Providers'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
const jost = Jost({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
const open_sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const helvetica = localFont({
  src: '../../fonts/helvetica/Helvetica.ttf',
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
      <body className={cn(helvetica.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { getProfile } from './supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const profile = await getProfile()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  if (user?.id && req.nextUrl.pathname === '/sign-up') {
    if (profile?.data?.onboarded === true ) return NextResponse.redirect(new URL('/dashboard', req.url))
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/sign-up', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
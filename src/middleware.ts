import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { getProfile } from './supabase/user'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const profile = await getProfile()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user?.id && req.nextUrl.pathname === '/sign-up') {
    if (profile?.data?.onboarded === true && user?.id ) return NextResponse.redirect(new URL('/dashboard', req.url))
    return NextResponse.redirect(new URL('/account', req.url))
  }

  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/sign-up', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
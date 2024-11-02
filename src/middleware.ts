import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { adminMiddleware } from './lib/middleware/admin'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path.startsWith('/admin')) {
    return adminMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose-browser-runtime'

export async function middleware(request: NextRequest) {
  console.log('Middleware called for path:', request.nextUrl.pathname)
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    console.log('No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    await jose.jwtVerify(token, secret)
    console.log('Token verified successfully')
    return NextResponse.next()
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}


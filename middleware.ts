import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifyJWT(token: string, secret: string): Promise<boolean> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.')
    const header = JSON.parse(atob(encodedHeader))
    const payload = JSON.parse(atob(encodedPayload))

    // Check if the token has expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false
    }

    const dataToVerify = `${encodedHeader}.${encodedPayload}`
    const signature = atob(encodedSignature)

    const encoder = new TextEncoder()
    const secretBuffer = encoder.encode(secret)
    const dataBuffer = encoder.encode(dataToVerify)

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secretBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      new Uint8Array(signature.split('').map(c => c.charCodeAt(0))),
      dataBuffer
    )

    return isValid
  } catch (error) {
    console.error('JWT verification error:', error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  console.log('Middleware called for path:', request.nextUrl.pathname)
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    console.log('No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const isValid = await verifyJWT(token, process.env.JWT_SECRET!)
    if (isValid) {
      console.log('Token verified successfully')
      return NextResponse.next()
    } else {
      console.log('Invalid token, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}


import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function signJWT(payload: { userId: string; exp: number }, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`
  
  const encoder = new TextEncoder()
  const secretBuffer = encoder.encode(secret)
  const dataBuffer = encoder.encode(dataToSign)
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    secretBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    dataBuffer
  )
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
  return `${dataToSign}.${encodedSignature}`
}

export async function POST(req: NextRequest) {
  console.log('Login attempt started')
  try {
    const { email, password } = await req.json()
    console.log(`Login attempt for email: ${email}`)

    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      console.log(`User not found for email: ${email}`)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    if (!user.emailVerified) {
      console.log(`Email not verified for user: ${email}`)
      return NextResponse.json({ error: 'Email not verified' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await signJWT(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) },
      process.env.JWT_SECRET!
    )

    console.log(`Token generated for user: ${email}`)

    const response = NextResponse.json({ 
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username }
    }, { status: 200 })
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day in seconds
      path: '/',
    })
    console.log(`Cookie set for user: ${email}`)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


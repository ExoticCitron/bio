import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256']  // Explicitly specify the expected algorithm
    }) as { userId: string }

    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Invalid token payload')
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('JWT verification error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}


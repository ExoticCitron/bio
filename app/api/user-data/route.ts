import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Invalid token payload')
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { email: true, username: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('User data fetch error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}

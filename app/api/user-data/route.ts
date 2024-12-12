import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import {Request} from "express"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Invalid token payload')
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { username: true, email: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


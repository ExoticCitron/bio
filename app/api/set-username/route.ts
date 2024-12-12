import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { Request } from 'express'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const { username } = await req.json()
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { username }
    })

    return NextResponse.json({ message: 'Username set successfully', username: updatedUser.username })
  } catch (error) {
    console.error('Error setting username:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


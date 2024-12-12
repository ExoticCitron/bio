import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Delete the user from the database
    await prisma.user.delete({
      where: { id: decoded.userId },
    })

    // Clear the authentication token
    const response = NextResponse.json({ message: 'Account deleted successfully' })
    response.cookies.set('token', '', { expires: new Date(0) })

    return response
  } catch (error) {
    console.error('Error deleting account:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


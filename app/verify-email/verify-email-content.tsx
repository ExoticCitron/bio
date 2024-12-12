'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function VerifyEmailContent() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (response.ok) {
        setVerificationStatus('success')
        setTimeout(() => router.push('/login'), 3000) // Redirect to login after 3 seconds
      } else {
        setVerificationStatus('error')
      }
    } catch {
      setVerificationStatus('error')
    }
  }, [router])

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setVerificationStatus('error')
    }
  }, [token, verifyEmail])

  if (verificationStatus === 'loading') {
    return <p>Verifying your email...</p>
  }

  if (verificationStatus === 'success') {
    return (
      <>
        <p className="text-green-500">Your email has been successfully verified!</p>
        <p className="text-gray-400">Redirecting to login page...</p>
      </>
    )
  }

  return (
    <>
      <p className="text-red-500">There was an error verifying your email. The link may be invalid or expired.</p>
      <Button onClick={() => router.push('/signup')} className="w-full bg-zinc-800 hover:bg-zinc-700">
        Back to Sign Up
      </Button>
    </>
  )
}


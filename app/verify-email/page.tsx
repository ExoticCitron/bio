'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setVerificationStatus('error')
    }
  }, [token])

const verifyEmail = async (token: string) => {
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
  } catch (error) {
    setVerificationStatus('error')
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[400px] space-y-6 rounded-lg bg-zinc-900/50 p-6 text-white">
        <h1 className="text-2xl font-semibold text-center">Email Verification</h1>
        {verificationStatus === 'loading' && <p>Verifying your email...</p>}
        {verificationStatus === 'success' && (
          <>
            <p className="text-green-500">Your email has been successfully verified!</p>
            <p className="text-gray-400">Redirecting to login page...</p>
          </>
        )}
        {verificationStatus === 'error' && (
          <>
            <p className="text-red-500">There was an error verifying your email. The link may be invalid or expired.</p>
            <Button onClick={() => router.push('/signup')} className="w-full bg-zinc-800 hover:bg-zinc-700">
              Back to Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  )
}


import { Suspense } from 'react'
import { VerifyEmailContent } from './verify-email-content'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[400px] space-y-6 rounded-lg bg-zinc-900/50 p-6 text-white">
        <h1 className="text-2xl font-semibold text-center">Email Verification</h1>
        <Suspense fallback={<p>Loading verification...</p>}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  )
}

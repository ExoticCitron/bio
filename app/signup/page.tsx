'use client'

import Link from "next/link"
import { PenIcon as Gun } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-[400px] space-y-6 rounded-lg bg-zinc-900/50 p-6 text-white">
        <div className="flex flex-col items-center space-y-2">
          <Gun className="h-12 w-12 text-purple-500" />
          <h1 className="text-xl font-semibold">Create an exodevs.space account</h1>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="border-gray-800 bg-zinc-900 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-gray-800 bg-zinc-900 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-400">
              Username
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                exodevs.space/
              </span>
              <Input
                id="username"
                type="text"
                className="border-gray-800 bg-zinc-900 pl-[120px] text-white placeholder:text-gray-500"
                placeholder="username"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="border-gray-600 data-[state=checked]:bg-purple-500" />
            <Label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{" "}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button className="w-full bg-zinc-800 hover:bg-zinc-700">
            Sign Up
          </Button>
        </div>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}


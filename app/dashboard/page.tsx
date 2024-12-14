'use client'

import { useState, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleIcon, ShieldCheckIcon, MessageSquareIcon, UsersIcon, HashIcon, SunIcon, MoonIcon, BellIcon, ZapIcon } from 'lucide-react'
import { Settings } from "@/components/Settings"
import { UsernameSelectionPopup } from "@/components/UsernameSelectionPopup"
import { useRouter } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [showUsernamePopup, setShowUsernamePopup] = useState(false)
  const [userData, setUserData] = useState({ username: '', email: '' })
  const router = useRouter()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const checkAuthAndUsername = async () => {
      try {
        // First, check localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          setUserData(user)
          setUsername(user.username)
          setIsLoading(false)
          return
        }

        // If not in localStorage, check with the server
        const authResponse = await fetch('/api/check-auth', {
          credentials: 'include',
        })
        if (!authResponse.ok) {
          router.push('/login')
          return
        }

        const userDataResponse = await fetch('/api/user-data', {
          credentials: 'include',
        })
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json()
          setUserData(userData)
          if (userData.username) {
            setUsername(userData.username)
          } else {
            setShowUsernamePopup(true)
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Auth check or user data fetch failed:', error)
        router.push('/login')
      }
    }
    checkAuthAndUsername()
  }, [router])

  const handleUsernameSet = async (newUsername: string) => {
    try {
      const response = await fetch('/api/set-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername }),
      })
      if (response.ok) {
        setUsername(newUsername)
        setShowUsernamePopup(false)
      } else {
        throw new Error('Failed to set username')
      }
    } catch (error) {
      console.error('Error setting username:', error)
      throw error
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <>
      <UsernameSelectionPopup isOpen={showUsernamePopup} onUsernameSet={handleUsernameSet} />
      <div className={`flex min-h-screen ${darkMode ? 'bg-zinc-950' : 'bg-gray-100'}`}>
        {/* Sidebar */}
        <div className={`w-64 border-r ${darkMode ? 'border-zinc-800' : 'border-gray-200'} p-4 flex flex-col`}>
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">B</span>
            </div>
            <div>
              <h1 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Division</h1>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Discord Bot</p>
            </div>
          </div>
          <nav className="space-y-2 flex-grow">
            <div className={`px-2 py-1.5 text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Bot Management</div>
            <Button variant="ghost" className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <HashIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Commands
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <UsersIcon className="mr-2 h-4 w-4" />
              User Management
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <BellIcon className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <ZapIcon className="mr-2 h-4 w-4" />
              Auto-mod
            </Button>
          </nav>
          <div className={`mt-auto pt-4 border-t ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>UC</AvatarFallback>
                </Avatar>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>@{username}</p>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>User</p>
                </div>
              </div>
              <Settings 
                darkMode={darkMode} 
                toggleDarkMode={() => setDarkMode(!darkMode)} 
                userData={{ username: username || '', email: userData.email }}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full justify-start ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {darkMode ? <SunIcon className="h-4 w-4 mr-2" /> : <MoonIcon className="h-4 w-4 mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Welcome back, {username}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Updates */}
            <Card className={`p-6 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Updates</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleIcon className="size-6 text-indigo-400" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>New command: /serverinfo</p>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>main • 5 minutes ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">
                    pending
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleIcon className="size-6 text-indigo-400" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Improved auto-moderation</p>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>mod • 2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                    live
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleIcon className="size-6 text-indigo-400" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bug fix: role assignment</p>
                      <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>roles • 1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/20">
                    live
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Recent Incidents */}
            <Card className={`p-6 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Incidents</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="size-6 text-red-400" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Spam Attack Detected</p>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>auto-mod • high priority</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CircleIcon className="size-6 text-yellow-400" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Unusual Activity</p>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>user • medium priority</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquareIcon className="size-6 text-blue-400" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Command Usage Spike</p>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>performance • low priority</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bot Statistics */}
            <Card className={`p-6 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Bot Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Total Servers</span>
                  <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Active Users</span>
                  <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>56,789</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Commands Used (24h)</span>
                  <span className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>23,456</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className={`p-6 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button>Add to Server</Button>
                <Button>Add to Server</Button>
                <Button>Update Commands</Button>
                <Button>View Logs</Button>
                <Button>Manage Permissions</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}


import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SettingsIcon, UserIcon, LogOutIcon, ShieldIcon, EyeIcon, SunIcon, MoonIcon, Trash2Icon, CheckIcon, AlertTriangleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface SettingsProps {
  darkMode: boolean
  toggleDarkMode: () => void
  userData: {
    username: string
    email: string
  }
}

interface Notification {
  id: number
  message: string
  read: boolean
}

export function Settings({ darkMode, toggleDarkMode, userData }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteUsername, setDeleteUsername] = useState('')
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Welcome to exodevs.space!", read: false },
    { id: 2, message: "Your account has been created successfully.", read: false },
    { id: 3, message: "New feature: Dark mode is now available!", read: false },
  ])
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        router.push('/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const handleDeleteAccount = async () => {
    if (deleteUsername !== userData.username) {
      toast({
        title: "Error",
        description: "Username doesn't match. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setIsDeleteDialogOpen(false)
        setIsOpen(false)
        toast({
          title: "Account Deleted",
          description: "See you again soon!",
          variant: "default",
        })
        router.push('/login')
      } else {
        throw new Error('Failed to delete account')
      }
    } catch (error) {
      console.error('Delete account error:', error)
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings and preferences.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Account Information</h4>
                  <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                    <p className="text-sm"><strong>Username:</strong> {userData.username}</p>
                    <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <UserIcon className="h-5 w-5" />
                  <div>
                    <h4 className="text-sm font-semibold">Account Management</h4>
                    <p className="text-sm text-gray-500">Manage your account details</p>
                  </div>
                </div>
                <Button onClick={handleSignOut} variant="destructive" className="w-full">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Notifications</h4>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Read All
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearNotifications}>
                      <Trash2Icon className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="mb-4 last:mb-0 p-3 rounded-md border">
                        <p className={`text-sm ${notification.read ? '' : 'font-bold'}`}>{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No notifications</p>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <ShieldIcon className="h-5 w-5" />
                  <div>
                    <h4 className="text-sm font-semibold">Security Settings</h4>
                    <p className="text-sm text-gray-500">Manage your security preferences</p>
                  </div>
                </div>
                <Button onClick={() => setIsDeleteDialogOpen(true)} variant="destructive" className="w-full">
                  <AlertTriangleIcon className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="appearance">
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <EyeIcon className="h-5 w-5" />
                  <div>
                    <h4 className="text-sm font-semibold">Appearance Settings</h4>
                    <p className="text-sm text-gray-500">Customize your interface</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <SunIcon className="h-4 w-4" />
                  <Switch
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                    aria-label="Toggle dark mode"
                  />
                  <MoonIcon className="h-4 w-4" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={deleteUsername}
                onChange={(e) => setDeleteUsername(e.target.value)}
                className="col-span-3"
                placeholder="Enter your username to confirm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={deleteUsername !== userData.username}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


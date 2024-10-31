'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Bell, Lock, User, ChevronRight, LogOut, Settings, Shield, Globe, Moon, Sun, Smartphone, PenSquare, MapPin, ClipboardList } from 'lucide-react'

export function EnhancedEcommerceSettings() {
  const [activeSection, setActiveSection] = useState('account')
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  })
  const [editMode, setEditMode] = useState({
    name: false,
    username: false,
    email: false,
    phone: false
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  })

  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('english')
  const [fontScale, setFontScale] = useState(100)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNotificationChange = (type: 'email' | 'push' | 'sms') => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const toggleEditMode = (field: string) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View and edit your account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Picture</Button>
              </div>
              {Object.entries(personalInfo).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    {editMode[key as keyof typeof editMode] ? (
                      <Input
                        id={key}
                        name={key}
                        value={value}
                        onChange={handlePersonalInfoChange}
                        className="max-w-[250px]"
                      />
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleEditMode(key)}
                  >
                    <PenSquare className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        )
      case 'addresses':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your shipping and billing addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-muted-foreground">123 Main St, Anytown, AN 12345</p>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Work</p>
                    <p className="text-sm text-muted-foreground">456 Office Blvd, Workville, WK 67890</p>
                  </div>
                  <Button variant="outline" size="sm">Set as Default</Button>
                </div>
              </div>
              <Button className="w-full">Add New Address</Button>
            </CardContent>
          </Card>
        )
      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and their status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #12345</p>
                    <p className="text-sm text-muted-foreground">Placed on May 1, 2023</p>
                  </div>
                  <Badge variant="secondary">Delivered</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #12346</p>
                    <p className="text-sm text-muted-foreground">Placed on May 15, 2023</p>
                  </div>
                  <Badge>In Transit</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #12347</p>
                    <p className="text-sm text-muted-foreground">Placed on June 1, 2023</p>
                  </div>
                  <Badge variant="outline">Processing</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">View All Orders</Button>
            </CardContent>
          </Card>
        )
      case 'password':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Ensure your account is using a strong password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        )
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>
            </CardContent>
          </Card>
        )
      case 'payment':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                  </div>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Mastercard ending in 5555</p>
                    <p className="text-sm text-muted-foreground">Expires 08/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Set as Default</Button>
              </div>
              <Button className="w-full">Add New Payment Method</Button>
            </CardContent>
          </Card>
        )
      case 'appearance':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize your app experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    className="w-full" 
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    className="w-full" 
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    className="w-full" 
                    onClick={() => setTheme('system')}
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                    <SelectItem value="german">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[fontScale]}
                    onValueChange={(value) => setFontScale(value[0])}
                    max={150}
                    min={75}
                    step={1}
                  />
                  <span className="w-12 text-center">{fontScale}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <nav className="w-full md:w-64 space-y-1">
          {[
            { id: 'account', label: 'Account', icon: User },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'orders', label: 'Order History', icon: ClipboardList },
            { id: 'password', label: 'Password', icon: Lock },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'payment', label: 'Payment Methods', icon: CreditCard },
            { id: 'appearance', label:  'Appearance', icon: Settings },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          ))}
          <Separator className="my-4" />
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </nav>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
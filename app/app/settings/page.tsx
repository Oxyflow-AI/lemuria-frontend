"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SettingsIcon, Bell, Moon, Globe, Shield, HelpCircle, LogOut, Star } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [astrologySystem, setAstrologySystem] = useState("western")
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSignOut = async () => {
    setIsSigningOut(true)

    // Simulate sign out process
    setTimeout(() => {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out of Lemuria.",
      })

      // Redirect to landing page
      router.push("/")
      setIsSigningOut(false)
    }, 1500)
  }

  return (
    <div className="h-screen flex flex-col mystical-gradient">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-mystical-200 p-4"
      >
        <h1 className="text-lg font-semibold text-mystical-800 flex items-center">
          <SettingsIcon className="w-5 h-5 mr-2" />
          Settings
        </h1>
      </motion.div>

      {/* Settings Content */}
      <div className="flex-1 p-4 space-y-4 pb-24 overflow-y-auto">
        {/* Astrology Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-mystical-800">
                <Star className="w-5 h-5 mr-2" />
                Astrology Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Astrology System</Label>
                <Select value={astrologySystem} onValueChange={setAstrologySystem}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="western">Western Astrology</SelectItem>
                    <SelectItem value="vedic">Vedic Astrology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-mystical-800">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Insights</Label>
                  <p className="text-sm text-mystical-600">Get daily astrological insights</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Planetary Alerts</Label>
                  <p className="text-sm text-mystical-600">Important planetary movements</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* General Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="cosmic-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-mystical-800">
                <Globe className="w-5 h-5 mr-2" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <div className="flex items-center w-full py-3">
                  <Moon className="w-4 h-4 mr-3 text-mystical-600" />
                  <div className="text-left">
                    <p className="font-medium">Theme</p>
                    <p className="text-sm text-mystical-600">Light mode</p>
                  </div>
                </div>
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <div className="flex items-center w-full py-3">
                  <Shield className="w-4 h-4 mr-3 text-mystical-600" />
                  <div className="text-left">
                    <p className="font-medium">Privacy & Security</p>
                    <p className="text-sm text-mystical-600">Manage your data</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="cosmic-glow">
            <CardContent className="pt-6 space-y-4">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <div className="flex items-center w-full py-3">
                  <HelpCircle className="w-4 h-4 mr-3 text-mystical-600" />
                  <p className="font-medium">Help & Support</p>
                </div>
              </Button>
              <Separator />

              {/* Sign Out with Confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-red-600 hover:text-red-700">
                    <div className="flex items-center w-full py-3">
                      <LogOut className="w-4 h-4 mr-3" />
                      <p className="font-medium">Sign Out</p>
                    </div>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to sign out of Lemuria? You'll need to sign in again to access your cosmic
                      journey.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isSigningOut ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : null}
                      Sign Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  )
}

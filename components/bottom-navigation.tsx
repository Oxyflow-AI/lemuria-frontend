"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { MessageCircle, User, Settings, Sparkles, BookOpen } from "lucide-react"

const navItems = [
  {
    icon: User,
    label: "Profiles",
    path: "/app/profiles",
  },
  {
    icon: BookOpen,
    label: "Learn",
    path: "/app/learn",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    path: "/app",
    isSpecial: true,
  },
  {
    icon: Sparkles,
    label: "Insights",
    path: "/app/insights",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/app/settings",
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-100 px-2 py-1.5 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          const Icon = item.icon

          if (item.isSpecial) {
            // Special circular button for Chat
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.path)}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 p-1 ${
                  isActive
                    ? "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 text-white shadow-lg shadow-purple-200 scale-105"
                    : "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200 hover:scale-105 hover:text-white"
                }`}
              >
                <Icon className="w-12 h-12 stroke-[2.5]" />
              </Button>
            )
          }

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.path)}
              className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300 p-1 ${
                isActive
                  ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-purple-700 shadow-sm border border-purple-100"
                  : "text-slate-500 hover:text-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50"
              }`}
            >
              <Icon className="w-11 h-11 stroke-[2.5] transition-transform" />
            </Button>
          )
        })}
      </div>
    </div>
  )
}

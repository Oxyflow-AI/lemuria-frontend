"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sun, Moon, Star, TrendingUp } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function InsightsPage() {
  const insights = [
    {
      id: "1",
      title: "Mercury Retrograde Alert",
      description: "Communication may face challenges this week. Take extra care with important conversations.",
      type: "planetary",
      icon: Star,
      color: "bg-amber-50 border-amber-200",
    },
    {
      id: "2",
      title: "Your Daily Forecast",
      description: "Today brings opportunities for creative expression. Trust your intuition in decision-making.",
      type: "daily",
      icon: Sun,
      color: "bg-orange-50 border-orange-200",
    },
    {
      id: "3",
      title: "Full Moon Energy",
      description: "The upcoming full moon in your sign amplifies your natural charisma and leadership abilities.",
      type: "lunar",
      icon: Moon,
      color: "bg-indigo-50 border-indigo-200",
    },
  ]

  return (
    <div className="h-screen flex flex-col mystical-gradient">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-mystical-200 p-4"
      >
        <h1 className="text-lg font-semibold text-mystical-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Daily Insights
        </h1>
        <p className="text-sm text-mystical-600 mt-1">Your personalized cosmic guidance for today</p>
      </motion.div>

      {/* Insights */}
      <ScrollArea className="flex-1 p-4 pb-24">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`cosmic-glow ${insight.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-mystical-800 text-base">
                      <insight.icon className="w-5 h-5 mr-2" />
                      {insight.title}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-white/80">
                      {insight.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-mystical-700 leading-relaxed">{insight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Today's Affirmation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="cosmic-glow bg-gradient-to-br from-mystical-50 to-mystical-100 border-mystical-200">
              <CardHeader>
                <CardTitle className="text-center text-mystical-800">Today's Affirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-mystical-700 font-medium italic leading-relaxed">
                  "I am aligned with the cosmic flow and trust in the universe's perfect timing for my journey."
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ScrollArea>

      <BottomNavigation />
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sun, Moon, Sparkles } from "lucide-react"

type AstrologySystem = "western" | "vedic"

export default function AstrologySelectionPage() {
  const [selectedSystem, setSelectedSystem] = useState<AstrologySystem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSelection = async () => {
    if (!selectedSystem) return

    setIsLoading(true)
    // Simulate saving preference
    setTimeout(() => {
      setIsLoading(false)
      router.push("/profile-creation")
    }, 1500)
  }

  const systems = [
    {
      id: "western" as const,
      title: "Western Astrology",
      icon: Sun,
      description: "Based on the tropical zodiac and seasonal cycles",
      details:
        "Focuses on personality traits, psychological patterns, and life themes through the 12 zodiac signs and planetary positions.",
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    },
    {
      id: "vedic" as const,
      title: "Vedic Astrology",
      icon: Moon,
      description: "Ancient Indian system using the sidereal zodiac",
      details:
        "Emphasizes karma, dharma, and spiritual evolution through precise astronomical calculations and lunar mansions.",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    },
  ]

  return (
    <div className="min-h-screen mystical-gradient flex flex-col p-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 pb-6">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
        </div>
        <p className="text-purple-600 max-w-md mx-auto">
          Select your preferred astrology system to personalize your cosmic journey
        </p>
      </motion.div>

      {/* System Selection */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-4">
        {systems.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedSystem === system.id ? "ring-2 ring-purple-500 cosmic-glow" : "hover:shadow-md"
              } ${system.color}`}
              onClick={() => setSelectedSystem(system.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${system.id === "western" ? "bg-amber-200" : "bg-indigo-200"}`}>
                    <system.icon
                      className={`w-6 h-6 ${system.id === "western" ? "text-amber-700" : "text-indigo-700"}`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-800">{system.title}</CardTitle>
                    <CardDescription className="text-sm">{system.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-600 leading-relaxed">{system.details}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-6 pb-8"
      >
        <Button
          onClick={handleSelection}
          disabled={!selectedSystem || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          Continue with {selectedSystem === "western" ? "Western" : selectedSystem === "vedic" ? "Vedic" : ""} Astrology
        </Button>
      </motion.div>
    </div>
  )
}

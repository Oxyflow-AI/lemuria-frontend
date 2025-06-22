"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stars, Sparkles, Moon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen mystical-gradient flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center cosmic-glow">
            <Stars className="w-12 h-12 text-mystical-600" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-mystical-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -bottom-2 -left-2"
          >
            <Moon className="w-5 h-5 text-mystical-500" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-mystical-800 mb-4"
        >
          Lemuria
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-mystical-600 mb-8 leading-relaxed"
        >
          Unlock the secrets of the cosmos and discover your celestial path through personalized astrology insights
        </motion.p>

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Button
            onClick={() => router.push("/auth")}
            size="lg"
            className="w-full bg-mystical-700 hover:bg-mystical-800 text-white font-medium py-4 text-lg cosmic-glow transition-all duration-300"
          >
            Begin Your Mystical Journey
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center space-x-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-mystical-400 rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

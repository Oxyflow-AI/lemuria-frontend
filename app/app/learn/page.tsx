"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Play, Star, Clock, Users, Globe } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  thumbnail: string
  instructor: string
  rating: number
  students: number
}

interface VideoLesson {
  id: string
  title: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  description: string
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 border-green-200"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "advanced":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function LearnPage() {
  const courseOfTheWeek: Course = {
    id: "cotw-1",
    title: "Understanding Your Birth Chart",
    description: "A comprehensive guide to reading and interpreting your natal chart with practical examples.",
    duration: "2h 30m",
    difficulty: "intermediate",
    thumbnail: "/placeholder.svg?height=200&width=300",
    instructor: "Dr. Sarah Moon",
    rating: 4.8,
    students: 1247,
  }

  const fundamentals: VideoLesson[] = [
    {
      id: "fund-1",
      title: "What is Astrology? - Introduction to Cosmic Science",
      duration: "15 min",
      difficulty: "beginner",
      description: "Learn the basics of astrology and how celestial bodies influence our lives.",
    },
    {
      id: "fund-2",
      title: "The 12 Zodiac Signs Explained",
      duration: "25 min",
      difficulty: "beginner",
      description: "Deep dive into each zodiac sign's characteristics, elements, and qualities.",
    },
    {
      id: "fund-3",
      title: "Planets and Their Meanings",
      duration: "30 min",
      difficulty: "beginner",
      description: "Understanding the role of each planet in your astrological profile.",
    },
    {
      id: "fund-4",
      title: "Houses in Astrology - Your Life Areas",
      duration: "35 min",
      difficulty: "intermediate",
      description: "Explore the 12 houses and what they represent in your birth chart.",
    },
    {
      id: "fund-5",
      title: "Aspects and Their Influence",
      duration: "40 min",
      difficulty: "advanced",
      description: "Master the complex relationships between planets through aspects.",
    },
  ]

  const chartReading: VideoLesson[] = [
    {
      id: "chart-1",
      title: "Reading Your First Birth Chart",
      duration: "20 min",
      difficulty: "beginner",
      description: "Step-by-step guide to understanding your natal chart layout.",
    },
    {
      id: "chart-2",
      title: "Identifying Chart Patterns",
      duration: "28 min",
      difficulty: "intermediate",
      description: "Recognize stelliums, grand trines, and other significant patterns.",
    },
    {
      id: "chart-3",
      title: "Advanced Chart Synthesis",
      duration: "45 min",
      difficulty: "advanced",
      description: "Combine all elements to create comprehensive chart interpretations.",
    },
    {
      id: "chart-4",
      title: "Transits and Progressions",
      duration: "35 min",
      difficulty: "advanced",
      description: "Understanding how current planetary movements affect your chart.",
    },
  ]

  const culturalSystems: VideoLesson[] = [
    {
      id: "culture-1",
      title: "Western Astrology Foundations",
      duration: "22 min",
      difficulty: "beginner",
      description: "History and principles of Western tropical astrology.",
    },
    {
      id: "culture-2",
      title: "Vedic Astrology - Ancient Wisdom",
      duration: "30 min",
      difficulty: "intermediate",
      description: "Introduction to Jyotish and sidereal zodiac system.",
    },
    {
      id: "culture-3",
      title: "Chinese Astrology and the Four Pillars",
      duration: "25 min",
      difficulty: "intermediate",
      description: "Explore the Chinese zodiac and BaZi system.",
    },
    {
      id: "culture-4",
      title: "Mayan Astrology - The Sacred Calendar",
      duration: "18 min",
      difficulty: "beginner",
      description: "Understanding the Mayan Tzolkin and its astrological significance.",
    },
    {
      id: "culture-5",
      title: "Comparative Astrology Systems",
      duration: "40 min",
      difficulty: "advanced",
      description: "How different cultural systems complement each other.",
    },
  ]

  const VideoCard = ({ video }: { video: VideoLesson }) => (
    <Card className="cosmic-glow hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-mystical-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Play className="w-6 h-6 text-mystical-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-mystical-800 text-sm leading-tight">{video.title}</h4>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(video.difficulty)}`}>
                {video.difficulty}
              </Badge>
            </div>
            <p className="text-xs text-mystical-600 mb-2 line-clamp-2">{video.description}</p>
            <div className="flex items-center text-xs text-mystical-500">
              <Clock className="w-3 h-3 mr-1" />
              {video.duration}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-screen flex flex-col mystical-gradient">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-mystical-200 p-4"
      >
        <h1 className="text-lg font-semibold text-mystical-800 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Learn Astrology
        </h1>
        <p className="text-sm text-mystical-600 mt-1">Expand your cosmic knowledge with expert-led courses</p>
      </motion.div>

      {/* Content */}
      <ScrollArea className="flex-1 pb-24">
        <div className="p-4 space-y-6">
          {/* Course of the Week */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-semibold text-mystical-800 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500" />
              Course of the Week
            </h2>
            <Card className="cosmic-glow bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardContent className="p-0">
                <div className="aspect-video bg-mystical-200 rounded-t-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-mystical-600" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={getDifficultyColor(courseOfTheWeek.difficulty)}>
                      {courseOfTheWeek.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-mystical-600">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      {courseOfTheWeek.rating}
                    </div>
                  </div>
                  <h3 className="font-semibold text-mystical-800 mb-2">{courseOfTheWeek.title}</h3>
                  <p className="text-sm text-mystical-600 mb-3">{courseOfTheWeek.description}</p>
                  <div className="flex items-center justify-between text-xs text-mystical-500 mb-3">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {courseOfTheWeek.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {courseOfTheWeek.students.toLocaleString()} students
                    </span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">Start Learning</Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Fundamentals */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-semibold text-mystical-800 mb-3">Fundamentals</h2>
            <div className="space-y-3">
              {fundamentals.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Separator className="my-6" />

          {/* Chart Reading */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-semibold text-mystical-800 mb-3">Chart Reading</h2>
            <div className="space-y-3">
              {chartReading.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Separator className="my-6" />

          {/* Cultural Systems */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-lg font-semibold text-mystical-800 mb-3 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Cultural Systems
            </h2>
            <div className="space-y-3">
              {culturalSystems.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VideoCard video={video} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </ScrollArea>

      <BottomNavigation />
    </div>
  )
}

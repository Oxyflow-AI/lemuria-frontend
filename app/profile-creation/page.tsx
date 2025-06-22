"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User } from "lucide-react"
import { type ProfileFormData, profileSchema } from "@/lib/schemas"

export default function ProfileCreationPage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async () => {
    try {
      // Validate with Zod
      profileSchema.parse(formData)
      setErrors({})

      setIsLoading(true)
      // Simulate profile creation
      setTimeout(() => {
        setIsLoading(false)
        router.push("/app")
      }, 2000)
    } catch (error: any) {
      if (error.errors) {
        // Only show the first error
        const firstError = error.errors[0]
        const newErrors: Record<string, string> = {}
        newErrors[firstError.path[0]] = firstError.message
        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="min-h-screen mystical-gradient flex flex-col p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center mb-6 pt-4"
      >
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Create Your Profile
          </h1>
          <p className="text-sm text-purple-600">Tell us about yourself to get personalized insights</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <Card className="card-gradient cosmic-glow border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2">
                <User className="w-4 h-4 text-white" />
              </div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger
                  className={`input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 ${
                    errors.gender ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>

            {/* Date and Time of Birth - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className={`input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 ${
                    errors.dateOfBirth ? "border-red-500" : ""
                  }`}
                />
                {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBirth">Time of Birth</Label>
                <Input
                  id="timeOfBirth"
                  type="time"
                  value={formData.timeOfBirth}
                  onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
                  className={`input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 ${
                    errors.timeOfBirth ? "border-red-500" : ""
                  }`}
                />
                {errors.timeOfBirth && <p className="text-sm text-red-500">{errors.timeOfBirth}</p>}
              </div>
            </div>
            <p className="text-xs text-purple-500">Exact time helps provide more accurate readings</p>

            {/* Place of Birth */}
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input
                id="placeOfBirth"
                placeholder="City, Country"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                className={`input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 ${
                  errors.placeOfBirth ? "border-red-500" : ""
                }`}
              />
              {errors.placeOfBirth && <p className="text-sm text-red-500">{errors.placeOfBirth}</p>}
              <p className="text-xs text-purple-500">We'll use this to calculate your birth chart accurately</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-6 pb-8"
      >
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          Create Profile & Continue
        </Button>
      </motion.div>
    </div>
  )
}

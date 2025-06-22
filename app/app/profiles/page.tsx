"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, User, Calendar, MapPin, Settings, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useToast } from "@/hooks/use-toast"
import { type ProfileFormData, profileSchema } from "@/lib/schemas"

interface Profile {
  id: string
  name: string
  gender: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
  astrologySystem: "western" | "vedic"
  isMain: boolean
  createdAt: Date
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "John Doe",
      gender: "male",
      dateOfBirth: "1990-05-15",
      timeOfBirth: "14:30",
      placeOfBirth: "New York, USA",
      astrologySystem: "western",
      isMain: true,
      createdAt: new Date(),
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAddProfile = async () => {
    try {
      profileSchema.parse(formData)
      setErrors({})
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        const newProfile: Profile = {
          id: Date.now().toString(),
          ...formData,
          astrologySystem: "western", // Default to western for now
          isMain: false,
          createdAt: new Date(),
        }

        setProfiles((prev) => [...prev, newProfile])
        setFormData({
          name: "",
          gender: "",
          dateOfBirth: "",
          timeOfBirth: "",
          placeOfBirth: "",
        })
        setIsLoading(false)
        setIsAddDialogOpen(false) // Move this after setIsLoading

        toast({
          title: "Profile Created!",
          description: `${newProfile.name}'s profile has been added successfully.`,
        })
      }, 1000)
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

  const handleDeleteProfile = (profileId: string) => {
    const profileToDelete = profiles.find((p) => p.id === profileId)
    if (profileToDelete?.isMain) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your main profile.",
        variant: "destructive",
      })
      return
    }

    setProfiles((prev) => prev.filter((p) => p.id !== profileId))
    toast({
      title: "Profile Deleted",
      description: "The profile has been removed successfully.",
    })
  }

  return (
    <div className="h-screen flex flex-col mystical-gradient">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header-gradient backdrop-blur-md border-b border-purple-100 p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="w-6 h-6 text-purple-700 mr-3" />
            <h1 className="text-lg font-semibold text-purple-700">Profiles</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto card-gradient border-purple-100">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                  Create New Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`input-gradient border-purple-200 ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger
                      className={`input-gradient border-purple-200 ${errors.gender ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select gender" />
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

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className={`input-gradient border-purple-200 ${errors.dateOfBirth ? "border-red-500" : ""}`}
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
                    className={`input-gradient border-purple-200 ${errors.timeOfBirth ? "border-red-500" : ""}`}
                  />
                  {errors.timeOfBirth && <p className="text-sm text-red-500">{errors.timeOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth</Label>
                  <Input
                    id="placeOfBirth"
                    placeholder="City, Country"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    className={`input-gradient border-purple-200 ${errors.placeOfBirth ? "border-red-500" : ""}`}
                  />
                  {errors.placeOfBirth && <p className="text-sm text-red-500">{errors.placeOfBirth}</p>}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isLoading}
                  className="border-purple-200"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProfile}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : null}
                  Create Profile
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Profiles List */}
      <div className="flex-1 p-4 space-y-4 pb-20 overflow-y-auto">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-gradient cosmic-glow border-purple-100">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-purple-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    {profile.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {profile.isMain && (
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                      >
                        Main
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                      <Settings className="w-4 h-4" />
                    </Button>
                    {!profile.isMain && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="card-gradient border-purple-100">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {profile.name}'s profile? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-purple-200">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProfile(profile.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-purple-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(profile.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {profile.timeOfBirth}
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {profile.placeOfBirth}
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border-purple-200"
                  >
                    {profile.astrologySystem === "western" ? "Western" : "Vedic"} Astrology
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="input-gradient text-purple-700 border-purple-200 hover:bg-purple-50"
                  >
                    View Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-dashed border-2 border-purple-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-purple-600 text-center mb-4">Add a new profile for family members or friends</p>
              <Button
                variant="outline"
                className="input-gradient text-purple-700 border-purple-200 hover:bg-purple-50"
                onClick={() => setIsAddDialogOpen(true)}
              >
                Create New Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  )
}

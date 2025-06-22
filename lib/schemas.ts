import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  timeOfBirth: z.string().min(1, "Time of birth is required"),
  placeOfBirth: z.string().min(2, "Place of birth must be at least 2 characters"),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().length(6, "OTP must be 6 digits").optional(),
})

export type AuthFormData = z.infer<typeof authSchema>

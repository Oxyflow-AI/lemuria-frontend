"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`w-80 cosmic-glow ${
                toast.variant === "destructive" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {toast.variant === "destructive" ? (
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`font-medium ${toast.variant === "destructive" ? "text-red-900" : "text-green-900"}`}
                    >
                      {toast.title}
                    </h4>
                    {toast.description && (
                      <p
                        className={`text-sm mt-1 ${
                          toast.variant === "destructive" ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        {toast.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismiss(toast.id)}
                    className="h-auto p-1 hover:bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

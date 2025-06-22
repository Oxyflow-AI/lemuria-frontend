"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Bot, ChevronDown } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  isExpanded?: boolean
}

function formatDateSeparator(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Today"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

function shouldShowDateSeparator(currentMessage: Message, previousMessage?: Message): boolean {
  if (!previousMessage) return true

  const currentDate = new Date(currentMessage.timestamp).toDateString()
  const previousDate = new Date(previousMessage.timestamp).toDateString()

  return currentDate !== previousDate
}

function MessageContent({ message, onToggleExpand }: { message: Message; onToggleExpand: (id: string) => void }) {
  const lines = message.content.split("\n")
  const shouldTruncate = lines.length > 20 && !message.isExpanded
  const displayContent = shouldTruncate ? lines.slice(0, 20).join("\n") : message.content

  return (
    <div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayContent}</p>
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleExpand(message.id)}
          className="mt-2 p-0 h-auto text-xs text-purple-400 hover:text-purple-600"
        >
          <ChevronDown className="w-3 h-3 mr-1" />
          Read More ({lines.length - 20} more lines)
        </Button>
      )}
      {message.isExpanded && lines.length > 20 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleExpand(message.id)}
          className="mt-2 p-0 h-auto text-xs text-purple-400 hover:text-purple-600"
        >
          Show Less
        </Button>
      )}
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to Lemuria! I'm your cosmic guide. Ask me anything about your astrological journey, birth chart, or seek guidance for your path ahead. ✨",
      isUser: false,
      timestamp: new Date(),
      isExpanded: false,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputMessage])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
      isExpanded: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    // Simulate AI response with "hello"
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Hello! 👋 How can I help you with your cosmic journey today?",
          isUser: false,
          timestamp: new Date(),
          isExpanded: false,
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleToggleExpand = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isExpanded: !msg.isExpanded } : msg)))
  }

  return (
    <div className="h-screen flex flex-col mystical-gradient">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="header-gradient backdrop-blur-md border-b border-purple-100 p-4 shadow-sm"
      >
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mr-3">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Cosmic Guide
          </h1>
          <Sparkles className="w-5 h-5 text-purple-500 ml-3 animate-cosmic-pulse" />
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef} style={{ paddingBottom: "120px" }}>
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : undefined
            const showDateSeparator = shouldShowDateSeparator(message, previousMessage)

            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDateSeparator && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center my-4"
                  >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
                    <span className="px-3 text-xs text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full py-1 border border-purple-100">
                      {formatDateSeparator(message.timestamp)}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
                  </motion.div>
                )}

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <Card
                    className={`max-w-[80%] ${
                      message.isUser
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200"
                        : "card-gradient cosmic-glow border-purple-100"
                    }`}
                  >
                    <CardContent className="p-3">
                      <MessageContent message={message} onToggleExpand={handleToggleExpand} />
                      <p className={`text-xs mt-2 ${message.isUser ? "text-purple-100" : "text-purple-500"}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )
          })}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <Card className="card-gradient cosmic-glow border-purple-100">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-purple-600">Consulting the stars...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area - Aligned with bot messages and spaced from nav */}
      <div className="fixed bottom-20 left-0 right-0 py-4 px-4 z-40">
        <div className="w-full">
          <div className="flex items-end space-x-3">
            <Textarea
              ref={textareaRef}
              placeholder="Ask Lemuria..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[44px] max-h-32 resize-none rounded-3xl px-4 py-3 input-gradient border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 shadow-lg"
              disabled={isLoading}
              maxLength={500}
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-0 shadow-lg flex-shrink-0"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}

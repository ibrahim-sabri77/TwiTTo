"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/lib/auth"

interface CommentFormProps {
  currentUser: User
  onSubmit: (content: string) => void
  onCancel?: () => void
  placeholder?: string
}

export function CommentForm({ currentUser, onSubmit, onCancel, placeholder = "Write a comment..." }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      onSubmit(content.trim())
      setContent("")
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
          <AvatarFallback className="text-xs">{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none text-sm"
            maxLength={500}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{content.length}/500</span>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm" disabled={!content.trim() || isSubmitting}>
            {isSubmitting ? "Posting..." : "Comment"}
          </Button>
        </div>
      </div>
    </form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/lib/auth"

interface PostCreatorProps {
  onPost: (content: string) => void
  currentUser: User
}

export function PostCreator({ onPost, currentUser }: PostCreatorProps) {
  const [content, setContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsPosting(true)

    // Simulate posting delay
    setTimeout(() => {
      onPost(content.trim())
      setContent("")
      setIsPosting(false)
    }, 500)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
              <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's happening?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-base"
                maxLength={280}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{content.length}/280</span>
            <Button type="submit" disabled={!content.trim() || isPosting} className="px-6">
              {isPosting ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

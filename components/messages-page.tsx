"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

const mockMessages = [
  {
    id: "1",
    sender: { username: "alex_dev", avatar: "/placeholder.svg" },
    lastMessage: "Hey! Did you see the new React features?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: true,
  },
  {
    id: "2",
    sender: { username: "sarah_design", avatar: "/placeholder.svg" },
    lastMessage: "Thanks for the feedback on the UI mockups!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: true,
  },
  {
    id: "3",
    sender: { username: "mike_photo", avatar: "/placeholder.svg" },
    lastMessage: "The sunset photos turned out amazing 📸",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: false,
  },
]

export function MessagesPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold text-foreground mb-6">Messages</h1>

      <div className="space-y-3">
        {mockMessages.map((message) => (
          <Card key={message.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.username} />
                  <AvatarFallback>{message.sender.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground truncate">{message.sender.username}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </span>
                      {message.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

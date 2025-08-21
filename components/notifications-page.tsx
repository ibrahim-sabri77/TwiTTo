"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, UserPlus, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const mockNotifications = [
  {
    id: "1",
    type: "like",
    user: { username: "alex_dev", avatar: "/placeholder.svg" },
    content: "liked your post about React hooks",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    unread: true,
  },
  {
    id: "2",
    type: "comment",
    user: { username: "sarah_design", avatar: "/placeholder.svg" },
    content: "commented on your post: 'Great insights!'",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    unread: true,
  },
  {
    id: "3",
    type: "follow",
    user: { username: "mike_photo", avatar: "/placeholder.svg" },
    content: "started following you",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: false,
  },
  {
    id: "4",
    type: "trending",
    user: null,
    content: "Your post is trending in Technology community",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    unread: false,
  },
]

export function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />
      case "trending":
        return <TrendingUp className="w-5 h-5 text-orange-500" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold text-foreground mb-6">Notifications</h1>

      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`cursor-pointer hover:bg-muted/50 transition-colors ${
              notification.unread ? "bg-primary/5 border-primary/20" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {notification.user ? (
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={notification.user.avatar || "/placeholder.svg"}
                        alt={notification.user.username}
                      />
                      <AvatarFallback>{notification.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {notification.user && <span className="font-medium">{notification.user.username} </span>}
                        {notification.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {getIcon(notification.type)}
                      {notification.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

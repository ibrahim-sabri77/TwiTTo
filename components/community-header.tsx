"use client"

import { Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Community } from "@/lib/communities"

interface CommunityHeaderProps {
  community: Community
  onJoinToggle: () => void
}

export function CommunityHeader({ community, onJoinToggle }: CommunityHeaderProps) {
  if (community.id === "home") {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to SocialHub</h1>
            <p className="text-muted-foreground">Your personalized feed with posts from communities you've joined</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <div className={`h-24 ${community.bannerColor} rounded-t-lg`} />
      <CardContent className="p-6 -mt-8">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-4 border-background">
            <AvatarImage src={community.icon || "/placeholder.svg"} alt={community.displayName} />
            <AvatarFallback className="text-lg font-bold">
              {community.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-foreground">{community.displayName}</h1>
              <Button variant={community.isJoined ? "secondary" : "default"} onClick={onJoinToggle} className="gap-2">
                {community.isJoined ? (
                  <>
                    <Users className="w-4 h-4" />
                    Joined
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Join
                  </>
                )}
              </Button>
            </div>

            <p className="text-muted-foreground mb-3">{community.description}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{community.memberCount.toLocaleString()} members</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

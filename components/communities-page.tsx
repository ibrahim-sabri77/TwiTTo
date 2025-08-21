"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockCommunities, type Community } from "@/lib/communities"

interface CommunitiesPageProps {
  onCommunitySelect: (communityId: string) => void
}

export function CommunitiesPage({ onCommunitySelect }: CommunitiesPageProps) {
  const [communities, setCommunities] = useState<Community[]>(mockCommunities.filter((c) => c.id !== "home"))

  const handleJoinToggle = (communityId: string) => {
    setCommunities(
      communities.map((c) =>
        c.id === communityId
          ? { ...c, isJoined: !c.isJoined, memberCount: c.isJoined ? c.memberCount - 1 : c.memberCount + 1 }
          : c,
      ),
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20 space-y-4">
      <h1 className="text-2xl font-bold text-foreground mb-6">Communities</h1>

      <div className="space-y-4">
        {communities.map((community) => (
          <Card key={community.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={community.icon || "/placeholder.svg"} alt={community.displayName} />
                  <AvatarFallback>{community.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="font-medium text-foreground cursor-pointer hover:text-primary"
                      onClick={() => onCommunitySelect(community.id)}
                    >
                      {community.displayName}
                    </h3>
                    {community.isJoined && (
                      <Badge variant="secondary" className="text-xs">
                        Joined
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{community.description}</p>
                  <p className="text-xs text-muted-foreground">{community.memberCount.toLocaleString()} members</p>
                </div>

                <Button
                  variant={community.isJoined ? "secondary" : "default"}
                  size="sm"
                  onClick={() => handleJoinToggle(community.id)}
                >
                  {community.isJoined ? "Leave" : "Join"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

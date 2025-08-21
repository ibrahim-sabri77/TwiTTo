"use client"

import { useState } from "react"
import { Home, Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { mockCommunities, type Community } from "@/lib/communities"
import type { User as UserType } from "@/lib/auth"

interface SidebarProps {
  currentUser: UserType
  activeCommunity: string
  onCommunityChange: (communityId: string) => void
  onProfileClick: () => void
}

export function Sidebar({ currentUser, activeCommunity, onCommunityChange, onProfileClick }: SidebarProps) {
  const [communities] = useState<Community[]>(mockCommunities)

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">SocialHub</h1>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3" onClick={onProfileClick}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.username} />
            <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <div className="font-medium text-foreground">{currentUser.username}</div>
            <div className="text-sm text-muted-foreground">View Profile</div>
          </div>
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Communities</div>

          {communities.map((community) => (
            <Button
              key={community.id}
              variant={activeCommunity === community.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-auto p-3"
              onClick={() => onCommunityChange(community.id)}
            >
              {community.id === "home" ? (
                <Home className="w-5 h-5" />
              ) : (
                <Avatar className="w-5 h-5">
                  <AvatarImage src={community.icon || "/placeholder.svg"} alt={community.displayName} />
                  <AvatarFallback className="text-xs">{community.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div className="text-left flex-1">
                <div className="font-medium text-sm">{community.displayName}</div>
                {community.memberCount > 0 && (
                  <div className="text-xs text-muted-foreground">{community.memberCount.toLocaleString()} members</div>
                )}
              </div>
              {community.isJoined && community.id !== "home" && <div className="w-2 h-2 bg-primary rounded-full" />}
            </Button>
          ))}

          <Separator className="my-4" />

          <Button variant="ghost" className="w-full justify-start gap-3">
            <Plus className="w-5 h-5" />
            <span>Create Community</span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  )
}

"use client"

import { Home, Users, MessageCircle, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User as UserType } from "@/lib/auth"

interface BottomNavigationProps {
  currentUser: UserType
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ currentUser, activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "communities", icon: Users, label: "Communities" },
    { id: "messages", icon: MessageCircle, label: "Messages", badge: 3 },
    { id: "notifications", icon: Bell, label: "Notifications", badge: 5 },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                {tab.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center p-0"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs ${isActive ? "text-primary font-medium" : ""}`}>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

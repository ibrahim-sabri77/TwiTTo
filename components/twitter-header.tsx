"use client"

import { useState } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Profile from "./firebase-profile"
import type { User } from "@/lib/auth"

interface TwitterHeaderProps {
  currentUser: User
  onProfileClick?: () => void
  onSearch?: (query: string) => void
}

export function TwitterHeader({ currentUser, onProfileClick, onSearch }: TwitterHeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleSearchClick = () => {
    setShowSearch(!showSearch)
  }

  const handleProfileClick = () => {
    setShowProfile(true)
    onProfileClick?.()
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleSearchClick} className="rounded-full hover:bg-muted">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold text-emerald-600">TwiTTo</h1>
          </div>

          {/* Right side - Dark mode toggle and Profile */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full hover:bg-muted">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" onClick={handleProfileClick} className="rounded-full p-1 hover:bg-muted">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={currentUser.profileImage || currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                />
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  {currentUser.name?.charAt(0) || currentUser.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>

        {showSearch && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search TwiTTo..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {showProfile && <Profile userId={currentUser.uid} onClose={() => setShowProfile(false)} />}
    </>
  )
}

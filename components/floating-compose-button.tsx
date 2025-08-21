"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCreator } from "@/components/post-creator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { User } from "@/lib/auth"

interface FloatingComposeButtonProps {
  currentUser: User
  onPost: (content: string) => void
}

export function FloatingComposeButton({ currentUser, onPost }: FloatingComposeButtonProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show button when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handlePost = (content: string) => {
    onPost(content)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`fixed bottom-20 left-4 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg transition-all duration-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <PostCreator onPost={handlePost} currentUser={currentUser} />
      </DialogContent>
    </Dialog>
  )
}

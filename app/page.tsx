"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { UserProfile } from "@/components/user-profile"
import { PostFeed } from "@/components/post-feed"
import { MessagesPage } from "@/components/messages-page"
import { NotificationsPage } from "@/components/notifications-page"
import { CommunitiesPage } from "@/components/communities-page"
import { TwitterHeader } from "@/components/twitter-header"
import { FloatingComposeButton } from "@/components/floating-compose-button"
import { mockPosts, type Post } from "@/lib/posts"
import { mockUsers } from "@/lib/auth"
import { mockCommunities } from "@/lib/communities"
import type { User } from "@/lib/auth"

type View = "home" | "communities" | "messages" | "notifications" | "profile"

export default function HomePage() {
  const [currentUser] = useState(mockUsers[0])
  const [activeCommunity, setActiveCommunity] = useState("home")
  const [currentView, setCurrentView] = useState<View>("home")
  const [profileUser, setProfileUser] = useState(mockUsers[0])
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [communities, setCommunities] = useState(mockCommunities)

  const currentCommunity = communities.find((c) => c.id === activeCommunity) || communities[0]

  // Filter posts by community (for now, just show all posts in home)
  const filteredPosts =
    activeCommunity === "home"
      ? posts
      : posts.filter((post) => {
          // Mock community filtering - in real app, posts would have community IDs
          if (activeCommunity === "tech")
            return post.content.toLowerCase().includes("tech") || post.content.toLowerCase().includes("ai")
          if (activeCommunity === "photography")
            return post.content.toLowerCase().includes("photo") || post.content.toLowerCase().includes("sunset")
          return posts
        })

  const handleCommunityChange = (communityId: string) => {
    setActiveCommunity(communityId)
    setCurrentView("home")
  }

  const handleTabChange = (tab: string) => {
    if (tab === "profile") {
      setProfileUser(currentUser)
    }
    setCurrentView(tab as View)
  }

  const handleJoinToggle = () => {
    setCommunities(
      communities.map((c) =>
        c.id === activeCommunity
          ? { ...c, isJoined: !c.isJoined, memberCount: c.isJoined ? c.memberCount - 1 : c.memberCount + 1 }
          : c,
      ),
    )
  }

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      isBookmarked: false,
      shares: 0,
    }
    setPosts([newPost, ...posts])
  }

  const handleProfileClick = (user: User) => {
    setProfileUser(user)
    setCurrentView("profile")
  }

  const renderContent = () => {
    switch (currentView) {
      case "messages":
        return <MessagesPage />
      case "notifications":
        return <NotificationsPage />
      case "communities":
        return <CommunitiesPage onCommunitySelect={handleCommunityChange} />
      case "profile":
        return <UserProfile user={profileUser} currentUser={currentUser} onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="max-w-2xl mx-auto p-4 pb-20">
            <PostFeed
              posts={filteredPosts}
              setPosts={setPosts}
              currentUser={currentUser}
              onProfileClick={handleProfileClick}
            />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TwitterHeader currentUser={currentUser} onProfileClick={() => handleProfileClick(currentUser)} />

      {renderContent()}

      {currentView === "home" && <FloatingComposeButton currentUser={currentUser} onPost={handleNewPost} />}

      <BottomNavigation currentUser={currentUser} activeTab={currentView} onTabChange={handleTabChange} />
    </div>
  )
}

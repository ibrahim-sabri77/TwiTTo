"use client"

import { useState } from "react"
import { PostCreator } from "@/components/post-creator"
import { PostFeed } from "@/components/post-feed"
import { mockPosts, type Post } from "@/lib/posts"
import { mockUsers } from "@/lib/auth"

export function MainFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [currentUser] = useState(mockUsers[0]) // Mock current user

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

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">SocialHub</h1>
        <p className="text-muted-foreground">Connect, share, and discover with your community</p>
      </div>

      {/* Post Creator */}
      <PostCreator onPost={handleNewPost} currentUser={currentUser} />

      {/* Feed */}
      <PostFeed posts={posts} setPosts={setPosts} currentUser={currentUser} />
    </div>
  )
}

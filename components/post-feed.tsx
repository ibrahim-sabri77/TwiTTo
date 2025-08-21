"use client"

import { PostCard } from "@/components/post-card"
import type { Post } from "@/lib/posts"
import type { User } from "@/lib/auth"

interface PostFeedProps {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  currentUser: User
  onProfileClick?: (user: User) => void // Added profile click handler prop
}

export function PostFeed({ posts, setPosts, currentUser, onProfileClick }: PostFeedProps) {
  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const handleVote = (postId: string, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          let newUpvotes = post.upvotes
          let newDownvotes = post.downvotes
          let newUserVote: "up" | "down" | null = voteType

          // Remove previous vote if exists
          if (post.userVote === "up") {
            newUpvotes -= 1
          } else if (post.userVote === "down") {
            newDownvotes -= 1
          }

          // If clicking the same vote, remove it
          if (post.userVote === voteType) {
            newUserVote = null
          } else {
            // Add new vote
            if (voteType === "up") {
              newUpvotes += 1
            } else {
              newDownvotes += 1
            }
          }

          return {
            ...post,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
          }
        }
        return post
      }),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        }
        return post
      }),
    )
  }

  const handleShare = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1,
          }
        }
        return post
      }),
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onLike={() => handleLike(post.id)}
          onVote={(voteType) => handleVote(post.id, voteType)}
          onBookmark={() => handleBookmark(post.id)}
          onShare={() => handleShare(post.id)}
          onProfileClick={onProfileClick} // Pass profile click handler to PostCard
        />
      ))}
    </div>
  )
}

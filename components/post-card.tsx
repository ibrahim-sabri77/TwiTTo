"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Repeat2, Share, Bookmark, MoreHorizontal, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockComments, organizeComments, type Comment } from "@/lib/comments"
import type { Post } from "@/lib/posts"
import type { User } from "@/lib/auth"

interface PostCardProps {
  post: Post
  currentUser: User
  onLike: () => void
  onVote: (voteType: "up" | "down") => void
  onBookmark: () => void
  onShare: () => void
  onProfileClick?: (user: User) => void
}

export function PostCard({ post, currentUser, onLike, onVote, onBookmark, onShare, onProfileClick }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>(mockComments.filter((comment) => comment.postId === post.id))

  const organizedComments = organizeComments(comments)

  return (
    <Card className="border-0 border-b border-border rounded-none hover:bg-muted/30 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="p-0 h-auto rounded-full hover:bg-transparent"
            onClick={() => onProfileClick?.(post.author)}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.username} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                {post.author.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <Button
                variant="ghost"
                className="p-0 h-auto font-bold text-foreground hover:underline hover:bg-transparent"
                onClick={() => onProfileClick?.(post.author)}
              >
                {post.author.name || post.author.username}
              </Button>
              {post.author.isVerified && <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-500" />}
              <Button
                variant="ghost"
                className="p-0 h-auto text-muted-foreground hover:underline hover:bg-transparent"
                onClick={() => onProfileClick?.(post.author)}
              >
                @{post.author.username}
              </Button>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
              <div className="ml-auto">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-foreground leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center justify-between max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-full px-3 py-1.5 h-auto group"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4 group-hover:fill-current" />
                <span className="text-sm">{post.comments}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-full px-3 py-1.5 h-auto group"
                onClick={onShare}
              >
                <Repeat2 className="h-4 w-4" />
                <span className="text-sm">{post.shares}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 h-auto group ${
                  post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                }`}
                onClick={onLike}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : "group-hover:fill-current"}`} />
                <span className="text-sm">{post.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 h-auto group ${
                  post.isBookmarked ? "text-blue-500" : "text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10"
                }`}
                onClick={onBookmark}
              >
                <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-full px-3 py-1.5 h-auto"
                onClick={onShare}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

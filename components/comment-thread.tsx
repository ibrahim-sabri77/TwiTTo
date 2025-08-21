"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ChevronUp, ChevronDown, MessageCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CommentForm } from "@/components/comment-form"
import type { Comment } from "@/lib/comments"
import type { User } from "@/lib/auth"

interface CommentThreadProps {
  comment: Comment
  currentUser: User
  onVote: (commentId: string, voteType: "up" | "down") => void
  onReply: (parentId: string, content: string) => void
  depth?: number
}

export function CommentThread({ comment, currentUser, onVote, onReply, depth = 0 }: CommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const netScore = comment.upvotes - comment.downvotes
  const maxDepth = 6 // Maximum nesting depth

  const handleReply = (content: string) => {
    onReply(comment.id, content)
    setShowReplyForm(false)
  }

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}`}>
      <div className="flex gap-3 py-2">
        <div className="flex flex-col items-center gap-1 pt-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 w-6 p-0 ${
              comment.userVote === "up" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
            }`}
            onClick={() => onVote(comment.id, "up")}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>

          <span
            className={`text-xs font-medium ${
              netScore > 0 ? "text-primary" : netScore < 0 ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {netScore}
          </span>

          <Button
            variant="ghost"
            size="sm"
            className={`h-6 w-6 p-0 ${
              comment.userVote === "down"
                ? "text-destructive bg-destructive/10"
                : "text-muted-foreground hover:text-destructive"
            }`}
            onClick={() => onVote(comment.id, "down")}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.username} />
              <AvatarFallback className="text-xs">{comment.author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">{comment.author.username}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-muted-foreground"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? `[+] ${comment.replies.length} replies` : "[-]"}
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report comment</DropdownMenuItem>
                <DropdownMenuItem>Hide comment</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {!isCollapsed && (
            <>
              <div className="mb-2">
                <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>

              {showReplyForm && (
                <div className="mb-4">
                  <CommentForm
                    currentUser={currentUser}
                    onSubmit={handleReply}
                    onCancel={() => setShowReplyForm(false)}
                    placeholder="Write a reply..."
                  />
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && depth < maxDepth && (
                <div className="space-y-2">
                  {comment.replies.map((reply) => (
                    <CommentThread
                      key={reply.id}
                      comment={reply}
                      currentUser={currentUser}
                      onVote={onVote}
                      onReply={onReply}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

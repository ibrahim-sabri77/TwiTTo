import type { User } from "@/lib/auth"
import { mockUsers } from "@/lib/auth"

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: Date
  upvotes: number
  downvotes: number
  userVote: "up" | "down" | null
  parentId: string | null // null for top-level comments
  postId: string
  replies?: Comment[]
}

// Mock comments data
export const mockComments: Comment[] = [
  {
    id: "c1",
    content: "This is really exciting! Can't wait to see how this develops.",
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    upvotes: 5,
    downvotes: 0,
    userVote: "up",
    parentId: null,
    postId: "1",
  },
  {
    id: "c2",
    content: "I agree! The potential for innovation in this space is huge.",
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    upvotes: 3,
    downvotes: 0,
    userVote: null,
    parentId: "c1",
    postId: "1",
  },
  {
    id: "c3",
    content: "What specific features are you most excited about?",
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    upvotes: 2,
    downvotes: 0,
    userVote: null,
    parentId: "c1",
    postId: "1",
  },
  {
    id: "c4",
    content: "Beautiful photo! Where was this taken?",
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    upvotes: 4,
    downvotes: 0,
    userVote: "up",
    parentId: null,
    postId: "2",
  },
  {
    id: "c5",
    content: "AI integration with real-time feeds could be game-changing. What's your take on privacy concerns?",
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    upvotes: 8,
    downvotes: 1,
    userVote: null,
    parentId: null,
    postId: "3",
  },
  {
    id: "c6",
    content: "Privacy is definitely a key consideration. We need transparent algorithms and user control.",
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    upvotes: 6,
    downvotes: 0,
    userVote: "up",
    parentId: "c5",
    postId: "3",
  },
]

// Helper function to organize comments into threaded structure
export function organizeComments(comments: Comment[]): Comment[] {
  const commentMap = new Map<string, Comment>()
  const topLevelComments: Comment[] = []

  // First pass: create map and initialize replies arrays
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] })
  })

  // Second pass: organize into tree structure
  comments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!

    if (comment.parentId) {
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        parent.replies!.push(commentWithReplies)
      }
    } else {
      topLevelComments.push(commentWithReplies)
    }
  })

  return topLevelComments
}

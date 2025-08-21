import type { User } from "@/lib/auth"
import { mockUsers } from "@/lib/auth"

export interface Post {
  id: string
  content: string
  author: User
  createdAt: Date
  likes: number
  comments: number
  isLiked: boolean
  upvotes: number
  downvotes: number
  userVote: "up" | "down" | null // User's current vote
  isBookmarked: boolean
  shares: number
  images?: string[]
}

// Mock posts data
const additionalUsers: User[] = [
  {
    id: "3",
    username: "techguru",
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/diverse-user-avatars.png",
    followers: 45000, // Added followers for consistency
    isVerified: true, // Added verification status for tech influencer
  },
  {
    id: "4",
    username: "designpro",
    name: "Maya Patel",
    email: "maya@example.com",
    avatar: "/female-user-avatar.png",
    followers: 32000, // Added followers for consistency
    isVerified: false, // Added verification status
  },
  {
    id: "5",
    username: "startuplife",
    name: "Jordan Smith",
    email: "jordan@example.com",
    avatar: "/abstract-user-avatar.png",
    followers: 78000, // Added followers for consistency
    isVerified: true, // Added verification status for startup founder
  },
]

const allUsers = [...mockUsers, ...additionalUsers]

export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Just launched my new project! Excited to share it with the community. What do you think about the future of social media? 🚀",
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 12,
    comments: 3,
    isLiked: false,
    upvotes: 18,
    downvotes: 2,
    userVote: "up",
    isBookmarked: false,
    shares: 4,
  },
  {
    id: "2",
    content:
      "Beautiful sunset today! Sometimes it's the simple moments that bring the most joy. Hope everyone is having a great day.",
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 8,
    comments: 1,
    isLiked: true,
    upvotes: 11,
    downvotes: 0,
    userVote: null,
    isBookmarked: true,
    shares: 2,
  },
  {
    id: "3",
    content:
      "Working on some exciting new features for our platform. The intersection of AI and social media is fascinating. What features would you like to see?",
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 15,
    comments: 7,
    isLiked: false,
    upvotes: 23,
    downvotes: 3,
    userVote: null,
    isBookmarked: false,
    shares: 8,
  },
  {
    id: "4",
    content:
      "Coffee shop coding session complete ☕ There's something magical about the ambient noise that helps with focus. Where do you do your best work?",
    author: mockUsers[0],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 6,
    comments: 2,
    isLiked: true,
    upvotes: 9,
    downvotes: 1,
    userVote: "down",
    isBookmarked: true,
    shares: 1,
  },
  {
    id: "5",
    content:
      "Breaking: New AI breakthrough in natural language processing! This could change everything we know about human-computer interaction. Thoughts?",
    author: allUsers[2],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    likes: 34,
    comments: 12,
    isLiked: false,
    upvotes: 45,
    downvotes: 3,
    userVote: null,
    isBookmarked: false,
    shares: 18,
  },
  {
    id: "6",
    content:
      "Just finished redesigning our mobile app interface. Clean, minimal, and user-focused. Design is not just how it looks, but how it works! 🎨",
    author: allUsers[3],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 28,
    comments: 8,
    isLiked: true,
    upvotes: 32,
    downvotes: 1,
    userVote: "up",
    isBookmarked: true,
    shares: 12,
  },
  {
    id: "7",
    content:
      "Startup life update: We just closed our Series A! 🎉 Couldn't have done it without this amazing community. Next stop: changing the world, one line of code at a time.",
    author: allUsers[4],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 67,
    comments: 23,
    isLiked: false,
    upvotes: 89,
    downvotes: 4,
    userVote: null,
    isBookmarked: false,
    shares: 31,
  },
  {
    id: "8",
    content:
      "Hot take: The best code is the code you don't have to write. Sometimes the most elegant solution is the simplest one. Less is more! 💭",
    author: allUsers[2],
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
    likes: 19,
    comments: 15,
    isLiked: true,
    upvotes: 24,
    downvotes: 2,
    userVote: null,
    isBookmarked: true,
    shares: 7,
  },
]

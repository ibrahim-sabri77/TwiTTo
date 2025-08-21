export interface Community {
  id: string
  name: string
  displayName: string
  description: string
  memberCount: number
  isJoined: boolean
  icon?: string
  bannerColor: string
}

export const mockCommunities: Community[] = [
  {
    id: "home",
    name: "home",
    displayName: "Home",
    description: "Your personalized feed",
    memberCount: 0,
    isJoined: true,
    bannerColor: "bg-primary",
  },
  {
    id: "tech",
    name: "tech",
    displayName: "Technology",
    description: "Discuss the latest in technology, programming, and innovation",
    memberCount: 15420,
    isJoined: true,
    icon: "/technology-icon.png",
    bannerColor: "bg-blue-500",
  },
  {
    id: "design",
    name: "design",
    displayName: "Design",
    description: "UI/UX design, graphic design, and creative inspiration",
    memberCount: 8930,
    isJoined: false,
    icon: "/design-icon.png",
    bannerColor: "bg-purple-500",
  },
  {
    id: "photography",
    name: "photography",
    displayName: "Photography",
    description: "Share your photos and discuss photography techniques",
    memberCount: 12650,
    isJoined: true,
    icon: "/camera-icon.png",
    bannerColor: "bg-green-500",
  },
  {
    id: "startup",
    name: "startup",
    displayName: "Startups",
    description: "Entrepreneurship, startup stories, and business discussions",
    memberCount: 6780,
    isJoined: false,
    icon: "/startup-rocket-icon.png",
    bannerColor: "bg-orange-500",
  },
]

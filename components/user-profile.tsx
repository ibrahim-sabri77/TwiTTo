"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Calendar, MapPin, LinkIcon, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { signOut } from "firebase/auth"
import type { User } from "@/lib/auth"

interface UserProfileProps {
  user: User
  currentUser: User
  onBack: () => void
}

export function UserProfile({ user, currentUser, onBack }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fetch user data from Firebase
        const userDoc = await getDoc(doc(db, "users", user.id))
        if (userDoc.exists()) {
          setFirebaseUser(userDoc.data())
        }

        // Fetch user posts from Firebase
        const postsQuery = query(collection(db, "posts"), where("userId", "==", user.id))
        const postsSnapshot = await getDocs(postsQuery)
        const posts = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setUserPosts(posts)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user.id])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      onBack() // Return to main feed after logout
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Use Firebase user data if available, fallback to passed user data
  const displayUser = firebaseUser || user
  const userStats = {
    posts: userPosts.length,
    followers: displayUser.followers || user.followers || 1250,
    following: displayUser.following || 340,
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Back to Feed
      </Button>

      {/* Profile Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={displayUser.profileImage || displayUser.avatar || "/placeholder.svg"}
                alt={displayUser.name || displayUser.username}
              />
              <AvatarFallback className="text-2xl">
                {(displayUser.name || displayUser.username || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{displayUser.name || displayUser.username}</h1>
                {user.id !== currentUser.id && (
                  <Button variant={isFollowing ? "secondary" : "default"} onClick={() => setIsFollowing(!isFollowing)}>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
                {user.id === currentUser.id && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined{" "}
                    {displayUser.createdAt
                      ? formatDistanceToNow(new Date(displayUser.createdAt), { addSuffix: true })
                      : "recently"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-primary">portfolio.com</span>
                </div>
              </div>

              <p className="text-foreground mb-4">
                {displayUser.bio ||
                  "Passionate about technology, design, and building great products. Always learning and sharing knowledge with the community."}
              </p>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-semibold text-foreground">{userStats.posts}</span>
                  <span className="text-muted-foreground ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">{userStats.followers.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">{userStats.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts ({userStats.posts})</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <p className="text-foreground">{post.content}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  {post.createdAt && formatDistanceToNow(new Date(post.createdAt.toDate()), { addSuffix: true })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {displayUser.bio ||
                      "Full-stack developer with 5+ years of experience building web applications. Passionate about React, TypeScript, and creating great user experiences."}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">{displayUser.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

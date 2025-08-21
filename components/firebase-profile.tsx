"use client"
import { useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { signOut } from "firebase/auth"

export default function Profile({ userId }) {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      // جلب بيانات المستخدم
      const userDoc = await getDoc(doc(db, "users", userId))
      if (userDoc.exists()) setUser(userDoc.data())

      // جلب منشورات المستخدم
      const postsQuery = query(collection(db, "posts"), where("userId", "==", userId))
      const postsSnapshot = await getDocs(postsQuery)
      setPosts(postsSnapshot.docs.map((doc) => doc.data()))
    }
    fetchData()
  }, [userId])

  const handleLogout = async () => {
    await signOut(auth)
    // هنا ممكن توجه المستخدم لصفحة تسجيل الدخول
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="profile-popup">
      <img src={user.profileImage || "/default-avatar.png"} alt="Profile" className="profile-pic" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Posts</h3>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

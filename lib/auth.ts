// Authentication utilities and types
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export interface User {
  id: string
  username: string
  name?: string // Added name field to User interface
  email: string
  avatar?: string
  createdAt: Date
  followers?: number // Added followers field
  isVerified?: boolean // Added verification status field
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock authentication functions - to be replaced with real implementation
export const mockUsers: User[] = [
  {
    id: "1",
    username: "ibrahimsabry_7", // Updated username to ibrahimsabry_7
    name: "HeMa", // Added name as HeMa
    email: "john@example.com",
    avatar: "/diverse-user-avatars.png",
    createdAt: new Date("2024-01-01"),
    followers: 1000000, // Updated to 1 million followers
    isVerified: true, // Added verification status for main user
  },
  {
    id: "2",
    username: "janedoe",
    name: "Jane Doe", // Added name for consistency
    email: "jane@example.com",
    avatar: "/female-user-avatar.png",
    createdAt: new Date("2024-01-15"),
    followers: 1500,
    isVerified: false, // Added verification status
  },
]

export async function signIn(email: string, password: string): Promise<User | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return {
        id: firebaseUser.uid,
        username: userData.username || firebaseUser.email?.split("@")[0] || "",
        name: userData.name || "",
        email: firebaseUser.email || "",
        avatar: userData.avatar || "/abstract-user-avatar.png",
        createdAt: userData.createdAt?.toDate() || new Date(),
        followers: userData.followers || 0,
        isVerified: userData.isVerified || false,
      }
    }
    return null
  } catch (error) {
    console.error("[v0] Sign in error:", error)
    return null
  }
}

export async function signUp(username: string, email: string, password: string): Promise<User | null> {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Create user document in Firestore
    const userData = {
      uid: firebaseUser.uid,
      username,
      name: username,
      email,
      avatar: "/abstract-user-avatar.png",
      createdAt: new Date(),
      followers: 0,
      isVerified: false,
    }

    await setDoc(doc(db, "users", firebaseUser.uid), userData)

    return {
      id: firebaseUser.uid,
      username,
      name: username,
      email,
      avatar: "/abstract-user-avatar.png",
      createdAt: new Date(),
      followers: 0,
      isVerified: false,
    }
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    return null
  }
}

export function signOut(): void {
  firebaseSignOut(auth).catch((error) => {
    console.error("[v0] Sign out error:", error)
  })
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const user: User = {
          id: firebaseUser.uid,
          username: userData.username || firebaseUser.email?.split("@")[0] || "",
          name: userData.name || "",
          email: firebaseUser.email || "",
          avatar: userData.avatar || "/abstract-user-avatar.png",
          createdAt: userData.createdAt?.toDate() || new Date(),
          followers: userData.followers || 0,
          isVerified: userData.isVerified || false,
        }
        callback(user)
      } else {
        callback(null)
      }
    } else {
      callback(null)
    }
  })
}

export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = auth.currentUser
  if (!firebaseUser) return null

  const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
  if (userDoc.exists()) {
    const userData = userDoc.data()
    return {
      id: firebaseUser.uid,
      username: userData.username || firebaseUser.email?.split("@")[0] || "",
      name: userData.name || "",
      email: firebaseUser.email || "",
      avatar: userData.avatar || "/abstract-user-avatar.png",
      createdAt: userData.createdAt?.toDate() || new Date(),
      followers: userData.followers || 0,
      isVerified: userData.isVerified || false,
    }
  }
  return null
}

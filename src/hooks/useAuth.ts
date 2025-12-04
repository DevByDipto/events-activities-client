import React, { useCallback, useState, createContext, useContext } from 'react'
import { User, AuthContextType } from '../types'
import { mockUsers } from '../utils/mockData'
const AuthContext = createContext<AuthContextType | undefined>(undefined)
interface AuthProviderProps {
  children: ReactNode
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      const foundUser = mockUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      )
      if (foundUser && !foundUser.isBlocked) {
        setUser(foundUser)
        return true
      }
      return false
    },
    [],
  )
  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      // Check if email already exists
      const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      )
      if (existingUser) {
        return false
      }
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        interests: [],
        role: 'USER',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      // In real app, this would be saved to database
      mockUsers.push(newUser)
      setUser(newUser)
      return true
    },
    [],
  )
  const logout = useCallback(() => {
    setUser(null)
  }, [])
  const updateUser = useCallback(
    (updates: Partial<User>) => {
      if (user) {
        const updatedUser = {
          ...user,
          ...updates,
          updatedAt: new Date(),
        }
        setUser(updatedUser)
        // Update in mock data
        const index = mockUsers.findIndex((u) => u.id === user.id)
        if (index !== -1) {
          mockUsers[index] = updatedUser
        }
      }
    },
    [user],
  )
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

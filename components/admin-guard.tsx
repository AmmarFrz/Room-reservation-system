"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Periksa session di localStorage
    const checkAuth = () => {
      const session = localStorage.getItem("adminSession")
      if (session) {
        try {
          const sessionData = JSON.parse(session)
          // Validasi session
          if (sessionData.token && sessionData.email === "admin@uii.ac.id") {
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem("adminSession")
            router.push("/login")
          }
        } catch {
          localStorage.removeItem("adminSession")
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          </div>
          <p className="mt-4 text-muted-foreground font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

"use client"

import { useState, useEffect } from "react"

export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkAdminStatus = () => {
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("adminSession")
        setIsAdmin(!!session)
      }
      setIsLoaded(true)
    }

    checkAdminStatus()

    const handleStorageChange = () => {
      checkAdminStatus()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const logout = () => {
    localStorage.removeItem("adminSession")
    setIsAdmin(false)
  }

  return { isAdmin, isLoaded, logout }
}

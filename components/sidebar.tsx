"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Calendar, FileText, BarChart3, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
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

    // Listen for storage changes (e.g., logout from another tab)
    const handleStorageChange = () => {
      checkAdminStatus()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const baseNavItems = [
    { href: "/calendar", label: "Kalender", icon: Calendar },
    { href: "/booking", label: "Form Peminjaman", icon: FileText },
  ]

  const navItems = isAdmin ? [...baseNavItems, { href: "/admin", label: "Admin", icon: BarChart3 }] : baseNavItems

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    setIsAdmin(false)
    router.push("/")
  }

  // Wait for client-side hydration before rendering
  if (!isLoaded) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-16 bg-primary text-primary-foreground flex flex-col items-center py-6 gap-6 shadow-lg">
        <Link
          href="/"
          className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg hover:bg-secondary/80 transition"
          title="Beranda"
        >
          <span className="text-xl font-bold">📋</span>
        </Link>
      </aside>
    )
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-primary text-primary-foreground flex flex-col items-center py-6 gap-6 shadow-lg">
      <Link
        href="/"
        className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg hover:bg-secondary/80 transition"
        title="Beranda"
      >
        <span className="text-xl font-bold">📋</span>
      </Link>

      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
              pathname === href
                ? "bg-secondary text-secondary-foreground shadow-md"
                : "text-primary-foreground hover:bg-primary/80"
            }`}
            title={label}
          >
            <Icon size={24} />
          </Link>
        ))}
      </nav>

      {isAdmin && (
        <button
          onClick={handleLogout}
          className="w-12 h-12 rounded-lg flex items-center justify-center bg-destructive/20 text-destructive hover:bg-destructive/30 transition"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      )}

      {!isAdmin && (
        <Link
          href="/login"
          className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center hover:bg-secondary/30 transition"
          title="Login Admin"
        >
          <span className="text-lg">🔐</span>
        </Link>
      )}
    </aside>
  )
}

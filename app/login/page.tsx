"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validasi input
    if (!email || !password) {
      setError("Email dan password harus diisi")
      setIsLoading(false)
      return
    }

    // Demo: Admin credentials
    // Email: admin@uii.ac.id, Password: admin123
    if (email === "admin@uii.ac.id" && password === "admin123") {
      // Simpan session ke localStorage
      const sessionData = {
        email,
        loginTime: new Date().toISOString(),
        token: Math.random().toString(36).substring(2),
      }
      localStorage.setItem("adminSession", JSON.stringify(sessionData))
      router.push("/admin")
    } else {
      setError("Email atau password salah")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 p-4 rounded-xl mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Login Admin</h1>
            <p className="text-muted-foreground">Masuk ke sistem manajemen ruangan</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@uii.ac.id"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder:text-muted-foreground transition"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder:text-muted-foreground transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Note */}
            <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Demo Login:</span>
                <br />
                Email: <code className="bg-muted px-2 py-1 rounded text-xs">admin@uii.ac.id</code>
                <br />
                Password: <code className="bg-muted px-2 py-1 rounded text-xs">admin123</code>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-primary hover:underline text-sm font-medium">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

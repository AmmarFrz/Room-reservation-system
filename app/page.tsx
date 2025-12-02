import Link from "next/link"
import { Calendar, FileText, BarChart3, LogIn } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 flex-1">
        <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-secondary/20 px-4 py-2 rounded-full mb-4">
                <p className="text-sm font-semibold text-secondary">Universitas Islam Indonesia</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Sistem Peminjaman Ruangan</h1>
              <p className="text-lg text-muted-foreground text-balance">
                Platform untuk mempermudah reservasi dan manajemen peminjaman ruangan
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link href="/calendar" className="group">
                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-secondary/50">
                  <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition">
                    <Calendar className="text-secondary" size={32} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Kalender</h2>
                  <p className="text-muted-foreground">Lihat jadwal dan ketersediaan ruangan</p>
                </div>
              </Link>

              <Link href="/booking" className="group">
                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-accent/50">
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition">
                    <FileText className="text-accent" size={32} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Peminjaman</h2>
                  <p className="text-muted-foreground">Form peminjaman ruangan baru</p>
                </div>
              </Link>

              <Link href="/admin" className="group">
                <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/50">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                    <BarChart3 className="text-primary" size={32} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Admin</h2>
                  <p className="text-muted-foreground">Kelola semua peminjaman ruangan</p>
                </div>
              </Link>
            </div>

            <div className="flex justify-center">
              <Link href="/login" className="group">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-dashed border-primary/30 rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary/60 max-w-md">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition">
                      <LogIn className="text-primary" size={32} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1">Admin Login</h2>
                      <p className="text-muted-foreground">Akses panel administrator</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

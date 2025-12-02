"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AdminGuard } from "@/components/admin-guard"
import { Checkbox } from "@/components/ui/checkbox"
import { useBooking } from "@/context/booking-context"

function AdminContent() {
  const { bookings, updateBookingStatus } = useBooking()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleApprove = (id: string) => {
    updateBookingStatus(id, "approved")
  }

  const handleReject = (id: string) => {
    updateBookingStatus(id, "rejected")
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(bookings.map((b) => b.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((sid) => sid !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded">✓ Disetujui</span>
      case "rejected":
        return (
          <span className="px-3 py-1 bg-destructive/20 text-destructive text-xs font-semibold rounded">✗ Ditolak</span>
        )
      default:
        return (
          <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded">⏳ Pending</span>
        )
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    } catch {
      return dateString
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 flex-1">
        <div className="min-h-screen bg-background p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                  Halaman Admin
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Daftar Peminjaman Ruangan</h1>
              </div>
              <p className="text-muted-foreground">Admin Sistem Reservasi Ruangan Universitas Islam Indonesia</p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Tidak ada peminjaman ruangan</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        <th className="px-4 py-3 text-left">
                          <Checkbox
                            checked={selectedIds.length === bookings.length && bookings.length > 0}
                            onChange={(checked) => handleSelectAll(checked as boolean)}
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Ruangan</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Hari & Tanggal</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Waktu</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Instansi</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, idx) => (
                        <tr
                          key={booking.id}
                          className={`border-b border-border ${idx % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-muted/50 transition`}
                        >
                          <td className="px-4 py-3">
                            <Checkbox
                              checked={selectedIds.includes(booking.id)}
                              onChange={(checked) => handleSelectOne(booking.id, checked as boolean)}
                            />
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">{booking.room}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(booking.startDate)}</td>
                          <td className="px-4 py-3 text-sm">
                            {booking.startTime} - {booking.endTime}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <a href="#" className="text-secondary underline hover:no-underline">
                              {booking.institution}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-sm">{getStatusBadge(booking.status)}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(booking.id)}
                                disabled={booking.status === "approved"}
                                className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Setuju
                              </button>
                              <button
                                onClick={() => handleReject(booking.id)}
                                disabled={booking.status === "rejected"}
                                className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Tolak
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  )
}

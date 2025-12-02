"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useBooking } from "@/context/booking-context"

export default function BookingPage() {
  const router = useRouter()
  const { addBooking } = useBooking()

  const [formData, setFormData] = useState({
    faculty: "",
    floor: "",
    room: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    responsible: "",
    institution: "",
    contact: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)

    addBooking({
      faculty: formData.faculty,
      floor: formData.floor,
      room: formData.room,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      responsible: formData.responsible,
      institution: formData.institution,
      contact: formData.contact,
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      handleReset()
    }, 2000)
  }

  const handleReset = () => {
    setFormData({
      faculty: "",
      floor: "",
      room: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      purpose: "",
      responsible: "",
      institution: "",
      contact: "",
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 flex-1">
        <div className="min-h-screen bg-background p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Header
              title="Formulir Peminjaman Ruangan"
              subtitle="Sistem Reservasi Ruangan Universitas Islam Indonesia"
            />

            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold mb-2">
                        Dropdown
                      </span>
                      Pilih Fakultas
                    </label>
                    <select
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="">Pilih Fakultas</option>
                      <option>FTI</option>
                      <option>FEB</option>
                      <option>FHIS</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">*Gedung Fakultas yang akan digunakan</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Pilih Lantai</label>
                    <select
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="">Pilih Lantai</option>
                      <option>Lantai 1</option>
                      <option>Lantai 2</option>
                      <option>Lantai 3</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Jam Mulai</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Jam Selesai</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                {/* Room Image and Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Pilih Ruangan</label>
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden mb-4">
                    <img
                      src="/modern-office-meeting-room.png"
                      alt="Room selection"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-lg font-semibold text-sm">
                      04:16
                    </div>
                  </div>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Pilih Ruangan</option>
                    <option>FTI-1</option>
                    <option>FTI-2</option>
                    <option>FTI-3</option>
                    <option>Hall P</option>
                    <option>Musholla</option>
                  </select>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tanggal Mulai</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Tanggal Selesai</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Tujuan Peminjaman</label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Jelaskan tujuan peminjaman ruangan"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                  />
                </div>

                {/* Penanggung Jawab */}
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Penanggung Jawab</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Instansi</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="Contoh: DPPAI UII"
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Nama Lengkap Penanggung Jawab</label>
                      <input
                        type="text"
                        name="responsible"
                        value={formData.responsible}
                        onChange={handleChange}
                        placeholder="Nama lengkap"
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Kontak Penanggung Jawab (Whatsapp)</label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Nomor WhatsApp"
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-success/20 border border-success rounded-lg p-4 text-success">
                    <p className="font-semibold">✓ Formulir berhasil dikirim! Mengarahkan ke dashboard...</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="reset"
                    onClick={handleReset}
                    className="px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

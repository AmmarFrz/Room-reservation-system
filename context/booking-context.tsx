"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface BookingData {
  id: string
  faculty: string
  floor: string
  room: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  purpose: string
  responsible: string
  institution: string
  contact: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

interface BookingContextType {
  bookings: BookingData[]
  addBooking: (booking: Omit<BookingData, "id" | "status" | "createdAt">) => void
  updateBookingStatus: (id: string, status: "approved" | "rejected") => void
  deleteBooking: (id: string) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem("bookings")
    if (saved) {
      setBookings(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  // Simpan ke localStorage setiap kali bookings berubah
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookings", JSON.stringify(bookings))
    }
  }, [bookings, isLoaded])

  const addBooking = (booking: Omit<BookingData, "id" | "status" | "createdAt">) => {
    const newBooking: BookingData = {
      ...booking,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }
    setBookings([...bookings, newBooking])
  }

  const updateBookingStatus = (id: string, status: "approved" | "rejected") => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id))
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking harus digunakan dalam BookingProvider")
  }
  return context
}

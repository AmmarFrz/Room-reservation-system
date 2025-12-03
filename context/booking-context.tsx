"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiService } from "@/lib/api"

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
  addBooking: (booking: Omit<BookingData, "id" | "status" | "createdAt">) => Promise<void>
  updateBookingStatus: (id: string, status: "approved" | "rejected") => Promise<void>
  deleteBooking: (id: string) => Promise<void>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<BookingData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load dari API dan localStorage saat mount
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true)
      try {
        // Try API first
        const apiBookings = await apiService.getBookings()
        if (apiBookings && apiBookings.length > 0) {
          setBookings(apiBookings)
          // Save to localStorage as backup
          localStorage.setItem("bookings", JSON.stringify(apiBookings))
        } else {
          // Jika API return empty, gunakan localStorage
          throw new Error("No bookings from API, using localStorage")
        }
      } catch (error) {
        // Fallback ke localStorage jika API gagal
        console.log("[v0] Using localStorage as fallback")
        const saved = localStorage.getItem("bookings")
        if (saved) {
          try {
            setBookings(JSON.parse(saved))
          } catch (parseError) {
            console.error("[v0] Failed to parse localStorage:", parseError)
            setBookings([])
          }
        } else {
          setBookings([])
        }
      } finally {
        setIsLoading(false)
        setIsLoaded(true)
      }
    }

    loadBookings()
  }, [])

  useEffect(() => {
    if (isLoaded && !isLoading) {
      localStorage.setItem("bookings", JSON.stringify(bookings))
    }
  }, [bookings, isLoaded, isLoading])

  const addBooking = async (booking: Omit<BookingData, "id" | "status" | "createdAt">) => {
    try {
      const newBooking = await apiService.createBooking(booking)
      setBookings([...bookings, newBooking])
    } catch (error) {
      // Fallback to local storage
      const localBooking: BookingData = {
        ...booking,
        id: Date.now().toString(),
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      setBookings([...bookings, localBooking])
    }
  }

  const updateBookingStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await apiService.updateBookingStatus(id, status)
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
    } catch (error) {
      // Fallback to local update
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      await apiService.deleteBooking(id)
      setBookings(bookings.filter((b) => b.id !== id))
    } catch (error) {
      // Fallback to local delete
      setBookings(bookings.filter((b) => b.id !== id))
    }
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

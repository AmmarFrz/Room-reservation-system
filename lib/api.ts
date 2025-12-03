"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://uiispace.onrender.com/api"
const API_TIMEOUT = 5000 // 5 seconds timeout

export interface ApiBooking {
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

class ApiService {
  private baseUrl: string
  private abortControllers: Map<string, AbortController> = new Map()

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async fetchWithTimeout(url: string, options: RequestInit = {}) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType?.includes("application/json")) {
        return await response.json()
      }

      return null
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("API request timeout")
      }
      throw error
    }
  }

  async getBookings(): Promise<ApiBooking[]> {
    try {
      const data = await this.fetchWithTimeout(`${this.baseUrl}/bookings`)
      return data?.data || data || []
    } catch (error) {
      return []
    }
  }

  async createBooking(booking: Omit<ApiBooking, "id" | "status" | "createdAt">): Promise<ApiBooking> {
    try {
      const data = await this.fetchWithTimeout(`${this.baseUrl}/bookings`, {
        method: "POST",
        body: JSON.stringify({
          ...booking,
          status: "pending",
        }),
      })
      return (
        data?.data || { id: Date.now().toString(), ...booking, status: "pending", createdAt: new Date().toISOString() }
      )
    } catch (error) {
      return {
        id: Date.now().toString(),
        ...booking,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
    }
  }

  async updateBookingStatus(id: string, status: "approved" | "rejected"): Promise<ApiBooking> {
    try {
      const data = await this.fetchWithTimeout(`${this.baseUrl}/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      return data?.data || data
    } catch (error) {
      console.error("[v0] Error updating booking status:", error)
      throw error
    }
  }

  async deleteBooking(id: string): Promise<void> {
    try {
      await this.fetchWithTimeout(`${this.baseUrl}/bookings/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("[v0] Error deleting booking:", error)
      throw error
    }
  }
}

export const apiService = new ApiService(API_BASE_URL)

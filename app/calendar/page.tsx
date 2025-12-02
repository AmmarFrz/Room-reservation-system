"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useBooking } from "@/context/booking-context"

interface TimeSlot {
  time: string
  events: Array<{ room: string; title: string; duration: string; responsible: string }>
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 2))
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [selectedFloor, setSelectedFloor] = useState("")
  const { bookings } = useBooking()

  const rooms = ["FTI-1", "FTI-2", "FTI-3", "Hall P", "Hall", "Musholla", "02.32"]

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: { [key: string]: TimeSlot } = {}

    // Initialize all time slots
    for (let hour = 7; hour < 22; hour++) {
      const timeStr = `${String(hour).padStart(2, "0")}:00`
      slots[timeStr] = { time: timeStr, events: [] }
    }

    // Add approved bookings to calendar
    const approvedBookings = bookings.filter((b) => b.status === "approved")
    approvedBookings.forEach((booking) => {
      const bookingDate = new Date(booking.startDate)
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      const bookingDateOnly = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate())

      // Check if booking is for current date
      if (bookingDateOnly.getTime() === currentDateOnly.getTime()) {
        // Check faculty and floor filters
        if (selectedFaculty && booking.faculty !== selectedFaculty) return
        if (selectedFloor && booking.floor !== selectedFloor) return

        const startHour = Number.parseInt(booking.startTime.split(":")[0])
        const endHour = Number.parseInt(booking.endTime.split(":")[0])
        const startTimeStr = `${String(startHour).padStart(2, "0")}:00`

        if (slots[startTimeStr]) {
          slots[startTimeStr].events.push({
            room: booking.room,
            title: booking.purpose || "Peminjaman Ruangan",
            duration: `${booking.startTime} - ${booking.endTime}`,
            responsible: booking.responsible,
          })
        }
      }
    })

    return Object.values(slots)
  }

  const timeSlots = generateTimeSlots()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handlePrevDay = () => {
    setCurrentDate(new Date(currentDate.getTime() - 86400000))
  }

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.getTime() + 86400000))
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 flex-1">
        <div className="min-h-screen bg-background p-4 md:p-8">
          <div className="max-w-full mx-auto">
            <Header title="Kalender" subtitle="Sistem Reservasi Ruangan Universitas Islam Indonesia" />

            <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button onClick={handlePrevDay} className="p-2 hover:bg-muted rounded-lg transition flex-shrink-0">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="text-center flex-1 md:flex-none md:min-w-[250px]">
                    <p className="text-sm text-muted-foreground">Tanggal</p>
                    <p className="text-lg font-semibold">{formatDate(currentDate)}</p>
                  </div>
                  <button onClick={handleNextDay} className="p-2 hover:bg-muted rounded-lg transition flex-shrink-0">
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="flex-1 md:flex-none px-4 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  >
                    <option value="">Pilih Fakultas</option>
                    <option value="FTI">FTI</option>
                    <option value="FEB">FEB</option>
                    <option value="FIPP">FIPP</option>
                  </select>
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="flex-1 md:flex-none px-4 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  >
                    <option value="">Pilih Lantai</option>
                    <option value="Lantai 1">Lantai 1</option>
                    <option value="Lantai 2">Lantai 2</option>
                    <option value="Lantai 3">Lantai 3</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto border border-border rounded-lg">
              <div className="min-w-max p-4">
                {/* Room Headers */}
                <div className="flex gap-1 mb-4">
                  <div className="w-20 flex-shrink-0"></div>
                  {rooms.map((room) => (
                    <div
                      key={room}
                      className="w-28 flex-shrink-0 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold text-xs md:text-sm text-center"
                    >
                      {room}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((slot) => (
                  <div key={slot.time} className="flex gap-1 mb-2">
                    <div className="w-20 flex-shrink-0 px-3 py-2 font-mono text-xs md:text-sm text-muted-foreground">
                      {slot.time}
                    </div>
                    {rooms.map((room) => {
                      const event = slot.events.find((e) => e.room === room)
                      return (
                        <div
                          key={`${slot.time}-${room}`}
                          className="w-28 flex-shrink-0 px-3 py-2 bg-muted border border-border rounded min-h-12 flex items-center"
                        >
                          {event && (
                            <div className="w-full bg-primary/20 border-l-4 border-primary rounded px-2 py-1">
                              <p className="text-xs font-semibold text-primary">{event.title}</p>
                              <p className="text-xs text-muted-foreground">{event.duration}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                oleh: <span className="font-semibold">{event.responsible}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                Total peminjaman yang disetujui:{" "}
                <span className="font-semibold text-foreground">
                  {bookings.filter((b) => b.status === "approved").length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

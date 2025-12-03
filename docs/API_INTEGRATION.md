# API Integration Documentation

## Overview
Sistem Room Reservation ini telah diintegrasikan dengan backend API di `https://uiispace.onrender.com`.

## Configuration

### Environment Variables
Tambahkan ke file `.env.local`:
\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://uiispace.onrender.com/api
\`\`\`

Jika tidak dikonfigurasi, aplikasi akan menggunakan default `https://uiispace.onrender.com/api`.

## API Endpoints

### 1. Get All Bookings
**Endpoint:** `GET /api/bookings`

**Description:** Mengambil semua data peminjaman ruangan

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "faculty": "string",
      "floor": "string",
      "room": "string",
      "startDate": "string (YYYY-MM-DD)",
      "endDate": "string (YYYY-MM-DD)",
      "startTime": "string (HH:mm)",
      "endTime": "string (HH:mm)",
      "purpose": "string",
      "responsible": "string",
      "institution": "string",
      "contact": "string (phone/email)",
      "status": "pending|approved|rejected",
      "createdAt": "string (ISO 8601)"
    }
  ]
}
\`\`\`

### 2. Create Booking
**Endpoint:** `POST /api/bookings`

**Description:** Membuat peminjaman ruangan baru

**Request Body:**
\`\`\`json
{
  "faculty": "string (required)",
  "floor": "string (required)",
  "room": "string (required)",
  "startDate": "string (required, YYYY-MM-DD)",
  "endDate": "string (required, YYYY-MM-DD)",
  "startTime": "string (required, HH:mm)",
  "endTime": "string (required, HH:mm)",
  "purpose": "string (required)",
  "responsible": "string (required)",
  "institution": "string (required)",
  "contact": "string (required)"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "pending",
    "createdAt": "string"
  }
}
\`\`\`

### 3. Update Booking Status
**Endpoint:** `PATCH /api/bookings/{id}`

**Description:** Mengubah status peminjaman (untuk admin)

**Request Body:**
\`\`\`json
{
  "status": "approved|rejected (required)"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "approved|rejected",
    "updatedAt": "string"
  }
}
\`\`\`

### 4. Delete Booking
**Endpoint:** `DELETE /api/bookings/{id}`

**Description:** Menghapus peminjaman

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Booking deleted successfully"
}
\`\`\`

## Error Handling

Aplikasi mempunyai fallback mechanism:
- Jika API timeout (5 detik), sistem akan menggunakan localStorage
- Jika API error, sistem tetap menyimpan data ke localStorage
- Data akan disinkronisasi ke API ketika koneksi kembali normal

## CORS Requirements

Backend API harus mengizinkan CORS dari frontend dengan headers:
\`\`\`
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
\`\`\`

## Testing API Connection

Untuk debug koneksi API, cek browser console (F12) untuk pesan error.

Jika melihat error "Failed to fetch", kemungkinan:
1. API server sedang offline
2. CORS tidak dikonfigurasi di backend
3. URL API salah di `.env.local`
4. Firewall/proxy memblokir request

## Local Development

Saat development, aplikasi akan:
1. Coba fetch dari API
2. Jika gagal, fallback ke localStorage
3. Data localStorage akan tetap persisten meski browser di-refresh

Untuk force menggunakan localStorage, comment line di `lib/api.ts`:
\`\`\`typescript
// const apiService = new ApiService(API_BASE_URL)
// Ganti dengan: const apiService = new ApiService("") // empty URL

# Room Reservation System - Setup Guide

## Quick Start

Ikuti langkah-langkah berikut untuk setup project di komputer Anda atau teman Anda.

### 1. Clone Project

\`\`\`bash
# Copy project dari v0 atau download ZIP
# Jika menggunakan ZIP, extract ke folder yang diinginkan
cd room-reservation-system
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables

\`\`\`bash
# Copy file .env.local.example ke .env.local
cp .env.local.example .env.local

# Edit .env.local dan sesuaikan nilai-nilainya (opsional)
# Jika tidak ada API backend, sistem akan menggunakan localStorage
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Buka browser dan akses: `http://localhost:3000`

---

## Login Credentials

### Admin Dashboard
- Email: `admin@uii.ac.id`
- Password: `admin123`

**Note:** Login credentials ini adalah untuk demo/testing saja. Ubah di production!

---

## Fitur-Fitur

### 1. Kalender (Calendar)
- Lihat jadwal ruangan berdasarkan tanggal dan waktu
- Filter berdasarkan fakultas dan lantai
- Tampil peminjaman yang sudah di-approve admin

### 2. Form Peminjaman (Booking Form)
- Isi formulir untuk meinjam ruangan
- Data otomatis tersimpan di Admin Dashboard
- Status awal: "Pending" menunggu approval admin

### 3. Admin Dashboard
- Login dengan kredensial admin
- Lihat daftar semua peminjaman
- Approve atau Reject peminjaman
- Peminjaman yang di-approve langsung muncul di Kalender

---

## Data Storage

Sistem ini menggunakan 2 metode penyimpanan data:

1. **localStorage** (Default)
   - Data tersimpan di browser
   - Tidak perlu backend API
   - Data hilang jika browser cache dihapus

2. **Backend API** (Optional)
   - Jika `NEXT_PUBLIC_API_BASE_URL` diset
   - Data tersimpan di server
   - Persistent dan bisa diakses dari device lain

---

## Troubleshooting

### Error: "Failed to fetch"
- Ini normal jika tidak ada backend API
- Sistem akan fallback ke localStorage
- Data tetap tersimpan dan berfungsi dengan baik

### Login tidak berfungsi
- Clear browser cache/cookies
- Coba buka di incognito/private mode
- Pastikan credentials benar: `admin@uii.ac.id` / `admin123`

### Data tidak tersimpan
- Pastikan localStorage tidak di-disable di browser
- Coba di browser lain atau device lain
- Check apakah ada extension yang blocking storage

---

## Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Set environment variables di Vercel dashboard
5. Deploy

### Environment Variables untuk Production
\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://your-api.com/api
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
\`\`\`

---

## Project Structure

\`\`\`
.
├── app/
│   ├── page.tsx              # Home page
│   ├── login/                # Admin login page
│   ├── calendar/             # Calendar/Schedule view
│   ├── booking/              # Booking form page
│   ├── admin/                # Admin dashboard (protected)
│   └── layout.tsx            # Root layout
├── components/
│   ├── sidebar.tsx           # Navigation sidebar
│   ├── header.tsx            # Header component
│   ├── admin-guard.tsx       # Admin protection middleware
│   └── ui/                   # shadcn/ui components
├── context/
│   └── booking-context.tsx   # State management untuk bookings
├── hooks/
│   ├── use-admin-status.ts   # Custom hook untuk admin status
│   └── use-mobile.ts         # Mobile detection hook
├── lib/
│   ├── api.ts                # API service layer
│   └── utils.ts              # Utility functions
└── docs/
    ├── SETUP_GUIDE.md        # Setup guide (file ini)
    └── API_INTEGRATION.md    # API integration guide
\`\`\`

---

## Support

Jika ada pertanyaan atau masalah, hubungi developer atau buka issue di GitHub.

---

## License

Copyright © 2025 Room Reservation System. All rights reserved.

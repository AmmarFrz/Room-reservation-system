# Sistem Peminjaman Ruangan - Dokumentasi

Sistem manajemen peminjaman ruangan untuk Universitas Islam Indonesia.

## 📋 Fitur Utama

### 1. **Kalender (Calendar Page)**
- Tampilan jadwal ruangan per hari
- Filter berdasarkan fakultas dan lantai
- Navigasi tanggal sebelum dan sesudah
- Tampilan real-time peminjaman yang sudah disetujui

**Path:** `/calendar`

### 2. **Form Peminjaman (Booking Form)**
- Form lengkap untuk mengajukan peminjaman ruangan
- Input: Fakultas, Lantai, Ruangan, Tanggal, Waktu, Tujuan, Nama Penanggung Jawab, Institusi, Kontak
- Data otomatis tersimpan di localStorage dan muncul di Admin Dashboard
- Status default: "Pending"

**Path:** `/booking`

### 3. **Admin Dashboard**
- Tabel daftar semua peminjaman ruangan
- Fitur approve/reject peminjaman
- Filter berdasarkan status (pending, approved, rejected)
- Checkbox untuk seleksi multiple
- Hanya bisa diakses oleh admin yang sudah login

**Path:** `/admin`

### 4. **Login Admin**
- Halaman login untuk admin
- Demo credentials:
  - Email: `admin@uii.ac.id`
  - Password: `admin123`
- Session tersimpan di localStorage

**Path:** `/login`

## 🔐 Sistem Keamanan

### Admin Guard
- Component yang melindungi halaman admin
- Redirect otomatis ke login jika session tidak ditemukan
- Validasi email dan token saat akses

### Conditional Sidebar
- Link admin hanya muncul untuk user yang sudah login
- Button login untuk user yang belum login
- Logout button untuk admin yang sudah login

## 🔄 Alur Data

### User Flow
1. User membuka halaman Kalender → lihat jadwal ruangan
2. User membuka Form Peminjaman → mengisi form
3. User submit form → data tersimpan di context dan localStorage
4. Data otomatis muncul di Admin Dashboard (status: pending)

### Admin Flow
1. Admin login dengan kredensial
2. Admin membuka Dashboard → lihat semua peminjaman
3. Admin click "Setuju" → status berubah menjadi "approved"
4. Peminjaman yang approved otomatis tampil di Kalender

## 📦 Teknologi yang Digunakan

- **Next.js 16** - Framework React
- **React Context API** - State management
- **localStorage** - Data persistence
- **Tailwind CSS** - Styling
- **lucide-react** - Icons

## 🗂️ Struktur File

\`\`\`
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout dengan BookingProvider
│   ├── globals.css           # Global styles
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── calendar/
│   │   └── page.tsx          # Calendar page
│   ├── booking/
│   │   └── page.tsx          # Booking form page
│   └── admin/
│       └── page.tsx          # Admin dashboard (protected)
├── components/
│   ├── sidebar.tsx           # Sidebar navigation
│   ├── header.tsx            # Header component
│   ├── admin-guard.tsx       # Admin protection wrapper
│   └── ui/
│       └── checkbox.tsx      # Checkbox component
├── context/
│   └── booking-context.tsx   # Booking state management
└── hooks/
    └── use-admin-status.ts   # Admin status hook
\`\`\`

## 🎨 Color Scheme

- **Primary:** `#1a4a7a` (Biru Tua)
- **Secondary:** `#f97316` (Oranye Hangat)
- **Background:** `#ffffff` (Putih)
- **Muted:** `#f5f5f5` (Abu-abu Terang)

## 🚀 Cara Menggunakan

### Untuk User Biasa
1. Buka halaman Kalender untuk melihat jadwal
2. Pergi ke Form Peminjaman untuk membuat reservasi baru
3. Isi semua field yang required
4. Click "Submit" - data langsung tersimpan

### Untuk Admin
1. Click login di sidebar (icon 🔐)
2. Masuk dengan email: `admin@uii.ac.id`, password: `admin123`
3. Pergi ke Admin Dashboard (muncul di sidebar setelah login)
4. Lihat semua peminjaman yang pending
5. Click "Setuju" untuk approve peminjaman
6. Peminjaman yang approved akan muncul di Kalender
7. Click logout untuk keluar

## 📱 Responsivitas

Semua halaman telah dioptimalkan untuk:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🔧 Troubleshooting

### Admin link tidak muncul di sidebar
- Pastikan sudah login di halaman login
- Check localStorage apakah "adminSession" tersimpan
- Refresh browser

### Peminjaman tidak muncul di kalender
- Pastikan status peminjaman sudah "approved"
- Check tanggal peminjaman sesuai dengan tanggal di kalender
- Bersihkan filter fakultas/lantai jika ada

### Data hilang setelah refresh
- Data seharusnya tersimpan di localStorage
- Check apakah browser menghapus localStorage (private mode)
- Coba buka di mode normal

## 📞 Demo Data

Untuk testing, gunakan data berikut:

**Admin Login:**
\`\`\`
Email: admin@uii.ac.id
Password: admin123
\`\`\`

**Contoh Peminjaman:**
\`\`\`
Fakultas: FTI
Lantai: Lantai 1
Ruangan: FTI-1
Tanggal: 26 Desember 2025
Waktu: 10:00 - 12:00
Tujuan: Workshop Design Thinking
Nama PJ: Ammar
Institusi: UII
Kontak: 081234567890
\`\`\`

## ✨ Fitur Tambahan yang Bisa Dikembangkan

- [ ] Database integration (Supabase/Neon)
- [ ] Email notification untuk approval
- [ ] Export peminjaman ke PDF/Excel
- [ ] Multiple admin users
- [ ] QR Code untuk check-in ruangan
- [ ] Laporan statistik peminjaman
- [ ] Calendar sync dengan Google Calendar
- [ ] Mobile app version

---

Dibuat untuk Universitas Islam Indonesia

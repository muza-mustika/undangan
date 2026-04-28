# Wedding Invitation App - React Version

Aplikasi undangan pernikahan digital yang modern dan elegan dibangun dengan React, TypeScript, dan Tailwind CSS.

## 🌟 Fitur Utama

- ✨ **Dashboard Admin** - Interface modern untuk mengelola undangan
- 📝 **Form Pembuatan Undangan** - Form intuitif dengan validasi
- 🖼️ **Upload Foto** - Support cover image dan galeri foto
- 📱 **Responsive Design** - Tampilan sempurna di semua perangkat
- 💌 **RSVP System** - Konfirmasi kehadiran tamu
- 🗺️ **Google Maps Integration** - Embed peta lokasi acara
- 🔗 **Shareable Links** - Bagikan undangan dengan link unik
- 🎨 **Modern UI** - Desain elegan dengan animasi dan interaksi
- 📊 **Statistics** - Dashboard dengan statistik undangan

## 🚀 Teknologi

### Frontend
- **React 18** - Modern React dengan hooks
- **TypeScript** - Type safety dan better DX
- **Vite** - Fast build tool dan development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **Framer Motion** - Animasi dan transisi
- **Radix UI** - Headless UI components

### UI Components
- **shadcn/ui** - Beautiful and accessible components
- **Class Variance Authority** - Component variants
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📦 Instalasi

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd wedding-invitation-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   Akses aplikasi di `http://localhost:5173`

### Build untuk Production
```bash
npm run build
npm run preview
```

## 📁 Struktur Project

```
wedding-invitation-react/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Base UI components
│   │   └── Header.tsx      # Navigation header
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # Admin dashboard
│   │   ├── CreateInvitation.tsx # Form creation
│   │   └── InvitationView.tsx # Guest view
│   ├── data/               # Data and types
│   │   └── dummy.ts        # Mock data
│   ├── lib/                # Utilities
│   │   └── utils.ts        # Helper functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 Cara Penggunaan

### Dashboard Admin
1. Buka aplikasi di browser
2. Dashboard menampilkan statistik undangan
3. Klik "Buat Undangan Baru" untuk membuat undangan baru
4. Lihat daftar undangan yang sudah dibuat

### Membuat Undangan Baru
1. Klik tombol "Buat Undangan Baru"
2. Isi form dengan detail undangan:
   - Informasi mempelai (nama, deskripsi)
   - Detail acara (tanggal, waktu, lokasi)
   - Upload foto cover dan galeri
   - Link Google Maps (opsional)
3. Klik "Buat Undangan" untuk menyimpan

### Melihat Undangan
1. Dari dashboard, klik "Lihat" pada undangan yang diinginkan
2. Atau langsung akses via URL: `http://localhost:5173/invitation/[ID]`
3. Tamu dapat melihat detail acara, galeri foto, dan mengirim RSVP

### RSVP System
1. Scroll ke bagian RSVP di halaman undangan
2. Klik "Konfirmasi Kehadiran"
3. Isi form konfirmasi (nama, email, jumlah tamu, ucapan)
4. Submit form untuk mengkonfirmasi kehadiran

## 🎨 Customization

### Tema dan Warna
Edit file `tailwind.config.js` untuk mengubah tema:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        // ...
      }
    }
  }
}
```

### Font
Font yang digunakan:
- **Inter** - Untuk UI elements
- **Playfair Display** - Untuk headings dan serif elements

### Animasi
Animasi kustom ada di `src/index.css`:
- `fade-in` - Fade in animation
- `slide-up` - Slide up animation
- `heartbeat` - Heart pulse animation
- `pulse-glow` - Glow effect

## 📱 Responsive Design

Aplikasi ini fully responsive:
- **Mobile** (< 768px) - Single column layout
- **Tablet** (768px - 1024px) - Two column layout
- **Desktop** (> 1024px) - Multi column layout

## 🔧 Data Management

Saat ini menggunakan data dummy (`src/data/dummy.ts`). Untuk integrasi dengan backend:

1. **API Integration** - Ganti calls ke dummy data dengan API calls
2. **State Management** - Tambahkan Redux/Zustand untuk complex state
3. **Database** - Integrasi dengan database backend

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Custom Server
```bash
npm run build
npm run preview
# Atau setup custom server dengan Nginx/Apache
```

## 🎯 Template System

### Fitur Template
- ✨ **Dynamic Template Loading** - Template di-load hanya saat dibutuhkan
- 🎨 **Modular Design** - Mudah menambah template baru tanpa mengubah kode utama
- 📋 **Template Management** - Salin, download, dan import data template
- 🔄 **Live Preview** - Preview langsung saat mengedit data
- 💾 **Data Export/Import** - Simpan dan muat data template sebagai JSON

### Cara Menambah Template Baru
1. Buat file template di `src/pages/undangan/[kategori]/templates/template-n.tsx`
2. Daftarkan template di `src/data/invitation-templates.ts`
3. Update loader di `src/utils/template-loader.ts`
4. Template otomatis tersedia di aplikasi

### Template Tersedia
- **Elegant Gold** - Template elegan dengan tema emas
- **Modern Blue** - Template modern dengan desain gradient
- *(Tambah template lain dengan mudah)*

### Documentation
Lihat `docs/TEMPLATE_SYSTEM.md` untuk dokumentasi lengkap sistem template.

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time RSVP updates
- [ ] Email notifications
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced customization themes
- [ ] Video background support
- [ ] Music player integration
- [ ] Guest book with photos
- [ ] Countdown timer customization
- [ ] Template Builder (Visual drag & drop)
- [ ] Cloud template storage

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies Error**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Build Error**
   ```bash
   npm run build -- --mode production
   ```

3. **Tailwind Not Working**
   - Pastikan `tailwind.config.js` benar
   - Check `postcss.config.js`
   - Restart development server

### Development Tips
- Use `npm run dev` untuk development
- Check browser console untuk errors
- Use React DevTools untuk debugging
- Test responsive design dengan browser dev tools

## 📄 License

MIT License

## 🤝 Kontribusi

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

---

**Created with ❤️ using React & TypeScript**

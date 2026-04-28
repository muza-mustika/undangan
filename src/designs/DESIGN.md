# Design Documentation

## Struktur Folder

```
src/designs/
├── pernikahan/          # Design undangan pernikahan
│   ├── design-1.tsx
│   ├── design-2.tsx
│   └── ...
├── khitanan/            # Design undangan khitanan (opsional)
├── ulang-tahun/         # Design undangan ulang tahun (opsional)
└── custom/              # Design custom (opsional)
```

## Penamaan File

Penamaan file **bebas**, tapi gunakan format yang konsisten:
- Gunakan kebab-case: `elegant-gold.tsx`, `modern-blue.tsx`
- Atau format numerik: `design-1.tsx`, `design-2.tsx`
- Hindari spasi dan karakter khusus

**Design ID** akan otomatis diambil dari nama file (tanpa ekstensi `.tsx`).

## Registrasi Design

Setelah menambah file design baru, daftarkan di `src/utils/template-loader.tsx`:

```typescript
const templateMap: Record<string, () => Promise<any>> = {
  'design-1': () => import('../designs/pernikahan/design-1').then(m => m.default),
  'design-1-simple': () => import('../designs/pernikahan/design-1-simple').then(m => m.default),
  'design-2': () => import('../designs/pernikahan/design-2').then(m => m.default),
  // Tambah design baru di sini
  'nama-design-baru': () => import('../designs/pernikahan/nama-design-baru').then(m => m.default),
};
```

**Catatan**: Kunci di object (`'design-1'`) adalah design ID yang akan digunakan di aplikasi.

## Struktur Code Design

Setiap design harus mengikuti format berikut:

```tsx
import React from 'react';

interface DesignProps {
  data: {
    brideName: string;
    groomName: string;
    brideParents: string;
    groomParents: string;
    weddingDate: string;
    weddingDay: string;
    akadTime: string;
    akadLocation: string;
    resepsiTime: string;
    resepsiLocation: string;
    quote: string;
    quoteSource: string;
  };
  guestName?: string;       // Opsional: nama tamu
  invitationUrl?: string;   // Opsional: URL undangan
}

export default function DesignName({ data, guestName, invitationUrl }: DesignProps) {
  return (
    <div style={{ /* styling */ }}>
      {/* Design content */}
    </div>
  );
}
```

## Props Wajib

### `data` (Required)
Object berisi data undangan:

| Field | Type | Deskripsi |
|-------|------|-----------|
| `brideName` | string | Nama pengantin wanita |
| `groomName` | string | Nama pengantin pria |
| `brideParents` | string | Nama orang tua pengantin wanita |
| `groomParents` | string | Nama orang tua pengantin pria |
| `weddingDate` | string | Tanggal pernikahan (contoh: "12 Juli 2025") |
| `weddingDay` | string | Hari pernikahan (contoh: "Sabtu") |
| `akadTime` | string | Waktu akad nikah (contoh: "08.00 — 10.00 WIB") |
| `akadLocation` | string | Lokasi akad nikah |
| `resepsiTime` | string | Waktu resepsi (contoh: "11.00 — 21.00 WIB") |
| `resepsiLocation` | string | Lokasi resepsi |
| `quote` | string | Kutipan untuk undangan |
| `quoteSource` | string | Sumber kutipan |

### Props Opsional

| Field | Type | Deskripsi |
|-------|------|-----------|
| `guestName` | string | Nama tamu (untuk undangan publik) |
| `invitationUrl` | string | URL undangan (untuk share) |

## Contoh Design Sederhana

```tsx
import React from 'react';

interface SimpleDesignProps {
  data: {
    brideName: string;
    groomName: string;
    brideParents: string;
    groomParents: string;
    weddingDate: string;
    weddingDay: string;
    akadTime: string;
    akadLocation: string;
    resepsiTime: string;
    resepsiLocation: string;
    quote: string;
    quoteSource: string;
  };
}

export default function SimpleDesign({ data }: SimpleDesignProps) {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#f5f0e8',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>
        {data.groomName} & {data.brideName}
      </h1>
      <p style={{ textAlign: 'center' }}>
        {data.weddingDay}, {data.weddingDate}
      </p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Akad Nikah</h3>
        <p>{data.akadTime}</p>
        <p>{data.akadLocation}</p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Resepsi</h3>
        <p>{data.resepsiTime}</p>
        <p>{data.resepsiLocation}</p>
      </div>
    </div>
  );
}
```

## Styling

Design bisa menggunakan:
- **Inline styles** (seperti contoh di atas)
- **CSS-in-JS** (styled-components, emotion)
- **Tailwind CSS** (jika sudah dikonfigurasi)
- **CSS modules** (import file CSS)

## Animasi

Untuk animasi, bisa menggunakan:
- CSS animations
- JavaScript libraries (anime.js, framer-motion, dll)
- Pastikan library di-load di dalam design jika diperlukan

## Best Practices

1. **Responsive**: Design harus responsif untuk mobile dan desktop
2. **Performance**: Hindari resource yang berat (gambar besar, library berat)
3. **Accessibility**: Gunakan semantic HTML dan alt text untuk gambar
4. **Default Export**: Design harus menggunakan `export default`
5. **TypeScript**: Gunakan TypeScript untuk type safety

## Cara Menggunakan Design

### Di Form Create Undangan

```tsx
import { TemplateFactory } from '../../../utils/template-loader';

// Gunakan design ID yang terdaftar di template-loader.tsx
<TemplateFactory templateId="design-1" data={invitationData} />
```

### Di Halaman View Undangan

```tsx
import Design from '../../../designs/pernikahan/design-1';

<Design data={invitationData} guestName="Nama Tamu" />
```

## Langkah Menambah Design Baru

1. **Buat file design** di folder yang sesuai:
   ```
   src/designs/pernikahan/nama-design-baru.tsx
   ```

2. **Daftarkan di template-loader.tsx**:
   ```typescript
   const templateMap: Record<string, () => Promise<any>> = {
     // ... existing designs
     'nama-design-baru': () => import('../designs/pernikahan/nama-design-baru').then(m => m.default),
   };
   ```

3. **Gunakan design** dengan ID yang terdaftar:
   ```tsx
   <TemplateFactory templateId="nama-design-baru" data={invitationData} />
   ```

## Contoh Struktur Data

```typescript
const invitationData = {
  brideName: 'Dewi',
  groomName: 'Arjuna',
  brideParents: 'Bapak Hendra Wijaya\n& Ibu Sri Mulyani',
  groomParents: 'Bapak Budi Santoso\n& Ibu Ratna Sari',
  weddingDate: '12 Juli 2025',
  weddingDay: 'Sabtu',
  akadTime: '08.00 — 10.00 WIB',
  akadLocation: 'Masjid Al-Ikhlas\nJl. Melati No. 12, Jakarta Selatan',
  resepsiTime: '11.00 — 21.00 WIB',
  resepsiLocation: 'Ballroom Grand Palace\nJl. Jend. Sudirman Kav. 5, Jakarta',
  quote: 'Dan Dia menciptakan pasangan untukmu dari jenismu sendiri...',
  quoteSource: 'QS. AR-RUM : 21'
};
```

## Testing

Untuk testing design:
1. Buka halaman "Buat Undangan"
2. Pilih design dari dropdown
3. Klik "Preview" untuk melihat hasil
4. Pastikan semua data ditampilkan dengan benar

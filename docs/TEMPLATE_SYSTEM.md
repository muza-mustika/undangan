# Sistem Template Undangan

## Overview

Sistem template undangan dirancang untuk memudahkan penambahan dan pengelolaan desain undangan baru. Anda dapat dengan mudah menambahkan template baru tanpa mengubah kode utama aplikasi.

## Struktur Folder

```
src/
├── pages/undangan/
│   ├── pernikahan/
│   │   ├── templates/
│   │   │   ├── template-1.tsx
│   │   │   ├── template-2.tsx (baru)
│   │   │   └── ...
│   │   ├── create.tsx
│   │   └── index.tsx
│   ├── khitanan/
│   │   └── templates/
│   └── ulang-tahun/
│       └── templates/
├── data/
│   └── invitation-templates.ts
├── utils/
│   └── template-loader.ts
└── components/
    └── layout/
```

## Cara Menambah Template Baru

### 1. Buat File Template

Buat file baru di folder `templates` sesuai kategori:

```tsx
// src/pages/undangan/pernikahan/templates/template-2.tsx
import React, { useEffect, useRef } from 'react';

interface Template2Props {
  data: {
    brideName: string;
    groomName: string;
    // ... field lainnya
  };
}

export default function Template2({ data }: Template2Props) {
  // Implementasi template Anda
  return (
    <div className="invitation-container">
      {/* Desain undangan Anda */}
      <h1>{data.groomName} & {data.brideName}</h1>
    </div>
  );
}
```

### 2. Daftarkan Template

Tambahkan template ke `invitation-templates.ts`:

```tsx
export const invitationTemplates: InvitationTemplate[] = [
  // ... template existing
  {
    id: 'template-2',
    name: 'Modern Blue',
    description: 'Template modern dengan tema biru',
    category: 'pernikahan',
    preview: '/templates/previews/template-2.jpg',
    component: null, // Akan di-load dinamis
    defaultData: {
      brideName: 'Siti',
      groomName: 'Budi',
      // ... data default lainnya
    }
  }
];
```

### 3. Update Template Loader

Tambahkan case baru di `template-loader.ts`:

```tsx
switch (templateId) {
  case 'template-1':
    component = await import('../pages/undangan/pernikahan/templates/template-1').then(m => m.default);
    break;
  case 'template-2':
    component = await import('../pages/undangan/pernikahan/templates/template-2').then(m => m.default);
    break;
  // ... template lainnya
}
```

## Fitur yang Tersedia

### 1. Template Management
- **Dynamic Loading**: Template di-load hanya saat dibutuhkan
- **Caching**: Template yang sudah di-load akan di-cache
- **Preloading**: Template penting bisa di-preload untuk performa lebih baik

### 2. Data Management
- **Export/Import**: Data undangan bisa diekspor ke JSON
- **Copy to Clipboard**: Salin data template dengan mudah
- **Download**: Download data template sebagai file JSON

### 3. Preview System
- **Live Preview**: Preview langsung saat mengedit data
- **Full Screen**: Preview mode full screen
- **Responsive**: Template responsif di semua device

## Cara Menggunakan

### 1. Buat Undangan dari Template

1. Pergi ke halaman "Buat Undangan"
2. Pilih kategori undangan
3. Pilih template yang tersedia
4. Klik "Gunakan Template"
5. Edit data undangan
6. Preview dan simpan

### 2. Salin Template

1. Di halaman "Buat Undangan"
2. Klik icon "Copy" pada template yang diinginkan
3. Data template akan tersalin ke clipboard
4. Paste ke aplikasi atau editor lain

### 3. Download Template Data

1. Klik icon "Download" pada template
2. File JSON akan terdownload
3. File bisa di-import kembali ke aplikasi

## Struktur Data Template

```typescript
interface InvitationData {
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
}
```

## Best Practices

### 1. Template Design
- Gunakan CSS variables untuk warna tema
- Pastikan responsive design
- Optimalkan animasi untuk performa
- Gunakan semantic HTML

### 2. Code Organization
- Pisahkan styles dalam component
- Gunakan TypeScript untuk type safety
- Ikuti naming convention yang konsisten
- Comment code yang kompleks

### 3. Performance
- Lazy load template yang tidak penting
- Optimalkan bundle size
- Gunakan CSS-in-JS untuk styling dinamis
- Implementasi caching yang efisien

## Troubleshooting

### Common Issues

1. **Template tidak muncul**
   - Pastikan template terdaftar di `invitation-templates.ts`
   - Cek import path di `template-loader.ts`

2. **Style tidak berfungsi**
   - Pastikan CSS variables didefinisikan
   - Cek specificity CSS

3. **Data tidak ter-update**
   - Pastikan props diterima dengan benar
   - Cek interface types

### Debug Tips

1. Gunakan browser developer tools
2. Cek console untuk error messages
3. Verify network requests
4. Test dengan data yang berbeda

## Future Enhancements

1. **Template Builder**: Visual builder untuk template baru
2. **Theme Customization**: Ubah warna dan font tanpa coding
3. **Cloud Storage**: Simpan template di cloud
4. **Collaboration**: Multi-user editing
5. **Version Control**: Track perubahan template

## Support

Jika ada pertanyaan atau masalah, hubungi development team atau buat issue di repository.

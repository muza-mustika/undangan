# Database Setup Instructions

## 🗄️ D1 Database Setup

### 1. Database sudah dibuat
✅ Database `wedding-invitation-db` berhasil dibuat dengan ID: `b7425af7-529d-4a8c-b025-4583a09d0181`

### 2. Schema Setup
Jalankan perintah berikut untuk membuat tabel-tabel:

```bash
# Jalankan schema lengkap
wrangler d1 execute wedding-invitation-db --file=schema.sql --remote

# Atau jalankan satu per satu jika ada masalah:
wrangler d1 execute wedding-invitation-db --command="CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);" --remote

wrangler d1 execute wedding-invitation-db --command="CREATE TABLE IF NOT EXISTS invitations (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, title TEXT NOT NULL, template_id TEXT NOT NULL, bride_name TEXT NOT NULL, groom_name TEXT NOT NULL, bride_parents TEXT NOT NULL, groom_parents TEXT NOT NULL, wedding_date TEXT NOT NULL, wedding_day TEXT NOT NULL, akad_time TEXT NOT NULL, akad_location TEXT NOT NULL, resepsi_time TEXT NOT NULL, resepsi_location TEXT NOT NULL, quote TEXT NOT NULL, quote_source TEXT NOT NULL, status TEXT DEFAULT 'draft', public_url TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE);" --remote

wrangler d1 execute wedding-invitation-db --command="CREATE TABLE IF NOT EXISTS guests (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, invitation_id INTEGER NOT NULL, name TEXT NOT NULL, email TEXT, phone TEXT, status TEXT DEFAULT 'pending', invitation_url TEXT, custom_message TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE);" --remote

wrangler d1 execute wedding-invitation-db --command="CREATE TABLE IF NOT EXISTS rsvp_responses (id INTEGER PRIMARY KEY AUTOINCREMENT, guest_id INTEGER NOT NULL, invitation_id INTEGER NOT NULL, response_type TEXT NOT NULL, guest_count INTEGER DEFAULT 1, message TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (guest_id) REFERENCES guests (id) ON DELETE CASCADE, FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE);" --remote

wrangler d1 execute wedding-invitation-db --command="CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, expires_at DATETIME NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE);" --remote
```

### 3. Indexes untuk Performance
```bash
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON invitations(user_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_invitations_status ON invitations(status);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_guests_user_id ON guests(user_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_guests_invitation_id ON guests(invitation_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_rsvp_guest_id ON rsvp_responses(guest_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_rsvp_invitation_id ON rsvp_responses(invitation_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);" --remote
wrangler d1 execute wedding-invitation-db --command="CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);" --remote
```

### 4. Verifikasi Setup
```bash
# Cek tabel yang sudah dibuat
wrangler d1 execute wedding-invitation-db --command="SELECT name FROM sqlite_master WHERE type='table';" --remote

# Cek struktur tabel
wrangler d1 execute wedding-invitation-db --command="PRAGMA table_info(users);" --remote
```

## 🔧 Troubleshooting

### Jika ada error "write EOF":
1. Pastikan Wrangler versi terbaru: `npm update wrangler -g`
2. Coba jalankan perintah satu per satu
3. Pastikan file schema.sql ada di root directory

### Jika ada error "Unexpected fields":
Warning ini tidak menghentikan proses, hanya informasi bahwa wrangler.toml memiliki field yang tidak diharapkan untuk Workers.

### Jika perlu reset database:
```bash
# Hapus database
wrangler d1 delete wedding-invitation-db

# Buat ulang
wrangler d1 create wedding-invitation-db

# Update wrangler.toml dengan database_id baru
```

## 📊 Database Structure

### Users Table
- `id` - Primary Key
- `email` - Unique email address
- `password_hash` - Hashed password
- `name` - User full name
- `username` - Unique username (for public URLs)

### Invitations Table
- `id` - Primary Key
- `user_id` - Foreign key ke users
- `title` - Invitation title
- `template_id` - Template yang dipakai
- `bride_name`, `groom_name` - Nama mempelai
- `wedding_date`, `wedding_day` - Tanggal dan hari
- `akad_time`, `akad_location` - Detail akad
- `resepsi_time`, `resepsi_location` - Detail resepsi
- `quote`, `quote_source` - Kutipan undangan
- `status` - draft/published
- `public_url` - URL publik (username-based)

### Guests Table
- `id` - Primary Key
- `user_id` - Foreign key ke users
- `invitation_id` - Foreign key ke invitations
- `name` - Nama tamu
- `email`, `phone` - Kontak tamu
- `status` - pending/confirmed/declined
- `invitation_url` - Link undangan personal
- `custom_message` - Pesan kustom

### RSVP Responses Table
- `id` - Primary Key
- `guest_id` - Foreign key ke guests
- `invitation_id` - Foreign key ke invitations
- `response_type` - confirmed/declined/pending
- `guest_count` - Jumlah tamu yang hadir
- `message` - Pesan tambahan

### Sessions Table
- `id` - Session token
- `user_id` - Foreign key ke users
- `expires_at` - Expiration time

## 🚀 Next Steps

Setelah database setup selesai:

1. **Deploy ke Cloudflare Pages**:
   ```bash
   npm run deploy
   ```

2. **Test Registration**:
   - Buka `http://localhost:5173/login`
   - Daftar akun baru
   - Verifikasi data tersimpan di database

3. **Test Multi-User**:
   - Buat beberapa akun
   - Verifikasi data isolation
   - Test public URLs

4. **Test Public Invitations**:
   - Publish invitation
   - Akses via `domain.com/username`
   - Test dengan guest parameters

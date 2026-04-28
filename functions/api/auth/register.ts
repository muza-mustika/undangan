// Simple password hashing using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple password verification
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const { email, password, name, username } = body;
    const { env } = context;

    console.log('Received registration request:', { email, password, name, username });

    // Validasi input
    if (!email || !password || !name || !username) {
      console.log('Validation error: Semua field harus diisi');
      return new Response(
        JSON.stringify({ error: 'Semua field harus diisi' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Validasi password minimum 6 karakter
    if (password.length < 6) {
      console.log('Validation error: Password minimal 6 karakter');
      return new Response(
        JSON.stringify({ error: 'Password minimal 6 karakter' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Cek apakah email atau username sudah ada
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    ).bind(email, username).first();

    if (existingUser) {
      console.log('Email atau username sudah digunakan');
      return new Response(
        JSON.stringify({ error: 'Email atau username sudah digunakan' }),
        { status: 409, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Hash password menggunakan Web Crypto API
    const passwordHash = await hashPassword(password);
    console.log('Password hashed:', passwordHash);

    // Simpan user ke database
    const result = await env.DB.prepare(
      'INSERT INTO users (email, password_hash, name, username) VALUES (?, ?, ?, ?)'
    ).bind(email, passwordHash, name, username).run();

    if (!result.success) {
      console.log('Error saving user to database:', result);
      return new Response(
        JSON.stringify({ error: 'Gagal menyimpan user ke database' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Ambil user yang baru dibuat
    const newUser = await env.DB.prepare(
      'SELECT id, email, name, username, created_at, updated_at FROM users WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    console.log('User created:', newUser);

    // Cleanup session expired untuk user ini (jika ada session lama)
    await env.DB.prepare(
      'DELETE FROM sessions WHERE user_id = ? AND expires_at < datetime("now")'
    ).bind(newUser.id).run();

    // Buat session token (sederhana untuk sekarang)
    const sessionToken = 'session-' + Math.random().toString(36).substr(2, 9) + Date.now();
    console.log('Session token created:', sessionToken);

    // Simpan session ke database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
    await env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionToken, newUser.id, expiresAt.toISOString()).run();

    console.log('Session saved to database');

    return new Response(
      JSON.stringify({ 
        user: newUser, 
        token: sessionToken 
      }),
      { 
        status: 201, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        } 
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Registrasi gagal', details: error instanceof Error ? error.message : String(error) }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        } 
      }
    );
  }
}

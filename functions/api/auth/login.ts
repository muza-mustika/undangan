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
    const { email, password } = await context.request.json();
    const { env } = context;

    console.log('Login request:', { email });

    // Validasi input
    if (!email || !password) {
      console.log('Validation error: Email dan password diperlukan');
      return new Response(
        JSON.stringify({ error: 'Email dan password diperlukan' }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Cari user di database
    const user = await env.DB.prepare(
      'SELECT id, email, password_hash, name, username, created_at, updated_at FROM users WHERE email = ?'
    ).bind(email).first();

    if (!user) {
      console.log('User not found');
      return new Response(
        JSON.stringify({ error: 'Email atau password salah' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          } 
        }
      );
    }

    // Verifikasi password menggunakan Web Crypto API
    const passwordMatch = await verifyPassword(password, user.password_hash);
    
    if (!passwordMatch) {
      console.log('Password mismatch');
      return new Response(
        JSON.stringify({ error: 'Email atau password salah' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          } 
        }
      );
    }

    // Hapus password hash dari response
    const { password_hash, ...userWithoutPassword } = user;

    console.log('Login successful for user:', userWithoutPassword.email);

    // Cleanup session expired untuk user ini
    await env.DB.prepare(
      'DELETE FROM sessions WHERE user_id = ? AND expires_at < datetime("now")'
    ).bind(user.id).run();

    // Hapus session lama untuk user ini (opsional - untuk mencegah terlalu banyak session aktif)
    await env.DB.prepare(
      'DELETE FROM sessions WHERE user_id = ? AND id NOT IN (SELECT id FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 5)'
    ).bind(user.id, user.id).run();

    // Buat session token
    const sessionToken = 'session-' + Math.random().toString(36).substr(2, 9) + Date.now();
    
    // Simpan session ke database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
    await env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionToken, user.id, expiresAt.toISOString()).run();

    return new Response(
      JSON.stringify({ 
        user: userWithoutPassword, 
        token: sessionToken 
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        } 
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login gagal', details: error instanceof Error ? error.message : String(error) }),
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

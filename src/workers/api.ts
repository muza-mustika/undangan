// Cloudflare Workers API handlers for D1 database
export interface Env {
  DB: any;
}

// Authentication middleware
export async function authenticate(request: Request, env: Env): Promise<{ userId: number } | null> {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  try {
    const session = await env.DB.prepare(
      'SELECT user_id FROM sessions WHERE id = ? AND expires_at > ?'
    ).bind(token, new Date().toISOString()).first();

    if (!session) {
      return null;
    }

    return { userId: session.user_id as number };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// CORS handler
export function handleCORS(request: Request): Response {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Auth endpoints
export async function handleAuth(request: Request, env: Env, ctx: any): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/auth/login' && request.method === 'POST') {
    const { email, password } = await request.json() as { email: string; password: string };
    
    const user = await env.DB.prepare(
      'SELECT id, email, name, username, password_hash FROM users WHERE email = ?'
    ).bind(email).first();

    if (!user || !await verifyPassword(password, user.password_hash as string)) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, user.id, expiresAt.toISOString()).run();

    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path === '/api/auth/register' && request.method === 'POST') {
    const { email, password, name, username } = await request.json() as {
      email: string;
      password: string;
      name: string;
      username: string;
    };

    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ? OR username = ?'
    ).bind(email, username).first();

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordHash = await hashPassword(password);

    const result = await env.DB.prepare(
      'INSERT INTO users (email, password_hash, name, username) VALUES (?, ?, ?, ?)'
    ).bind(email, passwordHash, name, username).run();

    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await env.DB.prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, result.meta.last_row_id, expiresAt.toISOString()).run();

    return new Response(JSON.stringify({
      user: {
        id: result.meta.last_row_id,
        email,
        name,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      token,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path === '/api/auth/logout' && request.method === 'POST') {
    const auth = await authenticate(request, env);
    if (!auth) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(token).run();

    return new Response(JSON.stringify({ message: 'Logged out' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path === '/api/auth/me' && request.method === 'GET') {
    const auth = await authenticate(request, env);
    if (!auth) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await env.DB.prepare(
      'SELECT id, email, name, username, created_at, updated_at FROM users WHERE id = ?'
    ).bind(auth.userId).first();

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404 });
}

// Invitation endpoints
export async function handleInvitations(request: Request, env: Env, ctx: any): Promise<Response> {
  const auth = await authenticate(request, env);
  if (!auth) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === '/api/invitations' && method === 'GET') {
    const invitations = await env.DB.prepare(
      'SELECT * FROM invitations WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(auth.userId).all();

    return new Response(JSON.stringify(invitations.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path === '/api/invitations' && method === 'POST') {
    const invitationData = await request.json();
    
    const result = await env.DB.prepare(`
      INSERT INTO invitations (
        user_id, title, template_id, bride_name, groom_name, bride_parents, groom_parents,
        wedding_date, wedding_day, akad_time, akad_location, resepsi_time, resepsi_location,
        quote, quote_source, status, public_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      auth.userId,
      invitationData.title,
      invitationData.template_id,
      invitationData.bride_name,
      invitationData.groom_name,
      invitationData.bride_parents,
      invitationData.groom_parents,
      invitationData.wedding_date,
      invitationData.wedding_day,
      invitationData.akad_time,
      invitationData.akad_location,
      invitationData.resepsi_time,
      invitationData.resepsi_location,
      invitationData.quote,
      invitationData.quote_source,
      invitationData.status || 'draft',
      invitationData.public_url || ''
    ).run();

    const invitation = await env.DB.prepare(
      'SELECT * FROM invitations WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    return new Response(JSON.stringify(invitation), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path.startsWith('/api/invitations/') && method === 'PUT') {
    const id = parseInt(path.split('/').pop()!);
    const invitationData = await request.json();

    await env.DB.prepare(`
      UPDATE invitations SET
        title = ?, template_id = ?, bride_name = ?, groom_name = ?, bride_parents = ?,
        groom_parents = ?, wedding_date = ?, wedding_day = ?, akad_time = ?, akad_location = ?,
        resepsi_time = ?, resepsi_location = ?, quote = ?, quote_source = ?,
        status = ?, public_url = ?, updated_at = ?
      WHERE id = ? AND user_id = ?
    `).bind(
      invitationData.title,
      invitationData.template_id,
      invitationData.bride_name,
      invitationData.groom_name,
      invitationData.bride_parents,
      invitationData.groom_parents,
      invitationData.wedding_date,
      invitationData.wedding_day,
      invitationData.akad_time,
      invitationData.akad_location,
      invitationData.resepsi_time,
      invitationData.resepsi_location,
      invitationData.quote,
      invitationData.quote_source,
      invitationData.status,
      invitationData.public_url,
      new Date().toISOString(),
      id,
      auth.userId
    ).run();

    const invitation = await env.DB.prepare(
      'SELECT * FROM invitations WHERE id = ? AND user_id = ?'
    ).bind(id, auth.userId).first();

    return new Response(JSON.stringify(invitation), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path.startsWith('/api/invitations/') && method === 'DELETE') {
    const id = parseInt(path.split('/').pop()!);

    await env.DB.prepare('DELETE FROM invitations WHERE id = ? AND user_id = ?')
      .bind(id, auth.userId).run();

    return new Response(JSON.stringify({ message: 'Invitation deleted' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404 });
}

// Guest endpoints
export async function handleGuests(request: Request, env: Env, ctx: any): Promise<Response> {
  const auth = await authenticate(request, env);
  if (!auth) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === '/api/guests' && method === 'GET') {
    const invitationId = url.searchParams.get('invitation_id');
    let query = 'SELECT * FROM guests WHERE user_id = ?';
    const params = [auth.userId];

    if (invitationId) {
      query += ' AND invitation_id = ?';
      params.push(parseInt(invitationId));
    }

    query += ' ORDER BY created_at DESC';

    const guests = await env.DB.prepare(query).bind(...params).all();

    return new Response(JSON.stringify(guests.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path === '/api/guests' && method === 'POST') {
    const guestData = await request.json();

    const result = await env.DB.prepare(`
      INSERT INTO guests (
        user_id, invitation_id, name, email, phone, status, invitation_url, custom_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      auth.userId,
      guestData.invitation_id,
      guestData.name,
      guestData.email,
      guestData.phone,
      guestData.status || 'pending',
      guestData.invitation_url || '',
      guestData.custom_message || ''
    ).run();

    const guest = await env.DB.prepare(
      'SELECT * FROM guests WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    return new Response(JSON.stringify(guest), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404 });
}

// Public endpoints
export async function handlePublic(request: Request, env: Env, ctx: any): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.startsWith('/api/public/invitation/') && request.method === 'GET') {
    const username = path.split('/').pop()!;
    const guestName = url.searchParams.get('guest');

    const user = await env.DB.prepare(
      'SELECT id FROM users WHERE username = ?'
    ).bind(username).first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const invitation = await env.DB.prepare(
      'SELECT * FROM invitations WHERE user_id = ? AND status = ?'
    ).bind(user.id, 'published').first();

    if (!invitation) {
      return new Response(JSON.stringify({ error: 'Invitation not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ invitation, guestName }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (path.startsWith('/api/public/rsvp/') && request.method === 'POST') {
    const invitationId = parseInt(path.split('/').pop()!);
    const { guest_name, ...rsvpData } = await request.json();

    // Find or create guest
    let guest = await env.DB.prepare(
      'SELECT id FROM guests WHERE invitation_id = ? AND name = ?'
    ).bind(invitationId, guest_name).first();

    if (!guest) {
      const result = await env.DB.prepare(
        'INSERT INTO guests (invitation_id, name, status) VALUES (?, ?, ?)'
      ).bind(invitationId, guest_name, 'confirmed').run();
      guest = { id: result.meta.last_row_id };
    }

    const result = await env.DB.prepare(`
      INSERT INTO rsvp_responses (guest_id, invitation_id, response_type, guest_count, message)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      guest.id,
      invitationId,
      rsvpData.response_type || 'confirmed',
      rsvpData.guest_count || 1,
      rsvpData.message || ''
    ).run();

    const rsvp = await env.DB.prepare(
      'SELECT * FROM rsvp_responses WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    return new Response(JSON.stringify(rsvp), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not found', { status: 404 });
}

// Utility functions
function generateSessionToken(): string {
  return Array.from({ length: 32 }, () => 
    Math.random().toString(36).charAt(2)).join('');
}

async function hashPassword(password: string): Promise<string> {
  // In production, use a proper password hashing library
  // This is a simple example - replace with bcrypt or similar
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

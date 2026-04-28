export async function onRequestGet(context: any) {
  try {
    const { env, request } = context;
    
    // Get user from session token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Get user from session
    const session = await env.DB.prepare(
      'SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime("now")'
    ).bind(token).first();

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Fetch guests from database
    const guests = await env.DB.prepare(
      'SELECT * FROM guests WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(session.user_id).all();

    return new Response(
      JSON.stringify(guests.results || []),
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
    console.error('Error fetching guests:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal mengambil tamu', details: error instanceof Error ? error.message : String(error) }),
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

export async function onRequestPost(context: any) {
  try {
    const { env, request } = context;
    
    // Get user from session token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Get user from session
    const session = await env.DB.prepare(
      'SELECT user_id FROM sessions WHERE id = ? AND expires_at > datetime("now")'
    ).bind(token).first();

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired session' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, invitation_id } = body;

    // Validate input
    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Nama tamu harus diisi' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Insert guest to database
    const result = await env.DB.prepare(
      'INSERT INTO guests (name, email, phone, invitation_id, user_id) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, email || null, phone || null, invitation_id || null, session.user_id).run();

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Gagal menyimpan tamu ke database' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Get the created guest
    const newGuest = await env.DB.prepare(
      'SELECT * FROM guests WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    return new Response(
      JSON.stringify(newGuest),
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
    console.error('Error creating guest:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal menambah tamu', details: error instanceof Error ? error.message : String(error) }),
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

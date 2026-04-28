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

    // Fetch invitations from database
    const invitations = await env.DB.prepare(
      'SELECT * FROM invitations WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(session.user_id).all();

    return new Response(
      JSON.stringify(invitations.results || []),
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
    console.error('Error fetching invitations:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal mengambil undangan', details: error instanceof Error ? error.message : String(error) }),
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
    const { 
      title, 
      template_id, 
      bride_name, 
      groom_name, 
      bride_parents, 
      groom_parents, 
      wedding_date, 
      wedding_day, 
      akad_time, 
      akad_location, 
      resepsi_time, 
      resepsi_location, 
      quote, 
      quote_source 
    } = body;

    // Validate required fields
    if (!title || !template_id || !bride_name || !groom_name || !wedding_date) {
      return new Response(
        JSON.stringify({ error: 'Field wajib harus diisi' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Generate unique NanoID for public_slug (10 characters)
    let public_slug = '';
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
      public_slug = generateNanoId(10);
      const existing = await env.DB.prepare(
        'SELECT id FROM invitations WHERE public_slug = ?'
      ).bind(public_slug).first();
      
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return new Response(
        JSON.stringify({ error: 'Gagal generate unique slug' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Insert invitation to database
    const result = await env.DB.prepare(
      `INSERT INTO invitations (user_id, title, template_id, bride_name, groom_name, bride_parents, groom_parents, wedding_date, wedding_day, akad_time, akad_location, resepsi_time, resepsi_location, quote, quote_source, status, public_slug)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      session.user_id,
      title,
      template_id,
      bride_name,
      groom_name,
      bride_parents || '',
      groom_parents || '',
      wedding_date,
      wedding_day || '',
      akad_time || '',
      akad_location || '',
      resepsi_time || '',
      resepsi_location || '',
      quote || '',
      quote_source || '',
      'draft',
      public_slug
    ).run();

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Gagal menyimpan undangan ke database' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Get the created invitation
    const newInvitation = await env.DB.prepare(
      'SELECT * FROM invitations WHERE id = ?'
    ).bind(result.meta.last_row_id).first();

    return new Response(
      JSON.stringify(newInvitation),
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
    console.error('Error creating invitation:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal membuat undangan', details: error instanceof Error ? error.message : String(error) }),
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

// Simple NanoID generator (10 characters)
function generateNanoId(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function onRequestDelete(context: any) {
  try {
    const { env, request } = context;
    const url = new URL(request.url);
    const invitationId = url.pathname.split('/').pop();
    
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

    // Check if invitation belongs to user
    const invitation = await env.DB.prepare(
      'SELECT id, user_id FROM invitations WHERE id = ?'
    ).bind(invitationId).first();

    if (!invitation) {
      return new Response(
        JSON.stringify({ error: 'Undangan tidak ditemukan' }),
        { 
          status: 404, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    if (invitation.user_id !== session.user_id) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 403, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    // Delete invitation (cascade will delete guests and RSVPs)
    const result = await env.DB.prepare(
      'DELETE FROM invitations WHERE id = ?'
    ).bind(invitationId).run();

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Gagal menghapus undangan' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Undangan berhasil dihapus' }),
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
    console.error('Error deleting invitation:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal menghapus undangan', details: error instanceof Error ? error.message : String(error) }),
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

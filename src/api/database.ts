// Database API endpoints
export interface Invitation {
  id: number;
  user_id: number;
  title: string;
  template_id: string;
  bride_name: string;
  groom_name: string;
  bride_parents: string;
  groom_parents: string;
  wedding_date: string;
  wedding_day: string;
  akad_time: string;
  akad_location: string;
  resepsi_time: string;
  resepsi_location: string;
  quote: string;
  quote_source: string;
  status: string;
  public_url: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: number;
  user_id: number;
  invitation_id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  invitation_url: string;
  custom_message: string;
  created_at: string;
  updated_at: string;
}

export interface RSVPResponse {
  id: number;
  guest_id: number;
  invitation_id: number;
  response_type: string;
  guest_count: number;
  message: string;
  created_at: string;
  updated_at: string;
}

// Mock API functions (will be replaced with actual API calls)
export const databaseAPI = {
  // Helper function to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  },

  // Invitations
  async getInvitations(userId: number): Promise<Invitation[]> {
    const response = await fetch(`/api/invitations`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch invitations');
    return response.json();
  },

  async createInvitation(invitation: Omit<Invitation, 'id' | 'created_at' | 'updated_at'>): Promise<Invitation> {
    const response = await fetch('/api/invitations', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(invitation),
    });
    if (!response.ok) throw new Error('Failed to create invitation');
    return response.json();
  },

  async updateInvitation(id: number, invitation: Partial<Invitation>): Promise<Invitation> {
    const response = await fetch(`/api/invitations/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(invitation),
    });
    if (!response.ok) throw new Error('Failed to update invitation');
    return response.json();
  },

  async deleteInvitation(id: number): Promise<void> {
    const response = await fetch(`/api/invitations/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete invitation');
  },

  // Guests
  async getGuests(userId: number, invitationId?: number): Promise<Guest[]> {
    const response = await fetch(`/api/guests`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch guests');
    return response.json();
  },

  async createGuest(guest: Omit<Guest, 'id' | 'created_at' | 'updated_at'>): Promise<Guest> {
    const response = await fetch('/api/guests', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(guest),
    });
    if (!response.ok) throw new Error('Failed to create guest');
    return response.json();
  },

  async updateGuest(id: number, guest: Partial<Guest>): Promise<Guest> {
    const response = await fetch(`/api/guests/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(guest),
    });
    if (!response.ok) throw new Error('Failed to update guest');
    return response.json();
  },

  async deleteGuest(id: number): Promise<void> {
    const response = await fetch(`/api/guests/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete guest');
  },

  // RSVP Responses
  async getRSVPResponses(invitationId: number): Promise<RSVPResponse[]> {
    const response = await fetch(`/api/rsvp?invitation_id=${invitationId}`, {
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch RSVP responses');
    return response.json();
  },

  async createRSVPResponse(rsvp: Omit<RSVPResponse, 'id' | 'created_at' | 'updated_at'>): Promise<RSVPResponse> {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(rsvp),
    });
    if (!response.ok) throw new Error('Failed to create RSVP response');
    return response.json();
  },

  // Public invitation access
  async getPublicInvitation(username: string, guestName?: string): Promise<Invitation | null> {
    const url = guestName 
      ? `/api/public/invitation/${username}?guest=${encodeURIComponent(guestName)}`
      : `/api/public/invitation/${username}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json();
  },

  async submitPublicRSVP(invitationId: number, guestName: string, data: any): Promise<RSVPResponse> {
    const response = await fetch(`/api/public/rsvp/${invitationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guest_name: guestName, ...data }),
    });
    return response.json();
  },
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateFactory } from '../utils/template-loader';
import { databaseAPI } from '../api/database';

const PublicInvitation: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [invitation, setInvitation] = useState<any>(null);
  const [guestName, setGuestName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInvitation = async () => {
      if (!username) return;

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');
        
        const data = await databaseAPI.getPublicInvitation(username, guestParam || undefined);
        
        if (data) {
          setInvitation(data);
          if (guestParam) {
            setGuestName(guestParam);
          }
        } else {
          setError('Undangan tidak ditemukan');
        }
      } catch (err) {
        setError('Gagal memuat undangan');
      } finally {
        setLoading(false);
      }
    };

    loadInvitation();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat undangan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Undangan Tidak Ditemukan</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Undangan Tidak Tersedia</h1>
          <p className="text-gray-600">Undangan yang Anda cari tidak tersedia atau telah dihapus.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Render template with guest name */}
      <TemplateFactory 
        templateId="design-1-simple"
        data={invitation}
      />
    </div>
  );
};

export default PublicInvitation;

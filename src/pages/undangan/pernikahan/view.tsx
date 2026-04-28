import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateFactory } from '../../../utils/template-loader';
import { InvitationData, invitationTemplates } from '../../../data/invitation-templates';

interface ViewInvitationProps {
  guestName?: string;
}

const ViewInvitation: React.FC<ViewInvitationProps> = ({ guestName }) => {
  const { id, category } = useParams();
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const isPreviewMode = window.location.pathname.startsWith('/preview');

  useEffect(() => {
    // Load invitation data based on ID and category
    const loadInvitationData = async () => {
      try {
        // Find template by id and category
        const template = invitationTemplates.find(t => t.id === id && t.category === category);
        
        if (template && template.defaultData) {
          setInvitationData(template.defaultData);
        } else {
          // Fallback to template-1-simple default data
          const defaultData: InvitationData = {
            brideName: 'Dewi',
            groomName: 'Arjuna',
            groomTitlesBefore: [],
            groomTitlesAfter: [],
            brideTitlesBefore: [],
            brideTitlesAfter: [],
            brideParents: 'Bapak Hendra Wijaya\n& Ibu Sri Mulyani',
            groomParents: 'Bapak Budi Santoso\n& Ibu Ratna Sari',
            weddingDate: '12 Juli 2025',
            weddingDay: 'Sabtu',
            akadTime: '08.00 — 10.00 WIB',
            akadLocation: 'Masjid Al-Ikhlas\nJl. Melati No. 12, Jakarta Selatan',
            resepsiTime: '11.00 — 21.00 WIB',
            resepsiLocation: 'Ballroom Grand Palace\nJl. Jend. Sudirman Kav. 5, Jakarta',
            quote: 'Dan Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
            quoteSource: 'QS. AR-RUM : 21'
          };
          setInvitationData(defaultData);
        }
      } catch (error) {
        console.error('Error loading invitation:', error);
        // Fallback to default data
        setInvitationData({
          brideName: 'Dewi',
          groomName: 'Arjuna',
          groomTitlesBefore: [],
          groomTitlesAfter: [],
          brideTitlesBefore: [],
          brideTitlesAfter: [],
          brideParents: 'Bapak Hendra Wijaya\n& Ibu Sri Mulyani',
          groomParents: 'Bapak Budi Santoso\n& Ibu Ratna Sari',
          weddingDate: '12 Juli 2025',
          weddingDay: 'Sabtu',
          akadTime: '08.00 — 10.00 WIB',
          akadLocation: 'Masjid Al-Ikhlas\nJl. Melati No. 12, Jakarta Selatan',
          resepsiTime: '11.00 — 21.00 WIB',
          resepsiLocation: 'Ballroom Grand Palace\nJl. Jend. Sudirman Kav. 5, Jakarta',
          quote: 'Dan Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
          quoteSource: 'QS. AR-RUM : 21'
        });
      } finally {
        setLoading(false);
      }
    };

    loadInvitationData();
  }, [id, category]);

  // Register Service Worker for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Get guest name from URL params or localStorage
  const getGuestName = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlGuestName = urlParams.get('guest');
    const storedGuestName = localStorage.getItem(`guest-${id}`);
    return guestName || urlGuestName || storedGuestName || null;
  };

  const currentGuestName = getGuestName();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f5f0e8',
        fontFamily: "'Jost', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #b89b6e',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#3d3529' }}>Memuat undangan...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!invitationData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f5f0e8',
        fontFamily: "'Jost', sans-serif"
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ color: '#1a1510', marginBottom: '1rem' }}>Undangan Tidak Ditemukan</h1>
          <p style={{ color: '#3d3529' }}>Maaf, undangan yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* PWA Install Prompt */}
      <style>{`
        @media (display-mode: standalone) {
          body {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
      
      {/* Render template with guest name */}
      <TemplateFactory 
        templateId="design-1-simple"
        data={invitationData} 
      />
      
      {/* Offline Indicator */}
      <div id="offline-indicator" style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#ff4444',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        display: 'none',
        zIndex: 9999
      }}>
        Offline
      </div>
      
      <script>{`
        // Detect online/offline status
        function updateOnlineStatus() {
          const indicator = document.getElementById('offline-indicator');
          if (indicator) {
            if (navigator.onLine) {
              indicator.style.display = 'none';
            } else {
              indicator.style.display = 'block';
            }
          }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
      `}</script>
    </div>
  );
};

export default ViewInvitation;

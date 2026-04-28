import React, { useEffect, useRef } from 'react';

interface Template1SimpleProps {
  data?: {
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
  };
  guestName?: string;
  invitationUrl?: string;
}

export default function Template1Simple(props: Template1SimpleProps) {
  // Handle null props case
  if (!props || !props.data) {
    return <div>Loading...</div>;
  }

  const { data, guestName, invitationUrl } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll animation
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const scrollHeight = containerRef.current.scrollHeight;
        const clientHeight = containerRef.current.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        if (containerRef.current.scrollTop >= maxScroll) {
          containerRef.current.scrollTop = 0;
        } else {
          containerRef.current.scrollTop += 1;
        }
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        background: 'linear-gradient(135deg, #f5f0e8 0%, #b89b6e 100%)',
        fontFamily: "'Jost', sans-serif",
        color: '#1a1510',
        position: 'relative'
      }}
    >
      {/* Animated Background Particles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'rgba(184, 155, 110, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.6;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .shimmer {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(184, 155, 110, 0.1) 50%, 
            transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
      {/* Header Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="shimmer" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#1a1510',
              marginBottom: '1rem',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              {data.groomName}
            </h1>
            
            <div style={{
              fontSize: '2rem',
              color: '#b89b6e',
              margin: '1rem 0',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              &
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#1a1510',
              marginBottom: '2rem',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              {data.brideName}
            </h1>
            
            <div style={{
              width: '60px',
              height: '2px',
              background: '#b89b6e',
              margin: '2rem auto'
            }}></div>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#3d3529',
              marginBottom: '1rem'
            }}>
              {data.weddingDay}, {data.weddingDate}
            </p>
            
            <p style={{
              fontSize: '0.9rem',
              color: '#9a8e7e',
              fontStyle: 'italic'
            }}>
              Undangan Pernikahan
            </p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#f5f0e8',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="shimmer" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#b89b6e',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}>
              "Dan di antara tanda-tanda-Nya"
            </h2>
            
            <blockquote style={{
              fontSize: '1.3rem',
              fontStyle: 'italic',
              lineHeight: '1.8',
              color: '#3d3529',
              marginBottom: '2rem',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              "{data.quote}"
            </blockquote>
            
            <cite style={{
              fontSize: '1rem',
              color: '#b89b6e',
              fontWeight: 500
            }}>
              — {data.quoteSource}
            </cite>
          </div>
        </div>
      </div>

      {/* Couple Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #1a1510 0%, #3d3529 100%)',
        color: '#f5f0e8',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#f5f0e8'
          }}>
            Mempelai
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Groom */}
            <div style={{ textAlign: 'right' }}>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '0.5rem',
                fontFamily: "'Cormorant Garamond', serif"
              }}>
                {data.groomName}
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Putra Pertama</p>
              <p style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {data.groomParents}
              </p>
            </div>

            {/* Separator */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid #b89b6e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#b89b6e'
            }}>
              &
            </div>

            {/* Bride */}
            <div style={{ textAlign: 'left' }}>
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: '0.5rem',
                fontFamily: "'Cormorant Garamond', serif"
              }}>
                {data.brideName}
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Putri Kedua</p>
              <p style={{ 
                fontSize: '0.9rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {data.brideParents}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#f5f0e8',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1a1510'
          }}>
            Detail Acara
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Akad */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="shimmer" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#b89b6e',
                  marginBottom: '1rem'
                }}>
                  Akad Nikah
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1a1510',
                  marginBottom: '0.5rem'
                }}>
                  {data.akadTime}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#3d3529',
                  whiteSpace: 'pre-line'
                }}>
                  {data.akadLocation}
                </p>
              </div>
            </div>

            {/* Resepsi */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="shimmer" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#b89b6e',
                  marginBottom: '1rem'
                }}>
                  Resepsi
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#1a1510',
                  marginBottom: '0.5rem'
                }}>
                  {data.resepsiTime}
                </p>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#3d3529',
                  whiteSpace: 'pre-line'
                }}>
                  {data.resepsiLocation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f0e8 0%, #b89b6e 100%)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="shimmer" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontSize: '2rem',
              color: '#1a1510',
              marginBottom: '1rem',
              fontFamily: "'Cormorant Garamond', serif"
            }}>
              Mohon Hadir
            </h2>
            
            {/* Tampilkan nama tamu jika ada */}
            {guestName && (
              <div style={{
                background: 'rgba(184, 155, 110, 0.1)',
                padding: '1.5rem',
                borderRadius: '15px',
                marginBottom: '2rem',
                border: '1px solid rgba(184, 155, 110, 0.3)'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#3d3529',
                  marginBottom: '0.5rem'
                }}>
                  Undangan untuk:
                </p>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#1a1510',
                  fontWeight: 500,
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                  {guestName}
                </h3>
              </div>
            )}
            
            <p style={{
              fontSize: '1.1rem',
              color: '#3d3529',
              marginBottom: '2rem'
            }}>
              Kehadiran Anda adalah hadiah terbaik bagi kami
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                defaultValue={guestName || ''}
                style={{
                  padding: '1rem',
                  border: '1px solid #b89b6e',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Jost', sans-serif"
                }}
              />
              <input
                type="tel"
                placeholder="Nomor Telepon"
                style={{
                  padding: '1rem',
                  border: '1px solid #b89b6e',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Jost', sans-serif"
                }}
              />
              <select
                style={{
                  padding: '1rem',
                  border: '1px solid #b89b6e',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Jost', sans-serif",
                  color: '#3d3529'
                }}
              >
                <option value="">Jumlah Tamu</option>
                <option value="1">1 orang</option>
                <option value="2">2 orang</option>
                <option value="3">3 orang</option>
                <option value="4">4 orang</option>
              </select>
              <button
                style={{
                  padding: '1rem 2rem',
                  background: '#b89b6e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: "'Jost', sans-serif",
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#a0875f'}
                onMouseOut={(e) => e.currentTarget.style.background = '#b89b6e'}
              >
                Kirim Konfirmasi
              </button>
              
              {/* Tombol kirim WA */}
              {guestName && (
                <button
                  onClick={() => {
                    const message = `Hai Admin,\n\nSaya ${guestName} telah menerima undangan pernikahan ${data.groomName} & ${data.brideName}.\n\nSaya akan mengkonfirmasi kehadiran saya segera.\n\nTerima kasih.`;
                    const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  style={{
                    padding: '0.8rem 1.5rem',
                    background: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontFamily: "'Jost', sans-serif",
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#128C7E'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#25D366'}
                >
                  <span>📱</span>
                  Kirim Konfirmasi via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#1a1510',
        color: '#f5f0e8',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          fontFamily: "'Cormorant Garamond', serif"
        }}>
          {data.groomName} & {data.brideName}
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Kami yang berbahagia
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          {data.weddingDay}, {data.weddingDate}
        </p>
      </div>
    </div>
  );
}

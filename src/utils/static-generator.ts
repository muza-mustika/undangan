import { InvitationData } from '../data/invitation-templates';

export class StaticGenerator {
  // Generate static HTML for offline access
  static generateStaticHTML(data: InvitationData, guestName?: string, invitationId?: string): string {
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Undangan Pernikahan ${data.groomName} & ${data.brideName}</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#b89b6e">
    
    <style>
        :root {
            --cream: #f5f0e8;
            --gold: #b89b6e;
            --gold-light: #d4b896;
            --dark: #1a1510;
            --text: #3d3529;
            --muted: #9a8e7e;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Jost', sans-serif;
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        .invitation-container {
            width: 100%;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--cream) 0%, var(--gold) 100%);
            position: relative;
        }
        
        .section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            position: relative;
            z-index: 2;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.9);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            position: relative;
            overflow: hidden;
        }
        
        .names {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 300;
            color: var(--dark);
            margin-bottom: 1rem;
        }
        
        .ampersand {
            font-size: 2rem;
            color: var(--gold);
            margin: 1rem 0;
        }
        
        .divider {
            width: 60px;
            height: 2px;
            background: var(--gold);
            margin: 2rem auto;
        }
        
        .date {
            font-size: 1.1rem;
            color: var(--text);
            margin-bottom: 1rem;
        }
        
        .subtitle {
            font-size: 0.9rem;
            color: var(--muted);
            font-style: italic;
        }
        
        .quote-section {
            background: var(--cream);
        }
        
        .quote {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-style: italic;
            line-height: 1.8;
            color: var(--text);
            margin-bottom: 2rem;
        }
        
        .quote-source {
            font-size: 1rem;
            color: var(--gold);
            font-weight: 500;
        }
        
        .couple-section {
            background: linear-gradient(135deg, var(--dark) 0%, var(--text) 100%);
            color: var(--cream);
        }
        
        .couple-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 3rem;
            align-items: center;
            max-width: 800px;
            width: 100%;
        }
        
        .person {
            text-align: center;
        }
        
        .person-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .person-title {
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .parents {
            font-size: 0.9rem;
            line-height: 1.6;
            white-space: pre-line;
        }
        
        .separator {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid var(--gold);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--gold);
        }
        
        .event-section {
            background: var(--cream);
        }
        
        .events-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 800px;
            width: 100%;
        }
        
        .event-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .event-title {
            font-size: 1.5rem;
            color: var(--gold);
            margin-bottom: 1rem;
        }
        
        .event-time {
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }
        
        .event-location {
            font-size: 0.9rem;
            color: var(--text);
            white-space: pre-line;
        }
        
        .rsvp-section {
            background: linear-gradient(135deg, var(--cream) 0%, var(--gold) 100%);
        }
        
        .guest-info {
            background: rgba(184, 155, 110, 0.1);
            padding: 1.5rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            border: 1px solid rgba(184, 155, 110, 0.3);
        }
        
        .guest-label {
            font-size: 1rem;
            color: var(--text);
            margin-bottom: 0.5rem;
        }
        
        .guest-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: var(--dark);
            font-weight: 500;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-input {
            width: 100%;
            padding: 1rem;
            border: 1px solid var(--gold);
            border-radius: 10px;
            font-size: 1rem;
            font-family: 'Jost', sans-serif;
        }
        
        .form-select {
            width: 100%;
            padding: 1rem;
            border: 1px solid var(--gold);
            border-radius: 10px;
            font-size: 1rem;
            font-family: 'Jost', sans-serif;
            color: var(--text);
        }
        
        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-family: 'Jost', sans-serif;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .btn-primary {
            background: var(--gold);
            color: #fff;
        }
        
        .btn-primary:hover {
            background: #a0875f;
        }
        
        .btn-whatsapp {
            background: #25D366;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-whatsapp:hover {
            background: #128C7E;
        }
        
        .footer-section {
            background: var(--dark);
            color: var(--cream);
            min-height: 50vh;
        }
        
        .footer-names {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .couple-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            
            .events-grid {
                grid-template-columns: 1fr;
            }
            
            .card {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="invitation-container">
        <!-- Header Section -->
        <section class="section">
            <div class="card">
                <h1 class="names">${data.groomName}</h1>
                <div class="ampersand">&</div>
                <h1 class="names">${data.brideName}</h1>
                <div class="divider"></div>
                <p class="date">${data.weddingDay}, ${data.weddingDate}</p>
                <p class="subtitle">Undangan Pernikahan</p>
            </div>
        </section>

        <!-- Quote Section -->
        <section class="section quote-section">
            <div class="card">
                <h2 style="font-size: 1.5rem; color: var(--gold); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.2em;">"Dan di antara tanda-tanda-Nya"</h2>
                <blockquote class="quote">"${data.quote}"</blockquote>
                <cite class="quote-source">— ${data.quoteSource}</cite>
            </div>
        </section>

        <!-- Couple Section -->
        <section class="section couple-section">
            <div style="max-width: 800px; width: 100%;">
                <h2 style="font-size: 2rem; text-align: center; margin-bottom: 3rem;">Mempelai</h2>
                <div class="couple-grid">
                    <div class="person" style="text-align: right;">
                        <h3 class="person-name">${data.groomName}</h3>
                        <p class="person-title">Putra Pertama</p>
                        <p class="parents">${data.groomParents}</p>
                    </div>
                    <div class="separator">&</div>
                    <div class="person" style="text-align: left;">
                        <h3 class="person-name">${data.brideName}</h3>
                        <p class="person-title">Putri Kedua</p>
                        <p class="parents">${data.brideParents}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Event Details -->
        <section class="section event-section">
            <div style="max-width: 800px; width: 100%;">
                <h2 style="font-size: 2rem; text-align: center; margin-bottom: 3rem; color: var(--dark);">Detail Acara</h2>
                <div class="events-grid">
                    <div class="event-card">
                        <h3 class="event-title">Akad Nikah</h3>
                        <p class="event-time">${data.akadTime}</p>
                        <p class="event-location">${data.akadLocation}</p>
                    </div>
                    <div class="event-card">
                        <h3 class="event-title">Resepsi</h3>
                        <p class="event-time">${data.resepsiTime}</p>
                        <p class="event-location">${data.resepsiLocation}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- RSVP Section -->
        <section class="section rsvp-section">
            <div class="card">
                <h2 style="font-size: 2rem; color: var(--dark); margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Mohon Hadir</h2>
                ${guestName ? `
                <div class="guest-info">
                    <p class="guest-label">Undangan untuk:</p>
                    <h3 class="guest-name">${guestName}</h3>
                </div>
                ` : ''}
                <p style="font-size: 1.1rem; color: var(--text); margin-bottom: 2rem;">Kehadiran Anda adalah hadiah terbaik bagi kami</p>
                
                <form onsubmit="handleSubmit(event)">
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="Nama Lengkap" value="${guestName || ''}" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-input" placeholder="Nomor Telepon" required>
                    </div>
                    <div class="form-group">
                        <select class="form-select" required>
                            <option value="">Jumlah Tamu</option>
                            <option value="1">1 orang</option>
                            <option value="2">2 orang</option>
                            <option value="3">3 orang</option>
                            <option value="4">4 orang</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Kirim Konfirmasi</button>
                    ${guestName ? `
                    <button type="button" class="btn btn-whatsapp" onclick="sendWhatsApp()" style="margin-top: 1rem;">
                        📱 Kirim Konfirmasi via WhatsApp
                    </button>
                    ` : ''}
                </form>
            </div>
        </section>

        <!-- Footer -->
        <section class="section footer-section">
            <div style="text-align: center;">
                <h2 class="footer-names">${data.groomName} & ${data.brideName}</h2>
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Kami yang berbahagia</p>
                <p style="font-size: 0.9rem; opacity: 0.8;">${data.weddingDay}, ${data.weddingDate}</p>
            </div>
        </section>
    </div>

    <script>
        // Store invitation data
        const invitationData = ${JSON.stringify(data)};
        const guestName = ${JSON.stringify(guestName || null)};
        const invitationId = ${JSON.stringify(invitationId || null)};
        
        // Save to localStorage for offline access
        localStorage.setItem('invitation-data', JSON.stringify(invitationData));
        if (guestName) localStorage.setItem('guest-name', guestName);
        if (invitationId) localStorage.setItem('invitation-id', invitationId);
        
        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            // Save to localStorage (for demo)
            const submissions = JSON.parse(localStorage.getItem('rsvp-submissions') || '[]');
            submissions.push({
                ...data,
                timestamp: new Date().toISOString(),
                invitationId: invitationId
            });
            localStorage.setItem('rsvp-submissions', JSON.stringify(submissions));
            
            alert('Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.');
            event.target.reset();
        }
        
        // WhatsApp integration
        function sendWhatsApp() {
            const message = \`Hai Admin,\\n\\nSaya \${guestName} telah menerima undangan pernikahan ${data.groomName} & ${data.brideName}.\\n\\nSaya akan mengkonfirmasi kehadiran saya segera.\\n\\nTerima kasih.\`;
            const whatsappUrl = \`https://wa.me/628123456789?text=\${encodeURIComponent(message)}\`;
            window.open(whatsappUrl, '_blank');
        }
        
        // Offline detection
        function updateOnlineStatus() {
            if (!navigator.onLine) {
                document.body.insertAdjacentHTML('afterbegin', 
                    '<div style="position: fixed; top: 10px; right: 10px; background: #ff4444; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; z-index: 9999;">Offline</div>'
                );
            } else {
                const offlineIndicator = document.querySelector('div[style*="offline"]');
                if (offlineIndicator) offlineIndicator.remove();
            }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
    </script>
</body>
</html>`;
    
    return htmlTemplate;
  }
  
  // Download static HTML file
  static downloadStaticHTML(data: InvitationData, guestName?: string, invitationId?: string) {
    const html = this.generateStaticHTML(data, guestName, invitationId);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan-${data.groomName}-${data.brideName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

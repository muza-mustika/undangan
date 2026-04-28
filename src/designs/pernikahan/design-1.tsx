import React, { useEffect, useRef } from 'react';

// Type declarations for anime.js
declare global {
  interface Window {
    anime: any;
  }
}

interface Template1Props {
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
}

export default function Template1(props: any) {
  // Handle null props case
  if (!props || !props.data) {
    return <div>Loading...</div>;
  }

  const { data } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load anime.js if not already loaded
    if (!window.anime) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        initializeAnimations();
      };
    } else {
      initializeAnimations();
    }
  }, []);

  const initializeAnimations = () => {
    if (window.anime && containerRef.current) {
      let introDone = false;
      const introEl = containerRef.current.querySelector('#intro');
      const skipBtn = containerRef.current.querySelector('#skip-btn');
      const fpEl = containerRef.current.querySelector('#fp');
      
      if (introEl) {
        // Start intro animation
        const timeline = window.anime.timeline({ autoplay: true });
        
        timeline.add({
          targets: '#ig',
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 1000
        }, 0);

        timeline.add({
          targets: '.ir',
          opacity: [0, 0.65, 0.28],
          r: (el) => [0, +el.getAttribute('r')],
          easing: 'easeOutExpo',
          duration: 1800,
          delay: window.anime.stagger(180)
        }, 150);

        timeline.add({
          targets: '#icr',
          opacity: [0, 1],
          scale: [0.2, 1],
          easing: 'easeOutElastic(1,.5)',
          duration: 900
        }, 500);

        timeline.add({
          targets: ['#ial', '#iar'],
          opacity: [0, 1],
          translateX: (el, i) => [i === 0 ? -55 : 55, 0],
          easing: 'easeOutExpo',
          duration: 1200,
          delay: window.anime.stagger(120)
        }, 800);

        timeline.add({
          targets: ['#iat', '#iab'],
          opacity: [0, 1],
          translateY: (el, i) => [i === 0 ? -45 : 45, 0],
          easing: 'easeOutExpo',
          duration: 1100
        }, 1000);

        timeline.add({
          targets: '.ip',
          opacity: [0, 0.65],
          translateY: () => [window.anime.random(-18, 18), 0],
          easing: 'easeOutQuad',
          duration: 800,
          delay: window.anime.stagger(70, { from: 'random' })
        }, 1200);

        timeline.add({
          targets: '.intro-eyebrow',
          opacity: [0, 1],
          translateY: [8, 0],
          easing: 'easeOutExpo',
          duration: 800
        }, 1400);

        timeline.add({
          targets: '.intro-sub',
          opacity: [0, 1],
          translateY: [8, 0],
          easing: 'easeOutExpo',
          duration: 800
        }, 1600);

        timeline.add({
          targets: '.intro-names',
          opacity: [0, 1],
          translateY: [28, 0],
          easing: 'easeOutExpo',
          duration: 1100
        }, 1800);

        timeline.add({
          targets: '.intro-date-row',
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 700
        }, 2500);

        timeline.add({
          targets: '#skip-btn',
          opacity: [0, 1],
          easing: 'easeOutQuad',
          duration: 600
        }, 1900);

        // Auto-end intro after 7 seconds
        setTimeout(() => {
          if (!introDone) endIntro();
        }, 7000);

        const endIntro = () => {
          if (introDone) return;
          introDone = true;
          
          window.anime({
            targets: '.ir',
            r: (el) => +el.getAttribute('r') * 2.5,
            opacity: [null, 0],
            easing: 'easeInExpo',
            duration: 700,
            delay: window.anime.stagger(50)
          });

          window.anime({
            targets: ['#ial', '#iar', '#iat', '#iab'],
            opacity: [null, 0],
            easing: 'easeInQuad',
            duration: 450
          });

          window.anime({
            targets: '.intro-content, #skip-btn',
            opacity: [null, 0],
            translateY: [0, -28],
            easing: 'easeInQuad',
            duration: 550
          });

          window.anime({
            targets: '#intro',
            opacity: [1, 0],
            easing: 'easeInQuad',
            duration: 800,
            delay: 650,
            complete: () => {
              if (introEl) {
          (introEl as HTMLElement).style.display = 'none';
        }
              if (fpEl) {
                fpEl.classList.add('live');
                launchSite();
              }
            }
          });
        };

        if (skipBtn) {
          skipBtn.addEventListener('click', () => endIntro());
        }

        const launchSite = () => {
          if (fpEl) {
            fpEl.classList.add('live');
            
            // First slide in
            const firstSlide = fpEl.querySelector('#s0');
            if (firstSlide) {
            (firstSlide as HTMLElement).style.pointerEvents = 'auto';
            firstSlide.classList.add('active');
            
            window.anime({
              targets: firstSlide,
              opacity: [0, 1],
              translateY: [36, 0],
              easing: 'easeOutExpo',
              duration: 850
            });
          }  
          }
        };

        // Looping animations after reveal
        setTimeout(() => {
          window.anime({
            targets: '.ip',
            translateY: () => [window.anime.random(-10, 10), window.anime.random(-10, 10)],
            translateX: () => [window.anime.random(-7, 7), window.anime.random(-7, 7)],
            easing: 'easeInOutSine',
            duration: () => window.anime.random(2800, 4800),
            loop: true,
            direction: 'alternate',
            delay: window.anime.stagger(180, { from: 'random' })
          });

          window.anime({
            targets: '#icr circle',
            scale: [1, 1.07, 1],
            easing: 'easeInOutSine',
            duration: 2000,
            loop: true,
            delay: window.anime.stagger(350)
          });
        }, 2200);
      }
    }
  };

  return (
    <div ref={containerRef} className="invitation-container" style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#1a1510',
      fontFamily: "'Jost', sans-serif",
      fontWeight: 300,
      color: '#3d3529',
      userSelect: 'none',
      position: 'relative',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* CSS Variables */}
      <style>{`
        :root {
          --cream: #f5f0e8;
          --gold: #b89b6e;
          --gold-light: #d4b896;
          --dark: #1a1510;
          --text: #3d3529;
          --muted: #9a8e7e;
        }
        
        .invitation-container, .invitation-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .invitation-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: var(--dark);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          color: var(--text);
          user-select: none;
          position: relative;
        }
        
        #intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--dark);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .intro-content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .intro-eyebrow {
          font-size: 9px;
          letter-spacing: 0.6em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0;
          margin-bottom: 0.5rem;
        }
        
        .intro-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.9rem, 2.5vw, 1.3rem);
          color: var(--gold-light);
          opacity: 0;
          letter-spacing: 0.04em;
          margin-bottom: 1.5rem;
        }
        
        .intro-names {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(4rem, 13vw, 8.5rem);
          line-height: 0.9;
          color: var(--cream);
          opacity: 0;
          letter-spacing: -0.03em;
        }
        
        .intro-amp {
          display: block;
          font-style: italic;
          color: var(--gold);
          font-size: 0.52em;
          margin: 0.18em 0;
        }
        
        .intro-date-row {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-top: 2rem;
          opacity: 0;
        }
        
        .intro-date-row .bar {
          width: 36px;
          height: 1px;
          background: var(--gold);
          opacity: 0.4;
        }
        
        .intro-date-text {
          font-size: 9px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--muted);
        }
        
        #skip-btn {
          position: absolute;
          top: 1.6rem;
          right: 1.8rem;
          z-index: 3;
          background: transparent;
          border: 1px solid rgba(184, 155, 110, 0.28);
          color: var(--muted);
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          cursor: pointer;
          opacity: 0;
          transition: border-color 0.3s, color 0.3s;
        }
        
        #skip-btn:hover {
          border-color: var(--gold);
          color: var(--gold-light);
        }
        
        #fp {
          position: fixed;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }
        
        #fp.live {
          opacity: 1;
          pointer-events: auto;
        }
        
        .slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          padding: 1.5rem;
        }
        
        .slide.active {
          pointer-events: auto;
        }
        
        .lbl {
          font-size: 9px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: var(--gold);
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .lbl.lt {
          color: var(--gold-light);
        }
        
        .hl {
          width: 36px;
          height: 1px;
          background: var(--gold);
          margin: 0 auto 1.8rem;
          opacity: 0.45;
        }
        
        .hl.lt {
          background: var(--gold-light);
          opacity: 0.3;
        }
        
        .ttl {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.9rem, 5vw, 3rem);
          text-align: center;
          line-height: 1.15;
          color: var(--dark);
          margin-bottom: 1.2rem;
        }
        
        .ttl em {
          font-style: italic;
          color: var(--gold);
        }
        
        .ttl.lt {
          color: var(--cream);
        }
        
        @media (max-width: 480px) {
          .cgrid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
            text-align: center;
          }
        }
      `}</style>

      {/* Font imports */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap"
        rel="stylesheet"
      />

      {/* Intro Section */}
      <div id="intro">
        <svg id="intro-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b89b6e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#b89b6e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* glow */}
          <ellipse id="ig" cx="500" cy="300" rx="300" ry="200" fill="url(#rg1)" opacity="0" />

          {/* expanding rings */}
          <circle className="ir" cx="500" cy="300" r="28" fill="none" stroke="#b89b6e" strokeWidth="1" opacity="0" />
          <circle className="ir" cx="500" cy="300" r="58" fill="none" stroke="#b89b6e" strokeWidth="0.8" opacity="0" />
          <circle className="ir" cx="500" cy="300" r="100" fill="none" stroke="#b89b6e" strokeWidth="0.7" opacity="0" />
          <circle className="ir" cx="500" cy="300" r="160" fill="none" stroke="#b89b6e" strokeWidth="0.5" opacity="0" />
          <circle className="ir" cx="500" cy="300" r="240" fill="none" stroke="#b89b6e" strokeWidth="0.4" opacity="0" />
          <circle className="ir" cx="500" cy="300" r="340" fill="none" stroke="#b89b6e" strokeWidth="0.3" opacity="0" />

          {/* wedding rings center */}
          <g id="icr" opacity="0">
            <circle cx="487" cy="300" r="20" fill="none" stroke="#b89b6e" strokeWidth="1.6" opacity="0.9" />
            <circle cx="513" cy="300" r="20" fill="none" stroke="#b89b6e" strokeWidth="1.6" opacity="0.9" />
          </g>

          {/* botanical elements */}
          <g id="ial" opacity="0">
            <line x1="480" y1="300" x2="60" y2="300" stroke="#b89b6e" strokeWidth="0.5" opacity="0.25" />
            <ellipse cx="230" cy="278" rx="34" ry="13" fill="none" stroke="#b89b6e" strokeWidth="0.8" opacity="0.5" transform="rotate(-22,230,278)" />
            <ellipse cx="190" cy="312" rx="26" ry="10" fill="none" stroke="#b89b6e" strokeWidth="0.7" opacity="0.4" transform="rotate(-38,190,312)" />
            <ellipse cx="270" cy="265" rx="20" ry="8" fill="none" stroke="#b89b6e" strokeWidth="0.6" opacity="0.35" transform="rotate(-12,270,265)" />
            <ellipse cx="155" cy="292" rx="16" ry="6" fill="none" stroke="#b89b6e" strokeWidth="0.5" opacity="0.28" transform="rotate(-48,155,292)" />
            <circle cx="68" cy="300" r="3" fill="#b89b6e" opacity="0.4" />
          </g>

          <g id="iar" opacity="0">
            <line x1="520" y1="300" x2="940" y2="300" stroke="#b89b6e" strokeWidth="0.5" opacity="0.25" />
            <ellipse cx="770" cy="278" rx="34" ry="13" fill="none" stroke="#b89b6e" strokeWidth="0.8" opacity="0.5" transform="rotate(22,770,278)" />
            <ellipse cx="810" cy="312" rx="26" ry="10" fill="none" stroke="#b89b6e" strokeWidth="0.7" opacity="0.4" transform="rotate(38,810,312)" />
            <ellipse cx="730" cy="265" rx="20" ry="8" fill="none" stroke="#b89b6e" strokeWidth="0.6" opacity="0.35" transform="rotate(12,730,265)" />
            <ellipse cx="845" cy="292" rx="16" ry="6" fill="none" stroke="#b89b6e" strokeWidth="0.5" opacity="0.28" transform="rotate(48,845,292)" />
            <circle cx="932" cy="300" r="3" fill="#b89b6e" opacity="0.4" />
          </g>

          {/* floating particles */}
          <circle className="ip" cx="140" cy="95" r="1.5" fill="#b89b6e" />
          <circle className="ip" cx="860" cy="78" r="1" fill="#b89b6e" />
          <circle className="ip" cx="95" cy="490" r="1.5" fill="#b89b6e" />
          <circle className="ip" cx="905" cy="465" r="1" fill="#b89b6e" />
          <circle className="ip" cx="290" cy="48" r="1" fill="#b89b6e" />
          <circle className="ip" cx="710" cy="545" r="1.5" fill="#b89b6e" />
          <circle className="ip" cx="45" cy="305" r="1" fill="#b89b6e" />
          <circle className="ip" cx="955" cy="315" r="1" fill="#b89b6e" />
        </svg>

        <div className="intro-content">
          <p className="intro-eyebrow">Dengan penuh kebahagiaan, kami mengundang</p>
          <p className="intro-sub">kehadiran Anda dalam perayaan pernikahan</p>
          <h1 className="intro-names">
            {data.groomName}
            <span className="intro-amp">&amp;</span>
            {data.brideName}
          </h1>
          <div className="intro-date-row">
            <span className="bar"></span>
            <span className="intro-date-text">{data.weddingDate} · Jakarta</span>
            <span className="bar"></span>
          </div>
        </div>

        <button id="skip-btn">Lewati ✕</button>
      </div>

      {/* Fullpage Content */}
      <div id="fp">
        {/* S0: Cover */}
        <div className="slide" id="s0" style={{ background: 'var(--cream)' }}>
          <div className="cvwrap">
            <p className="cvlbl">Undangan Pernikahan</p>
            <svg width="58" height="17" viewBox="0 0 58 17" style={{ display: 'block', margin: '0 auto 1.2rem', opacity: 0.65 }}>
              <line x1="0" y1="8.5" x2="21" y2="8.5" stroke="#b89b6e" strokeWidth="0.8" />
              <circle cx="29" cy="8.5" r="5" fill="none" stroke="#b89b6e" strokeWidth="0.8" />
              <line x1="37" y1="8.5" x2="58" y2="8.5" stroke="#b89b6e" strokeWidth="0.8" />
            </svg>
            <h1 className="cvnames">
              {data.groomName}<span className="cvamp">&amp;</span>{data.brideName}
            </h1>
            <div className="hl" style={{ marginTop: '1.4rem' }}></div>
            <p className="cvdate">{data.weddingDay}, {data.weddingDate}</p>
          </div>
        </div>

        {/* S1: Quote */}
        <div className="slide" id="s1" style={{ background: 'var(--cream)' }}>
          <div style={{ maxWidth: '560px', textAlign: 'center' }}>
            <svg width="110" height="28" viewBox="0 0 110 28" style={{ display: 'block', margin: '0 auto 2rem', opacity: 0.45 }}>
              <line x1="0" y1="14" x2="40" y2="14" stroke="#b89b6e" strokeWidth="0.7" />
              <circle cx="55" cy="14" r="6" fill="none" stroke="#b89b6e" strokeWidth="0.8" />
              <circle cx="55" cy="14" r="2" fill="#b89b6e" opacity="0.55" />
              <line x1="70" y1="14" x2="110" y2="14" stroke="#b89b6e" strokeWidth="0.7" />
            </svg>
            <p className="lbl">Dan di antara tanda-tanda-Nya</p>
            <div className="hl"></div>
            <p className="qtext">"{data.quote}"</p>
            <p className="qref">{data.quoteSource}</p>
          </div>
        </div>

        {/* S2: Mempelai */}
        <div className="slide" id="s2" style={{ background: 'var(--cream)' }}>
          <div style={{ width: '100%', maxWidth: '620px' }}>
            <p className="lbl">Mempelai</p>
            <div className="hl"></div>
            <div className="cgrid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '1.8rem', width: '100%', maxWidth: '600px' }}>
              <div style={{ textAlign: 'right' }}>
                <p className="pname">{data.groomName}</p>
                <p className="pord">Putra Pertama</p>
                <p className="ppar">{data.groomParents}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <svg width="52" height="86" viewBox="0 0 52 86">
                  <circle cx="18" cy="43" r="16" fill="none" stroke="#b89b6e" strokeWidth="1.3" opacity="0.72" />
                  <circle cx="34" cy="43" r="16" fill="none" stroke="#b89b6e" strokeWidth="1.3" opacity="0.72" />
                  <line x1="26" y1="8" x2="26" y2="24" stroke="#b89b6e" strokeWidth="0.7" opacity="0.32" />
                  <line x1="26" y1="62" x2="26" y2="78" stroke="#b89b6e" strokeWidth="0.7" opacity="0.32" />
                  <circle cx="26" cy="6" r="2" fill="#b89b6e" opacity="0.45" />
                  <circle cx="26" cy="80" r="2" fill="#b89b6e" opacity="0.45" />
                </svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p className="pname">{data.brideName}</p>
                <p className="pord">Putri Kedua</p>
                <p className="ppar">{data.brideParents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* S3: Akad */}
        <div className="slide" id="s3" style={{ background: '#1e1810' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <p className="lbl lt">Akad Nikah</p>
            <div className="hl lt"></div>
            <p className="evbig">{data.weddingDay}</p>
            <p className="evbig" style={{ fontStyle: 'italic', color: 'var(--gold-light)', fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', marginTop: '0.2rem' }}>
              {data.weddingDate}
            </p>
            <p className="evsub">
              <span style={{ color: 'var(--gold-light)' }}>{data.akadTime}</span>
              <br />
              {data.akadLocation}
            </p>
          </div>
        </div>

        {/* S4: Resepsi */}
        <div className="slide" id="s4" style={{ background: 'var(--cream)' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <p className="lbl">Resepsi Pernikahan</p>
            <div className="hl"></div>
            <p className="evbig" style={{ color: 'var(--dark)' }}>{data.weddingDay}</p>
            <p className="evbig" style={{ fontStyle: 'italic', color: 'var(--gold)', fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', marginTop: '0.2rem' }}>
              {data.weddingDate}
            </p>
            <p className="evsub" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--gold)' }}>{data.resepsiTime}</span>
              <br />
              {data.resepsiLocation}
            </p>
          </div>
        </div>

        {/* S5: Countdown */}
        <div className="slide" id="s5" style={{ background: 'var(--dark)' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="lbl lt">Menghitung Hari</p>
            <div className="hl lt"></div>
            <h2 className="ttl lt">Hampir <em>Tiba</em></h2>
            <div className="cdgrid" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.2rem, 4vw, 3rem)', marginTop: '1.5rem' }}>
              <div className="cdi"><span className="cdn" id="cdh">00</span><span className="cdl">Hari</span></div>
              <div className="cdi"><span className="cdn" id="cdj">00</span><span className="cdl">Jam</span></div>
              <div className="cdi"><span className="cdn" id="cdm">00</span><span className="cdl">Menit</span></div>
              <div className="cdi"><span className="cdn" id="cds">00</span><span className="cdl">Detik</span></div>
            </div>
          </div>
        </div>

        {/* S6: RSVP */}
        <div className="slide" id="s6" style={{ background: 'var(--cream)' }}>
          <div style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
            <p className="lbl">Konfirmasi Kehadiran</p>
            <div className="hl"></div>
            <h2 className="ttl">Mohon <em>Hadir</em></h2>
            <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.9' }}>
              Kehadiran Anda adalah hadiah terbaik bagi kami.
            </p>
            <div className="rform" style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--gold-light)', width: '100%', maxWidth: '400px', margin: '1.2rem auto 0' }}>
              <input type="text" placeholder="Nama Lengkap" style={{ width: '100%', padding: '0.95rem 1.3rem', background: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Jost', fontWeight: 300, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.05em' }} />
              <input type="text" placeholder="Nomor Telepon" style={{ width: '100%', padding: '0.95rem 1.3rem', background: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Jost', fontWeight: 300, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.05em' }} />
              <select defaultValue="" style={{ width: '100%', padding: '0.95rem 1.3rem', background: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Jost', fontWeight: 300, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.05em' }}>
                <option value="" disabled>Jumlah Tamu</option>
                <option>1 orang</option>
                <option>2 orang</option>
                <option>3 orang</option>
                <option>4 orang</option>
              </select>
              <select defaultValue="" style={{ width: '100%', padding: '0.95rem 1.3rem', background: 'var(--cream)', border: 'none', outline: 'none', fontFamily: 'Jost', fontWeight: 300, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.05em' }}>
                <option value="" disabled>Konfirmasi Kehadiran</option>
                <option>Hadir</option>
                <option>Tidak Hadir</option>
                <option>Mungkin Hadir</option>
              </select>
            </div>
            <button className="rbtn" style={{ display: 'block', margin: '1.4rem auto 0', padding: '0.9rem 2.5rem', background: 'var(--gold)', color: 'var(--cream)', border: 'none', fontFamily: 'Jost', fontWeight: 300, fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.3s' }}>
              Kirim Konfirmasi
            </button>
          </div>
        </div>

        {/* S7: Close */}
        <div className="slide" id="s7" style={{ background: 'var(--dark)' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="ftnames" style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', color: 'var(--gold-light)', fontWeight: 300, textAlign: 'center', display: 'block', marginBottom: '0.8rem' }}>
              {data.groomName} &amp; {data.brideName}
            </span>
            <div className="hl lt" style={{ marginTop: '1rem' }}></div>
            <p className="ftsub">
              Kami yang berbahagia
              <br />
              {data.weddingDay}, {data.weddingDate} · Jakarta
            </p>
            <p style={{ marginTop: '2rem', fontSize: '8px', letterSpacing: '0.35em', color: '#2e2820' }}>
              #{data.groomName.replace(/\s+/g, '')}{data.brideName.replace(/\s+/g, '')}2025
            </p>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div id="nav-dots" style={{ position: 'fixed', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '9px', zIndex: 200, opacity: 0 }}>
        {/* Dots will be generated by JavaScript */}
      </div>

      <div id="counter" style={{ position: 'fixed', bottom: '1.4rem', right: '1.6rem', fontSize: '8px', letterSpacing: '0.35em', color: 'var(--muted)', zIndex: 200, opacity: 0 }}>
        01 / 08
      </div>

      <div id="flash" style={{ position: 'fixed', inset: 0, background: 'var(--cream)', opacity: 0, zIndex: 100, pointerEvents: 'none' }}></div>
    </div>
  );
}

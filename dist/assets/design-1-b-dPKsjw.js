import{n as e,r as t,t as n}from"./index-CBEddnNh.js";var r=t(e(),1),i=n();function a({data:e}){if(!e)return(0,i.jsx)(`div`,{children:`Loading...`});let t=(0,r.useRef)(null);(0,r.useEffect)(()=>{if(window.anime)n();else{let e=document.createElement(`script`);e.src=`https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`,e.async=!0,document.head.appendChild(e),e.onload=()=>{n()}}},[]);let n=()=>{if(window.anime&&t.current){let e=!1,n=t.current.querySelector(`#intro`),r=t.current.querySelector(`#skip-btn`),i=t.current.querySelector(`#fp`);if(n){let t=window.anime.timeline({autoplay:!0});t.add({targets:`#ig`,opacity:[0,1],easing:`easeOutQuad`,duration:1e3},0),t.add({targets:`.ir`,opacity:[0,.65,.28],r:e=>[0,+e.getAttribute(`r`)],easing:`easeOutExpo`,duration:1800,delay:window.anime.stagger(180)},150),t.add({targets:`#icr`,opacity:[0,1],scale:[.2,1],easing:`easeOutElastic(1,.5)`,duration:900},500),t.add({targets:[`#ial`,`#iar`],opacity:[0,1],translateX:(e,t)=>[t===0?-55:55,0],easing:`easeOutExpo`,duration:1200,delay:window.anime.stagger(120)},800),t.add({targets:[`#iat`,`#iab`],opacity:[0,1],translateY:(e,t)=>[t===0?-45:45,0],easing:`easeOutExpo`,duration:1100},1e3),t.add({targets:`.ip`,opacity:[0,.65],translateY:()=>[window.anime.random(-18,18),0],easing:`easeOutQuad`,duration:800,delay:window.anime.stagger(70,{from:`random`})},1200),t.add({targets:`.intro-eyebrow`,opacity:[0,1],translateY:[8,0],easing:`easeOutExpo`,duration:800},1400),t.add({targets:`.intro-sub`,opacity:[0,1],translateY:[8,0],easing:`easeOutExpo`,duration:800},1600),t.add({targets:`.intro-names`,opacity:[0,1],translateY:[28,0],easing:`easeOutExpo`,duration:1100},1800),t.add({targets:`.intro-date-row`,opacity:[0,1],easing:`easeOutQuad`,duration:700},2500),t.add({targets:`#skip-btn`,opacity:[0,1],easing:`easeOutQuad`,duration:600},1900),setTimeout(()=>{e||a()},7e3);let a=()=>{e||(e=!0,window.anime({targets:`.ir`,r:e=>e.getAttribute(`r`)*2.5,opacity:[null,0],easing:`easeInExpo`,duration:700,delay:window.anime.stagger(50)}),window.anime({targets:[`#ial`,`#iar`,`#iat`,`#iab`],opacity:[null,0],easing:`easeInQuad`,duration:450}),window.anime({targets:`.intro-content, #skip-btn`,opacity:[null,0],translateY:[0,-28],easing:`easeInQuad`,duration:550}),window.anime({targets:`#intro`,opacity:[1,0],easing:`easeInQuad`,duration:800,delay:650,complete:()=>{n&&(n.style.display=`none`),i&&(i.classList.add(`live`),o())}}))};r&&r.addEventListener(`click`,()=>a());let o=()=>{if(i){i.classList.add(`live`);let e=i.querySelector(`#s0`);e&&(e.style.pointerEvents=`auto`,e.classList.add(`active`),window.anime({targets:e,opacity:[0,1],translateY:[36,0],easing:`easeOutExpo`,duration:850}))}};setTimeout(()=>{window.anime({targets:`.ip`,translateY:()=>[window.anime.random(-10,10),window.anime.random(-10,10)],translateX:()=>[window.anime.random(-7,7),window.anime.random(-7,7)],easing:`easeInOutSine`,duration:()=>window.anime.random(2800,4800),loop:!0,direction:`alternate`,delay:window.anime.stagger(180,{from:`random`})}),window.anime({targets:`#icr circle`,scale:[1,1.07,1],easing:`easeInOutSine`,duration:2e3,loop:!0,delay:window.anime.stagger(350)})},2200)}}};return(0,i.jsxs)(`div`,{ref:t,className:`invitation-container`,style:{width:`100%`,height:`100vh`,overflow:`hidden`,background:`#1a1510`,fontFamily:`'Jost', sans-serif`,fontWeight:300,color:`#3d3529`,userSelect:`none`,position:`relative`,margin:0,padding:0,boxSizing:`border-box`},children:[(0,i.jsx)(`style`,{children:`
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
      `}),(0,i.jsx)(`link`,{href:`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap`,rel:`stylesheet`}),(0,i.jsxs)(`div`,{id:`intro`,children:[(0,i.jsxs)(`svg`,{id:`intro-svg`,viewBox:`0 0 1000 600`,preserveAspectRatio:`xMidYMid slice`,children:[(0,i.jsx)(`defs`,{children:(0,i.jsxs)(`radialGradient`,{id:`rg1`,cx:`50%`,cy:`50%`,r:`50%`,children:[(0,i.jsx)(`stop`,{offset:`0%`,stopColor:`#b89b6e`,stopOpacity:`0.2`}),(0,i.jsx)(`stop`,{offset:`100%`,stopColor:`#b89b6e`,stopOpacity:`0`})]})}),(0,i.jsx)(`ellipse`,{id:`ig`,cx:`500`,cy:`300`,rx:`300`,ry:`200`,fill:`url(#rg1)`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`28`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`1`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`58`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.8`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`100`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.7`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`160`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.5`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`240`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.4`,opacity:`0`}),(0,i.jsx)(`circle`,{className:`ir`,cx:`500`,cy:`300`,r:`340`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.3`,opacity:`0`}),(0,i.jsxs)(`g`,{id:`icr`,opacity:`0`,children:[(0,i.jsx)(`circle`,{cx:`487`,cy:`300`,r:`20`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`1.6`,opacity:`0.9`}),(0,i.jsx)(`circle`,{cx:`513`,cy:`300`,r:`20`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`1.6`,opacity:`0.9`})]}),(0,i.jsxs)(`g`,{id:`ial`,opacity:`0`,children:[(0,i.jsx)(`line`,{x1:`480`,y1:`300`,x2:`60`,y2:`300`,stroke:`#b89b6e`,strokeWidth:`0.5`,opacity:`0.25`}),(0,i.jsx)(`ellipse`,{cx:`230`,cy:`278`,rx:`34`,ry:`13`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.8`,opacity:`0.5`,transform:`rotate(-22,230,278)`}),(0,i.jsx)(`ellipse`,{cx:`190`,cy:`312`,rx:`26`,ry:`10`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.7`,opacity:`0.4`,transform:`rotate(-38,190,312)`}),(0,i.jsx)(`ellipse`,{cx:`270`,cy:`265`,rx:`20`,ry:`8`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.6`,opacity:`0.35`,transform:`rotate(-12,270,265)`}),(0,i.jsx)(`ellipse`,{cx:`155`,cy:`292`,rx:`16`,ry:`6`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.5`,opacity:`0.28`,transform:`rotate(-48,155,292)`}),(0,i.jsx)(`circle`,{cx:`68`,cy:`300`,r:`3`,fill:`#b89b6e`,opacity:`0.4`})]}),(0,i.jsxs)(`g`,{id:`iar`,opacity:`0`,children:[(0,i.jsx)(`line`,{x1:`520`,y1:`300`,x2:`940`,y2:`300`,stroke:`#b89b6e`,strokeWidth:`0.5`,opacity:`0.25`}),(0,i.jsx)(`ellipse`,{cx:`770`,cy:`278`,rx:`34`,ry:`13`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.8`,opacity:`0.5`,transform:`rotate(22,770,278)`}),(0,i.jsx)(`ellipse`,{cx:`810`,cy:`312`,rx:`26`,ry:`10`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.7`,opacity:`0.4`,transform:`rotate(38,810,312)`}),(0,i.jsx)(`ellipse`,{cx:`730`,cy:`265`,rx:`20`,ry:`8`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.6`,opacity:`0.35`,transform:`rotate(12,730,265)`}),(0,i.jsx)(`ellipse`,{cx:`845`,cy:`292`,rx:`16`,ry:`6`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.5`,opacity:`0.28`,transform:`rotate(48,845,292)`}),(0,i.jsx)(`circle`,{cx:`932`,cy:`300`,r:`3`,fill:`#b89b6e`,opacity:`0.4`})]}),(0,i.jsx)(`circle`,{className:`ip`,cx:`140`,cy:`95`,r:`1.5`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`860`,cy:`78`,r:`1`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`95`,cy:`490`,r:`1.5`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`905`,cy:`465`,r:`1`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`290`,cy:`48`,r:`1`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`710`,cy:`545`,r:`1.5`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`45`,cy:`305`,r:`1`,fill:`#b89b6e`}),(0,i.jsx)(`circle`,{className:`ip`,cx:`955`,cy:`315`,r:`1`,fill:`#b89b6e`})]}),(0,i.jsxs)(`div`,{className:`intro-content`,children:[(0,i.jsx)(`p`,{className:`intro-eyebrow`,children:`Dengan penuh kebahagiaan, kami mengundang`}),(0,i.jsx)(`p`,{className:`intro-sub`,children:`kehadiran Anda dalam perayaan pernikahan`}),(0,i.jsxs)(`h1`,{className:`intro-names`,children:[e.groomName,(0,i.jsx)(`span`,{className:`intro-amp`,children:`&`}),e.brideName]}),(0,i.jsxs)(`div`,{className:`intro-date-row`,children:[(0,i.jsx)(`span`,{className:`bar`}),(0,i.jsxs)(`span`,{className:`intro-date-text`,children:[e.weddingDate,` · Jakarta`]}),(0,i.jsx)(`span`,{className:`bar`})]})]}),(0,i.jsx)(`button`,{id:`skip-btn`,children:`Lewati ✕`})]}),(0,i.jsxs)(`div`,{id:`fp`,children:[(0,i.jsx)(`div`,{className:`slide`,id:`s0`,style:{background:`var(--cream)`},children:(0,i.jsxs)(`div`,{className:`cvwrap`,children:[(0,i.jsx)(`p`,{className:`cvlbl`,children:`Undangan Pernikahan`}),(0,i.jsxs)(`svg`,{width:`58`,height:`17`,viewBox:`0 0 58 17`,style:{display:`block`,margin:`0 auto 1.2rem`,opacity:.65},children:[(0,i.jsx)(`line`,{x1:`0`,y1:`8.5`,x2:`21`,y2:`8.5`,stroke:`#b89b6e`,strokeWidth:`0.8`}),(0,i.jsx)(`circle`,{cx:`29`,cy:`8.5`,r:`5`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.8`}),(0,i.jsx)(`line`,{x1:`37`,y1:`8.5`,x2:`58`,y2:`8.5`,stroke:`#b89b6e`,strokeWidth:`0.8`})]}),(0,i.jsxs)(`h1`,{className:`cvnames`,children:[e.groomName,(0,i.jsx)(`span`,{className:`cvamp`,children:`&`}),e.brideName]}),(0,i.jsx)(`div`,{className:`hl`,style:{marginTop:`1.4rem`}}),(0,i.jsxs)(`p`,{className:`cvdate`,children:[e.weddingDay,`, `,e.weddingDate]})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s1`,style:{background:`var(--cream)`},children:(0,i.jsxs)(`div`,{style:{maxWidth:`560px`,textAlign:`center`},children:[(0,i.jsxs)(`svg`,{width:`110`,height:`28`,viewBox:`0 0 110 28`,style:{display:`block`,margin:`0 auto 2rem`,opacity:.45},children:[(0,i.jsx)(`line`,{x1:`0`,y1:`14`,x2:`40`,y2:`14`,stroke:`#b89b6e`,strokeWidth:`0.7`}),(0,i.jsx)(`circle`,{cx:`55`,cy:`14`,r:`6`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`0.8`}),(0,i.jsx)(`circle`,{cx:`55`,cy:`14`,r:`2`,fill:`#b89b6e`,opacity:`0.55`}),(0,i.jsx)(`line`,{x1:`70`,y1:`14`,x2:`110`,y2:`14`,stroke:`#b89b6e`,strokeWidth:`0.7`})]}),(0,i.jsx)(`p`,{className:`lbl`,children:`Dan di antara tanda-tanda-Nya`}),(0,i.jsx)(`div`,{className:`hl`}),(0,i.jsxs)(`p`,{className:`qtext`,children:[`"`,e.quote,`"`]}),(0,i.jsx)(`p`,{className:`qref`,children:e.quoteSource})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s2`,style:{background:`var(--cream)`},children:(0,i.jsxs)(`div`,{style:{width:`100%`,maxWidth:`620px`},children:[(0,i.jsx)(`p`,{className:`lbl`,children:`Mempelai`}),(0,i.jsx)(`div`,{className:`hl`}),(0,i.jsxs)(`div`,{className:`cgrid`,style:{display:`grid`,gridTemplateColumns:`1fr auto 1fr`,alignItems:`center`,gap:`1.8rem`,width:`100%`,maxWidth:`600px`},children:[(0,i.jsxs)(`div`,{style:{textAlign:`right`},children:[(0,i.jsx)(`p`,{className:`pname`,children:e.groomName}),(0,i.jsx)(`p`,{className:`pord`,children:`Putra Pertama`}),(0,i.jsx)(`p`,{className:`ppar`,children:e.groomParents})]}),(0,i.jsx)(`div`,{style:{textAlign:`center`},children:(0,i.jsxs)(`svg`,{width:`52`,height:`86`,viewBox:`0 0 52 86`,children:[(0,i.jsx)(`circle`,{cx:`18`,cy:`43`,r:`16`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`1.3`,opacity:`0.72`}),(0,i.jsx)(`circle`,{cx:`34`,cy:`43`,r:`16`,fill:`none`,stroke:`#b89b6e`,strokeWidth:`1.3`,opacity:`0.72`}),(0,i.jsx)(`line`,{x1:`26`,y1:`8`,x2:`26`,y2:`24`,stroke:`#b89b6e`,strokeWidth:`0.7`,opacity:`0.32`}),(0,i.jsx)(`line`,{x1:`26`,y1:`62`,x2:`26`,y2:`78`,stroke:`#b89b6e`,strokeWidth:`0.7`,opacity:`0.32`}),(0,i.jsx)(`circle`,{cx:`26`,cy:`6`,r:`2`,fill:`#b89b6e`,opacity:`0.45`}),(0,i.jsx)(`circle`,{cx:`26`,cy:`80`,r:`2`,fill:`#b89b6e`,opacity:`0.45`})]})}),(0,i.jsxs)(`div`,{style:{textAlign:`left`},children:[(0,i.jsx)(`p`,{className:`pname`,children:e.brideName}),(0,i.jsx)(`p`,{className:`pord`,children:`Putri Kedua`}),(0,i.jsx)(`p`,{className:`ppar`,children:e.brideParents})]})]})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s3`,style:{background:`#1e1810`},children:(0,i.jsxs)(`div`,{style:{textAlign:`center`,maxWidth:`500px`},children:[(0,i.jsx)(`p`,{className:`lbl lt`,children:`Akad Nikah`}),(0,i.jsx)(`div`,{className:`hl lt`}),(0,i.jsx)(`p`,{className:`evbig`,children:e.weddingDay}),(0,i.jsx)(`p`,{className:`evbig`,style:{fontStyle:`italic`,color:`var(--gold-light)`,fontSize:`clamp(1.4rem, 4vw, 2.4rem)`,marginTop:`0.2rem`},children:e.weddingDate}),(0,i.jsxs)(`p`,{className:`evsub`,children:[(0,i.jsx)(`span`,{style:{color:`var(--gold-light)`},children:e.akadTime}),(0,i.jsx)(`br`,{}),e.akadLocation]})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s4`,style:{background:`var(--cream)`},children:(0,i.jsxs)(`div`,{style:{textAlign:`center`,maxWidth:`500px`},children:[(0,i.jsx)(`p`,{className:`lbl`,children:`Resepsi Pernikahan`}),(0,i.jsx)(`div`,{className:`hl`}),(0,i.jsx)(`p`,{className:`evbig`,style:{color:`var(--dark)`},children:e.weddingDay}),(0,i.jsx)(`p`,{className:`evbig`,style:{fontStyle:`italic`,color:`var(--gold)`,fontSize:`clamp(1.4rem, 4vw, 2.4rem)`,marginTop:`0.2rem`},children:e.weddingDate}),(0,i.jsxs)(`p`,{className:`evsub`,style:{color:`var(--muted)`},children:[(0,i.jsx)(`span`,{style:{color:`var(--gold)`},children:e.resepsiTime}),(0,i.jsx)(`br`,{}),e.resepsiLocation]})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s5`,style:{background:`var(--dark)`},children:(0,i.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,i.jsx)(`p`,{className:`lbl lt`,children:`Menghitung Hari`}),(0,i.jsx)(`div`,{className:`hl lt`}),(0,i.jsxs)(`h2`,{className:`ttl lt`,children:[`Hampir `,(0,i.jsx)(`em`,{children:`Tiba`})]}),(0,i.jsxs)(`div`,{className:`cdgrid`,style:{display:`flex`,justifyContent:`center`,gap:`clamp(1.2rem, 4vw, 3rem)`,marginTop:`1.5rem`},children:[(0,i.jsxs)(`div`,{className:`cdi`,children:[(0,i.jsx)(`span`,{className:`cdn`,id:`cdh`,children:`00`}),(0,i.jsx)(`span`,{className:`cdl`,children:`Hari`})]}),(0,i.jsxs)(`div`,{className:`cdi`,children:[(0,i.jsx)(`span`,{className:`cdn`,id:`cdj`,children:`00`}),(0,i.jsx)(`span`,{className:`cdl`,children:`Jam`})]}),(0,i.jsxs)(`div`,{className:`cdi`,children:[(0,i.jsx)(`span`,{className:`cdn`,id:`cdm`,children:`00`}),(0,i.jsx)(`span`,{className:`cdl`,children:`Menit`})]}),(0,i.jsxs)(`div`,{className:`cdi`,children:[(0,i.jsx)(`span`,{className:`cdn`,id:`cds`,children:`00`}),(0,i.jsx)(`span`,{className:`cdl`,children:`Detik`})]})]})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s6`,style:{background:`var(--cream)`},children:(0,i.jsxs)(`div`,{style:{width:`100%`,maxWidth:`440px`,textAlign:`center`},children:[(0,i.jsx)(`p`,{className:`lbl`,children:`Konfirmasi Kehadiran`}),(0,i.jsx)(`div`,{className:`hl`}),(0,i.jsxs)(`h2`,{className:`ttl`,children:[`Mohon `,(0,i.jsx)(`em`,{children:`Hadir`})]}),(0,i.jsx)(`p`,{style:{fontSize:`11px`,color:`var(--muted)`,lineHeight:`1.9`},children:`Kehadiran Anda adalah hadiah terbaik bagi kami.`}),(0,i.jsxs)(`div`,{className:`rform`,style:{display:`flex`,flexDirection:`column`,gap:`1px`,background:`var(--gold-light)`,width:`100%`,maxWidth:`400px`,margin:`1.2rem auto 0`},children:[(0,i.jsx)(`input`,{type:`text`,placeholder:`Nama Lengkap`,style:{width:`100%`,padding:`0.95rem 1.3rem`,background:`var(--cream)`,border:`none`,outline:`none`,fontFamily:`Jost`,fontWeight:300,fontSize:`13px`,color:`var(--text)`,letterSpacing:`0.05em`}}),(0,i.jsx)(`input`,{type:`text`,placeholder:`Nomor Telepon`,style:{width:`100%`,padding:`0.95rem 1.3rem`,background:`var(--cream)`,border:`none`,outline:`none`,fontFamily:`Jost`,fontWeight:300,fontSize:`13px`,color:`var(--text)`,letterSpacing:`0.05em`}}),(0,i.jsxs)(`select`,{defaultValue:``,style:{width:`100%`,padding:`0.95rem 1.3rem`,background:`var(--cream)`,border:`none`,outline:`none`,fontFamily:`Jost`,fontWeight:300,fontSize:`13px`,color:`var(--text)`,letterSpacing:`0.05em`},children:[(0,i.jsx)(`option`,{value:``,disabled:!0,children:`Jumlah Tamu`}),(0,i.jsx)(`option`,{children:`1 orang`}),(0,i.jsx)(`option`,{children:`2 orang`}),(0,i.jsx)(`option`,{children:`3 orang`}),(0,i.jsx)(`option`,{children:`4 orang`})]}),(0,i.jsxs)(`select`,{defaultValue:``,style:{width:`100%`,padding:`0.95rem 1.3rem`,background:`var(--cream)`,border:`none`,outline:`none`,fontFamily:`Jost`,fontWeight:300,fontSize:`13px`,color:`var(--text)`,letterSpacing:`0.05em`},children:[(0,i.jsx)(`option`,{value:``,disabled:!0,children:`Konfirmasi Kehadiran`}),(0,i.jsx)(`option`,{children:`Hadir`}),(0,i.jsx)(`option`,{children:`Tidak Hadir`}),(0,i.jsx)(`option`,{children:`Mungkin Hadir`})]})]}),(0,i.jsx)(`button`,{className:`rbtn`,style:{display:`block`,margin:`1.4rem auto 0`,padding:`0.9rem 2.5rem`,background:`var(--gold)`,color:`var(--cream)`,border:`none`,fontFamily:`Jost`,fontWeight:300,fontSize:`9px`,letterSpacing:`0.45em`,textTransform:`uppercase`,cursor:`pointer`,transition:`background 0.3s`},children:`Kirim Konfirmasi`})]})}),(0,i.jsx)(`div`,{className:`slide`,id:`s7`,style:{background:`var(--dark)`},children:(0,i.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,i.jsxs)(`span`,{className:`ftnames`,style:{fontFamily:`Cormorant Garamond`,fontSize:`clamp(2.2rem, 6vw, 3.8rem)`,color:`var(--gold-light)`,fontWeight:300,textAlign:`center`,display:`block`,marginBottom:`0.8rem`},children:[e.groomName,` & `,e.brideName]}),(0,i.jsx)(`div`,{className:`hl lt`,style:{marginTop:`1rem`}}),(0,i.jsxs)(`p`,{className:`ftsub`,children:[`Kami yang berbahagia`,(0,i.jsx)(`br`,{}),e.weddingDay,`, `,e.weddingDate,` · Jakarta`]}),(0,i.jsxs)(`p`,{style:{marginTop:`2rem`,fontSize:`8px`,letterSpacing:`0.35em`,color:`#2e2820`},children:[`#`,e.groomName.replace(/\s+/g,``),e.brideName.replace(/\s+/g,``),`2025`]})]})})]}),(0,i.jsx)(`div`,{id:`nav-dots`,style:{position:`fixed`,right:`1.2rem`,top:`50%`,transform:`translateY(-50%)`,display:`flex`,flexDirection:`column`,gap:`9px`,zIndex:200,opacity:0}}),(0,i.jsx)(`div`,{id:`counter`,style:{position:`fixed`,bottom:`1.4rem`,right:`1.6rem`,fontSize:`8px`,letterSpacing:`0.35em`,color:`var(--muted)`,zIndex:200,opacity:0},children:`01 / 08`}),(0,i.jsx)(`div`,{id:`flash`,style:{position:`fixed`,inset:0,background:`var(--cream)`,opacity:0,zIndex:100,pointerEvents:`none`}})]})}export{a as default};
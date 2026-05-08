import { useState, useEffect } from 'react';

const prompts = [
  {
    id: 'camera-roll-roulette',
    title: 'Camera Roll Roulette',
    body: `Two players open their camera rolls and choose an image by one of the following rules (or one of their own):

• photo number 50
• the picture taken on this date a year ago
• the most recent picture taken near mid-day

The phones are held side by side and a third player photographs the resulting diptych. The principle of selection changes between rounds; the play is in the comparison.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.4" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 50 + 24 * Math.cos(rad);
          const y = 50 + 24 * Math.sin(rad);
          return (
            <rect
              key={deg}
              x={x - 4}
              y={y - 6}
              width="8"
              height="12"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
              transform={`rotate(${deg + 90} ${x} ${y})`}
            />
          );
        })}
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 're-photograph',
    title: 'Re-photograph',
    body: `One player displays an image on their phone. The next player photographs the screen with their own phone, then shows that picture to the next, who photographs it, and so on. The picture decays across the room.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <rect x="14" y="20" width="34" height="60" rx="4" stroke="currentColor" strokeWidth="1.4" />
        <rect x="42" y="32" width="26" height="44" rx="3" stroke="currentColor" strokeWidth="1.3" />
        <rect x="62" y="42" width="20" height="32" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
        <line x1="78" y1="58" x2="84" y2="58" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: 'caption-karaoke',
    title: 'Caption Karaoke',
    body: `One player selects an image and shows it to the others. The others quickly write captions for it on their phones. The captions are read aloud. The collective voice of the picture.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <rect x="32" y="38" width="36" height="26" stroke="currentColor" strokeWidth="1.4" />
        <path d="M 22 22 q -4 0 -4 4 v 8 q 0 4 4 4 h 8 l 4 5 v -5 h 4 q 4 0 4 -4 v -8 q 0 -4 -4 -4 z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 78 22 q 4 0 4 4 v 6 q 0 4 -4 4 h -6 l -3 4 v -4 h -3 q -4 0 -4 -4 v -6 q 0 -4 4 -4 z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 18 70 q -3 0 -3 3 v 6 q 0 3 3 3 h 6 l 3 4 v -4 h 3 q 3 0 3 -3 v -6 q 0 -3 -3 -3 z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: 'hand-off',
    title: 'Hand-off',
    body: `In pairs, players airdrop a picture to one another. Each spends an agreed length of time altering the image they were given, using a mobile app. The altered image is returned to its owner, who considers its merits. What returns is not what left.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <path d="M 14 70 q 8 -10 18 -10 q 6 0 10 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 86 70 q -8 -10 -18 -10 q -6 0 -10 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="40" y="40" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M 40 40 l 20 14 M 60 40 l -20 14" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <path d="M 50 28 l 0 8 M 46 32 l 4 -4 l 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'choreograph',
    title: 'Choreograph',
    body: `A player selects an image from their camera roll and shows it to a small group. The others use their bodies to perform the photograph, however they read it. The performance is photographed and paired with the original. The picture asks the body what it meant.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <rect x="14" y="22" width="28" height="36" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="28" cy="34" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 28 38 l 0 12 M 22 44 l 12 0 M 28 50 l -4 8 M 28 50 l 4 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="68" cy="38" r="5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M 68 43 l 0 16 M 60 50 l 16 -4 M 68 59 l -6 12 M 68 59 l 8 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'zoom',
    title: 'Zoom',
    body: `A player selects an image from their camera roll, pinches to zoom as far as it will go on a single detail, and screenshots the result. The screenshot is airdropped to another player, who looks through their own archive for a response. The two pictures are displayed side by side. Details speak to other details.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <rect x="16" y="24" width="68" height="46" stroke="currentColor" strokeWidth="1.4" />
        <rect x="34" y="36" width="34" height="22" stroke="currentColor" strokeWidth="1.2" />
        <rect x="44" y="42" width="14" height="10" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="68" cy="68" r="9" stroke="currentColor" strokeWidth="1.4" />
        <line x1="74.4" y1="74.4" x2="82" y2="82" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'knights-move',
    title: 'Knight\u2019s Move',
    body: `Players gather at a single starting point, each facing a different direction. On a signal, each walks an agreed number of paces forward (or until they meet a barrier), turns 90 degrees right or left, and walks another agreed number of paces. Wherever they arrive, a photograph is made. The group reconvenes and shares what each found. What you find when you don\'t choose.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <circle cx="22" cy="78" r="3" fill="currentColor" />
        <line x1="22" y1="78" x2="22" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="32" x2="76" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 70 26 l 6 6 l -6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="64" y="44" width="20" height="14" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="74" cy="51" r="3" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    id: 'waiting-photographs',
    title: 'Waiting Photographs',
    body: `Find another player. For an agreed length of time, photograph only the moments before something happens, the pauses when nothing has yet begun. Meet back up at the appointed time and share your waiting photographs. The picture before the picture.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.4" />
        <line x1="50" y1="22" x2="50" y2="26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="50" y1="74" x2="50" y2="78" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="22" y1="50" x2="26" y2="50" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="74" y1="50" x2="78" y2="50" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="50" y2="34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="50" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="50" cy="50" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'the-huddle',
    title: 'The Huddle',
    body: `A small group forms a tight scrum, bodies close, each player pointing their camera wherever they choose (some in toward the centre, some out across the room). On an agreed signal, everyone makes one picture. The phones are laid out together and looked at as a single distributed photograph of one second of shared breath. Repeat with different formations.`,
    Illustration: () => (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }} fill="none">
        {[
          { x: 50, y: 28, r: 0 },
          { x: 70, y: 38, r: 30 },
          { x: 74, y: 60, r: 60 },
          { x: 58, y: 74, r: 100 },
          { x: 36, y: 70, r: 150 },
          { x: 26, y: 50, r: 200 },
          { x: 36, y: 30, r: 250 },
        ].map((p, i) => (
          <rect
            key={i}
            x={p.x - 5}
            y={p.y - 8}
            width="10"
            height="16"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.2"
            transform={`rotate(${p.r} ${p.x} ${p.y})`}
          />
        ))}
      </svg>
    ),
  },
];

export default function PhotoPlay() {
  const [view, setView] = useState('title');
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      try { document.head.removeChild(link); } catch (e) {}
    };
  }, []);

  const goTo = (next, idx = null) => {
    setTransitioning(true);
    setTimeout(() => {
      if (idx !== null) setActiveIndex(idx);
      setView(next);
      setTransitioning(false);
    }, 180);
  };

  const surprise = () => {
    const i = Math.floor(Math.random() * prompts.length);
    goTo('detail', i);
  };

  const nextRandom = () => {
    let i = activeIndex;
    while (i === activeIndex) i = Math.floor(Math.random() * prompts.length);
    goTo('detail', i);
  };

  const palette = {
    paper: '#FFF6F3',        // pp-blush — main background
    paperDeep: '#FBECEC',    // pp-pink-cream-2 — slightly lighter variant
    pinkCream: '#F7DEDE',    // pp-pink-cream
    ink: '#3A3A40',          // pp-ink — body text
    inkSoft: '#55555C',      // pp-ink-soft
    accent: '#D02070',       // pp-magenta — primary accent
    accentHover: '#A8185A',  // pp-magenta-hover
    accentDeep: '#8A0F47',   // pp-magenta-ink
    rule: '#6C6C74',         // pp-grey-dark — dividers, secondary
  };

  // Per-prompt colour schemes for the detail view, cycled by index.
  const detailThemes = [
    { bg: '#D02070', text: '#FFFFFF', accent: '#FFFFFF', rule: 'rgba(255,255,255,0.55)', illoBg: 'rgba(255,255,255,0.08)' },     // magenta on white text
    { bg: '#FFF6F3', text: '#3A3A40', accent: '#D02070', rule: '#6C6C74', illoBg: 'transparent' },                                // blush on dark grey text
    { bg: '#FFFFFF', text: '#8A0F47', accent: '#D02070', rule: '#A8A8B0', illoBg: 'transparent' },                                // white on deep magenta text
  ];

  const currentTheme = view === 'detail' ? detailThemes[activeIndex % detailThemes.length] : null;
  const currentBg = currentTheme ? currentTheme.bg : palette.paper;

  const fontDisplay = `'Quicksand', 'Helvetica Neue', sans-serif`;
  const fontBody = `'Nunito', 'Helvetica Neue', sans-serif`;

  return (
    <div
      style={{
        backgroundColor: currentBg,
        color: palette.ink,
        fontFamily: fontBody,
        minHeight: '100vh',
        width: '100%',
        transition: 'background-color 280ms ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 440,
          margin: '0 auto',
          padding: '32px 28px 48px',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 180ms ease, transform 180ms ease',
        }}
      >
        {view === 'title' && (
          <TitleView
            palette={palette}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            onBrowse={() => goTo('index')}
            onSurprise={surprise}
          />
        )}

        {view === 'index' && (
          <IndexView
            palette={palette}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            prompts={prompts}
            onPick={(i) => goTo('detail', i)}
            onBack={() => goTo('title')}
            onSurprise={surprise}
          />
        )}

        {view === 'detail' && (
          <DetailView
            palette={palette}
            theme={currentTheme}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            prompt={prompts[activeIndex]}
            index={activeIndex}
            total={prompts.length}
            onBack={() => goTo('index')}
            onAnother={nextRandom}
          />
        )}
      </div>
    </div>
  );
}

function TitleView({ palette, fontDisplay, fontBody, onBrowse, onSurprise }) {
  return (
    <div style={{ paddingTop: 32, paddingBottom: 16 }}>
      <div
        style={{
          fontFamily: fontDisplay,
          fontSize: 22,
          letterSpacing: '0.05em',
          color: palette.ink,
          marginBottom: 36,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <span style={{ fontWeight: 700 }}>PHOTO</span>
        <span style={{ fontWeight: 400 }}>PEDAGOGY</span>
      </div>

      <div
        style={{
          fontFamily: fontDisplay,
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.rule,
          marginBottom: 32,
        }}
      >
        № 01 &mdash; A small set
      </div>

      <h1
        style={{
          fontFamily: fontBody,
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 76,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: 0,
          marginBottom: 6,
          color: palette.ink,
        }}
      >
        Photo
      </h1>
      <h1
        style={{
          fontFamily: fontDisplay,
          fontWeight: 700,
          fontSize: 76,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: 0,
          marginBottom: 36,
          color: palette.accent,
        }}
      >
        play.
      </h1>

      <div
        style={{
          height: 1,
          background: palette.rule,
          opacity: 0.4,
          marginBottom: 28,
        }}
      />

      <p
        style={{
          fontFamily: fontBody,
          fontSize: 18,
          lineHeight: 1.55,
          marginBottom: 12,
          fontWeight: 400,
        }}
      >
        Nine prompts for playing with photographs. No prizes,
        no winners, no need to be good at any of it.
      </p>

      <p
        style={{
          fontFamily: fontBody,
          fontSize: 15,
          lineHeight: 1.55,
          fontStyle: 'italic',
          color: palette.rule,
          marginBottom: 44,
        }}
      >
        A phone, a willing accomplice, a few minutes you can spare.
      </p>

      <button
        onClick={onBrowse}
        style={{
          display: 'block',
          width: '100%',
          padding: '18px 24px',
          backgroundColor: palette.ink,
          color: palette.paper,
          border: 'none',
          borderRadius: 999,
          fontFamily: fontDisplay,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        Browse the prompts
      </button>

      <button
        onClick={onSurprise}
        style={{
          display: 'block',
          width: '100%',
          padding: '18px 24px',
          backgroundColor: 'transparent',
          color: palette.ink,
          border: `1px solid ${palette.ink}`,
          borderRadius: 999,
          fontFamily: fontBody,
          fontStyle: 'italic',
          fontSize: 17,
          cursor: 'pointer',
        }}
      >
        Or surprise me
      </button>

      <div
        style={{
          marginTop: 56,
          fontFamily: fontDisplay,
          fontSize: 12,
          color: palette.rule,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Alejandra Carles-Tolra &amp; Jon Nicholls
      </div>
    </div>
  );
}

function IndexView({ palette, fontDisplay, fontBody, prompts, onPick, onBack, onSurprise }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: palette.rule,
            fontFamily: fontDisplay,
            fontSize: 13,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          ← Title
        </button>
        <button
          onClick={onSurprise}
          style={{
            background: 'transparent',
            border: 'none',
            color: palette.accent,
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontSize: 14,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Surprise me ↗
        </button>
      </div>

      <div
        style={{
          fontFamily: fontDisplay,
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: palette.rule,
          marginBottom: 6,
        }}
      >
        Index
      </div>
      <h2
        style={{
          fontFamily: fontBody,
          fontStyle: 'italic',
          fontSize: 36,
          margin: 0,
          marginBottom: 28,
          fontWeight: 400,
          letterSpacing: '-0.01em',
        }}
      >
        Choose a prompt
      </h2>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {prompts.map((p, i) => {
          const Ill = p.Illustration;
          return (
            <li key={p.id}>
              <button
                onClick={() => onPick(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '18px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `1px solid ${palette.rule}33`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: palette.ink,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    color: palette.accent,
                    marginRight: 18,
                  }}
                >
                  <Ill />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 11,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: palette.rule,
                      marginBottom: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: fontDisplay,
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                    }}
                  >
                    {p.title}
                  </div>
                </div>
                <div
                  style={{
                    color: palette.rule,
                    fontSize: 22,
                    fontFamily: fontDisplay,
                    marginLeft: 12,
                  }}
                >
                  →
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DetailView({ palette, theme, fontDisplay, fontBody, prompt, index, total, onBack, onAnother }) {
  const Ill = prompt.Illustration;
  const lines = prompt.body.split('\n');
  const t = theme || { bg: palette.paper, text: palette.ink, accent: palette.accent, rule: palette.rule };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: t.rule,
            fontFamily: fontDisplay,
            fontSize: 13,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          ← Index
        </button>
        <div
          style={{
            fontFamily: fontDisplay,
            fontSize: 13,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: t.rule,
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          maxWidth: 240,
          margin: '8px auto 24px',
          color: t.accent,
        }}
      >
        <Ill />
      </div>

      <h2
        style={{
          fontFamily: fontBody,
          fontStyle: 'italic',
          fontSize: 40,
          margin: 0,
          marginBottom: 22,
          fontWeight: 400,
          letterSpacing: '-0.015em',
          lineHeight: 1.05,
          textAlign: 'center',
          color: t.text,
        }}
      >
        {prompt.title}
      </h2>

      <div
        style={{
          height: 1,
          background: t.rule,
          margin: '0 auto 24px',
          width: 60,
        }}
      />

      <div
        style={{
          fontFamily: fontBody,
          fontSize: 17,
          lineHeight: 1.6,
          marginBottom: 36,
          color: t.text,
        }}
      >
        {lines.map((line, idx) => {
          if (line.trim().startsWith('•')) {
            return (
              <div
                key={idx}
                style={{
                  paddingLeft: 18,
                  textIndent: -18,
                  marginBottom: 4,
                  fontStyle: 'italic',
                  color: t.text,
                }}
              >
                {line}
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} style={{ height: 12 }} />;
          }
          return (
            <p key={idx} style={{ margin: 0, marginBottom: 8 }}>
              {line}
            </p>
          );
        })}
      </div>

      <button
        onClick={onAnother}
        style={{
          display: 'block',
          width: '100%',
          padding: '16px 20px',
          backgroundColor: 'transparent',
          color: t.accent,
          border: `1px solid ${t.accent}`,
          borderRadius: 999,
          fontFamily: fontBody,
          fontStyle: 'italic',
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: 10,
        }}
      >
        Another at random ↗
      </button>

      <button
        onClick={onBack}
        style={{
          display: 'block',
          width: '100%',
          padding: '16px 20px',
          backgroundColor: 'transparent',
          color: t.text,
          border: 'none',
          fontFamily: fontDisplay,
          fontSize: 14,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        ← Back to all prompts
      </button>
    </div>
  );
}

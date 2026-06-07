import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import tradoaLogo from '@/assets/tradora-logo.jpg';

export default function SplashScreen() {
  const { markSplashComplete } = useApp();
  const [phase, setPhase] = useState<'init' | 'logo' | 'wordmark' | 'tagline' | 'exit'>('init');

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('logo'), 200);
    const t1 = setTimeout(() => setPhase('wordmark'), 1100);
    const t2 = setTimeout(() => setPhase('tagline'), 1900);
    const t3 = setTimeout(() => setPhase('exit'), 3000);
    const t4 = setTimeout(() => markSplashComplete(), 3600);
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
    };
  }, [markSplashComplete]);

  return (
    <>
      {/* Load Exo 2 from Google Fonts — exact font used in the Tradora wordmark */}
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800;900&display=swap"
        rel="stylesheet"
      />

      <AnimatePresence>
        {phase !== 'exit' ? (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#0D1117' }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative flex flex-col items-center gap-7 px-8">

              {/* Logo icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{
                  opacity: phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 1 : 0,
                  scale: phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 1 : 0.6,
                  y: phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 0 : 20,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.05 }}
                className="relative"
              >
                <motion.div
                  className="absolute rounded-2xl"
                  style={{ inset: -6 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px 0px rgba(251,140,0,0)',
                      '0 0 30px 8px rgba(251,140,0,0.35)',
                      '0 0 20px 4px rgba(251,140,0,0.20)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div
                  className="relative overflow-hidden shadow-2xl"
                  style={{
                    width: 104,
                    height: 104,
                    borderRadius: 22,
                    border: '1.5px solid rgba(251,140,0,0.25)',
                    background: '#161B22',
                  }}
                >
                  <img src={tradoaLogo} alt="Tradora Logo" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Brand name in Exo 2 — matching the wordmark exactly */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: phase === 'wordmark' || phase === 'tagline' ? 1 : 0,
                  y: phase === 'wordmark' || phase === 'tagline' ? 0 : 16,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <div style={{ fontFamily: "'Exo 2', sans-serif", lineHeight: 1 }}>
                  <span style={{
                    fontSize: 54,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                  }}>TR</span>
                  <span style={{
                    fontSize: 54,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    background: 'linear-gradient(160deg, #FFA726 0%, #FB8C00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>A</span>
                  <span style={{
                    fontSize: 54,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                  }}>DOR</span>
                  <span style={{
                    fontSize: 54,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    background: 'linear-gradient(160deg, #FFA726 0%, #FB8C00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>A</span>
                </div>

                {/* Tagline */}
                <div
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.25em' }}>BUY</span>
                  <span style={{ color: '#FB8C00', fontSize: 7 }}>●</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.25em' }}>SELL</span>
                  <span style={{ color: '#FB8C00', fontSize: 7 }}>●</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, letterSpacing: '0.25em' }}>CONNECT</span>
                </div>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'tagline' ? 1 : 0 }}
                transition={{ duration: 0.45 }}
              >
                <div
                  className="overflow-hidden rounded-full"
                  style={{ width: 160, height: 2, background: 'rgba(255,255,255,0.08)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #FB8C00, #FFA726)',
                      boxShadow: '0 0 8px rgba(251,140,0,0.8)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: phase === 'tagline' ? '100%' : '0%' }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom badge */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'tagline' ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.20)',
                }}
              >
                Powered by ChAs Tech Group
              </span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

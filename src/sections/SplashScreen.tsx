import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import tradoaLogo from '@/assets/tradora-logo.jpg';

export default function SplashScreen() {
  const { markSplashComplete } = useApp();
  const [phase, setPhase] = useState<'init' | 'logo' | 'wordmark' | 'tagline' | 'exit'>('init');

  useEffect(() => {
    // Longer stay: total ~5.5s before transitioning
    const t0 = setTimeout(() => setPhase('logo'),     300);
    const t1 = setTimeout(() => setPhase('wordmark'), 1300);
    const t2 = setTimeout(() => setPhase('tagline'),  2200);
    const t3 = setTimeout(() => setPhase('exit'),     4800);
    const t4 = setTimeout(() => markSplashComplete(), 5500);
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
    };
  }, [markSplashComplete]);

  return (
    <>
      {/* Audiowide — closest match to the Tradora wordmark font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:wght@600&display=swap"
        rel="stylesheet"
      />

      <AnimatePresence>
        {phase !== 'exit' ? (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden
                       bg-white dark:bg-[#0D1117]"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative flex flex-col items-center gap-6 px-8">

              {/* Logo icon — no background, just the image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{
                  opacity: phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 1 : 0,
                  scale:   phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 1 : 0.6,
                  y:       phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 0 : 20,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.05 }}
              >
                {/* Glow ring — only visible in dark mode */}
                <motion.div
                  className="absolute rounded-2xl hidden dark:block"
                  style={{ inset: -6 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px 0px rgba(251,140,0,0)',
                      '0 0 28px 6px rgba(251,140,0,0.30)',
                      '0 0 16px 3px rgba(251,140,0,0.15)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Pure icon, no wrapper background */}
                <img
                  src={tradoaLogo}
                  alt="Tradora Logo"
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 20,
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              </motion.div>

              {/* Brand name */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: phase === 'wordmark' || phase === 'tagline' ? 1 : 0,
                  y:       phase === 'wordmark' || phase === 'tagline' ? 0 : 14,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-2"
              >
                {/* TRADORA in Audiowide — sized down to match original */}
                <div style={{ fontFamily: "'Audiowide', sans-serif", lineHeight: 1 }}>
                  <span className="text-gray-900 dark:text-white" style={{ fontSize: 36, letterSpacing: '0.04em' }}>
                    TR
                  </span>
                  <span style={{
                    fontSize: 36,
                    letterSpacing: '0.04em',
                    background: 'linear-gradient(160deg, #FFA726 0%, #FB8C00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    A
                  </span>
                  <span className="text-gray-900 dark:text-white" style={{ fontSize: 36, letterSpacing: '0.04em' }}>
                    DOR
                  </span>
                  <span style={{
                    fontSize: 36,
                    letterSpacing: '0.04em',
                    background: 'linear-gradient(160deg, #FFA726 0%, #FB8C00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    A
                  </span>
                </div>

                {/* BUY · SELL · CONNECT */}
                <div
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>BUY</span>
                  <span style={{ color: '#FB8C00', fontSize: 6 }}>●</span>
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>SELL</span>
                  <span style={{ color: '#FB8C00', fontSize: 6 }}>●</span>
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>CONNECT</span>
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
                  style={{ width: 140, height: 2, background: 'rgba(128,128,128,0.15)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #FB8C00, #FFA726)',
                      boxShadow: '0 0 6px rgba(251,140,0,0.7)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: phase === 'tagline' ? '100%' : '0%' }}
                    transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom: by chAs */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'tagline' ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span
                className="text-gray-900 dark:text-white"
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                by <span style={{ color: '#FB8C00' }}>chAs</span>
              </span>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

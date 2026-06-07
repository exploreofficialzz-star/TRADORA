import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import tradoaLogo from '@/assets/tradora-logo.jpg';

export default function SplashScreen() {
  const { markSplashComplete } = useApp();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setVisible(true), 300);
    const t1 = setTimeout(() => setExiting(true), 4800);
    const t2 = setTimeout(() => markSplashComplete(), 5500);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [markSplashComplete]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Icon + name — all appear together */}
            <motion.div
              className="flex flex-col items-center px-8"
              style={{ marginTop: '-160px' }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon */}
              <img
                src={tradoaLogo}
                alt="Tradora Logo"
                style={{ width: 80, height: 80, borderRadius: 18, display: 'block', objectFit: 'cover' }}
              />

              {/* TRADORA — tighter gap to icon */}
              <div className="flex flex-col items-center gap-1 mt-2">
                <div style={{ fontFamily: "'Exo 2', sans-serif", lineHeight: 1 }}>
                  <span className="text-gray-900 dark:text-white" style={{ fontSize: 30, fontWeight: 800, letterSpacing: '0.05em' }}>TR</span>
                  <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '0.05em', background: 'linear-gradient(160deg,#FFA726,#FB8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A</span>
                  <span className="text-gray-900 dark:text-white" style={{ fontSize: 30, fontWeight: 800, letterSpacing: '0.05em' }}>DOR</span>
                  <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '0.05em', background: 'linear-gradient(160deg,#FFA726,#FB8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A</span>
                </div>

                {/* BUY · SELL · CONNECT */}
                <div className="flex items-center gap-2" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>BUY</span>
                  <span style={{ color: '#FB8C00', fontSize: 6 }}>●</span>
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>SELL</span>
                  <span style={{ color: '#FB8C00', fontSize: 6 }}>●</span>
                  <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em' }}>CONNECT</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom: dots above by chAs */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 4 yellow bouncing dots */}
              <div className="flex items-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FB8C00' }}
                    animate={visible ? { y: [0, -12, 0], scale: [1, 1.2, 1] } : { y: 0 }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.15,
                      repeatDelay: 0.4,
                    }}
                  />
                ))}
              </div>

              {/* by chAs */}
              <span
                className="text-black dark:text-white"
                style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}
              >
                by chAs
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

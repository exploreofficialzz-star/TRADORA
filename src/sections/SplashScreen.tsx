import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import tradoaLogo from '@/assets/tradora-logo.jpg';
import tradoaWordmark from '@/assets/tradora-wordmark.jpg';

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
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0D1117' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient glow layers */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'logo' || phase === 'wordmark' || phase === 'tagline' ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            {/* Top-right warm glow */}
            <div
              className="absolute"
              style={{
                top: '-10%', right: '-10%',
                width: '55%', height: '55%',
                background: 'radial-gradient(circle, rgba(251,140,0,0.18) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Bottom-left cool glow */}
            <div
              className="absolute"
              style={{
                bottom: '-10%', left: '-10%',
                width: '45%', height: '45%',
                background: 'radial-gradient(circle, rgba(251,140,0,0.10) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            {/* Center soft halo behind logo */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(251,140,0,0.12) 0%, transparent 65%)',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-7 px-8">

            {/* Logo mark */}
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
              {/* Glowing ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ margin: '-6px' }}
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
                <img
                  src={tradoaLogo}
                  alt="Tradora Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: phase === 'wordmark' || phase === 'tagline' ? 1 : 0,
                y: phase === 'wordmark' || phase === 'tagline' ? 0 : 16,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src={tradoaWordmark}
                alt="TRADORA — Buy · Sell · Connect"
                className="object-contain"
                style={{
                  width: 260,
                  borderRadius: 10,
                  filter: 'drop-shadow(0 4px 24px rgba(251,140,0,0.20))',
                }}
              />
            </motion.div>

            {/* Tagline + progress */}
            <motion.div
              className="flex flex-col items-center gap-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'tagline' ? 1 : 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Divider line */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: phase === 'tagline' ? 200 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />

              {/* Progress bar */}
              <div
                className="overflow-hidden rounded-full"
                style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.08)' }}
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

              <p
                className="text-xs tracking-[0.25em] uppercase font-medium"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Loading your marketplace…
              </p>
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
              className="text-[10px] tracking-[0.3em] uppercase font-medium"
              style={{ color: 'rgba(255,255,255,0.20)' }}
            >
              Powered by ChAs Tech Group
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

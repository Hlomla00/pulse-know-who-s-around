import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import { useApp } from '@/contexts/AppContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { layoutMode } = useApp();

  useEffect(() => {
    const timer = setTimeout(
      () => navigate(layoutMode ? '/onboarding' : '/choose-layout'),
      2500
    );
    return () => clearTimeout(timer);
  }, [navigate, layoutMode]);

  return (
    <MobileLayout showStatusBar={false}>
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Pulse rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {[0, 0.5, 1].map((delay, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-primary"
              initial={{ width: 20, height: 20, opacity: 0.8 }}
              animate={{ width: 160, height: 160, opacity: 0 }}
              transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <div className="w-4 h-4 rounded-full bg-primary animate-glow-pulse" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-black text-foreground mt-8 tracking-tight"
        >
          Pulse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-muted-foreground text-sm mt-2 text-center"
        >
          Know who's around. Know who's active.
        </motion.p>
      </div>
    </MobileLayout>
  );
};

export default SplashScreen;

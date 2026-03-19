import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CircleDot, Shield } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';

const slides = [
  {
    icon: MapPin,
    title: 'See Your Friends Live',
    body: "Know exactly where your friends are on campus in real time",
  },
  {
    icon: CircleDot,
    title: "Know Who's Active",
    body: "See if your friends are on their phone right now — even if they're not sharing location",
  },
  {
    icon: Shield,
    title: "You're Always In Control",
    body: "Choose exactly who sees your location and your active status. Your privacy, your rules.",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50 && current < 2) setCurrent(c => c + 1);
    if (info.offset.x > 50 && current > 0) setCurrent(c => c - 1);
  };

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-6 pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDrag}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8">
              {(() => {
                const Icon = slides[current].icon;
                return <Icon size={40} className="text-primary" />;
              })()}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{slides[current].title}</h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-[280px]">{slides[current].body}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col items-center pb-12 gap-6">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          {current === 2 ? (
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-pill tap-scale text-base"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="text-muted-foreground text-sm tap-scale"
            >
              Tap or swipe to continue
            </button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Onboarding;

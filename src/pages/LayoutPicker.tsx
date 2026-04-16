import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const options = [
  {
    key: 'mobile' as const,
    icon: Smartphone,
    title: 'Mobile',
    subtitle: 'Optimised for phones',
    description: 'Bottom navigation, swipe gestures, and a compact map experience — built for on-the-go.',
    features: ['Bottom navigation bar', 'Swipe-up friend sheet', 'Touch-first controls'],
  },
  {
    key: 'desktop' as const,
    icon: Monitor,
    title: 'Desktop',
    subtitle: 'Optimised for large screens',
    description: 'Persistent sidebar, wider panels, and a spacious layout — ideal at a desk.',
    features: ['Persistent sidebar', 'Friend panel on the right', 'Keyboard-friendly'],
  },
];

const LayoutPicker = () => {
  const { setLayoutMode } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'mobile' | 'desktop' | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setLayoutMode(selected);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
          <span className="text-2xl font-black text-foreground tracking-tight">Pulse</span>
        </div>
        <h1 className="text-3xl font-black text-foreground tracking-tight mb-2">
          How will you use Pulse?
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Choose your preferred layout. You can change this anytime in your profile.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-8">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          const active = selected === opt.key;
          return (
            <motion.button
              key={opt.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * (i + 1) }}
              onClick={() => setSelected(opt.key)}
              className={`flex-1 text-left rounded-2xl border-2 p-6 transition-all tap-scale focus:outline-none ${
                active
                  ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(6,193,103,0.2)]'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-card/80'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? 'bg-primary' : 'bg-background'}`}>
                  <Icon size={22} className={active ? 'text-primary-foreground' : 'text-muted-foreground'} />
                </div>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check size={14} className="text-primary-foreground" />
                  </motion.div>
                )}
              </div>

              {/* Title */}
              <h2 className={`text-xl font-bold mb-0.5 ${active ? 'text-foreground' : 'text-foreground'}`}>
                {opt.title}
              </h2>
              <p className={`text-xs font-medium mb-3 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {opt.subtitle}
              </p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {opt.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-1.5">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                    <span className="text-xs text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        onClick={handleContinue}
        disabled={!selected}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-pill tap-scale disabled:pointer-events-none transition-opacity"
      >
        Continue
        <ArrowRight size={18} />
      </motion.button>
    </div>
  );
};

export default LayoutPicker;

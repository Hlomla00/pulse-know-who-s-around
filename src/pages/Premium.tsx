import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, X as XIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';

const features = [
  { name: 'Active Status', free: true, premium: true },
  { name: 'Live Location', free: true, premium: true },
  { name: 'Exact Last Seen', free: false, premium: true },
  { name: 'Ghost Mode', free: false, premium: true },
  { name: 'Who Viewed Me', free: false, premium: true },
  { name: 'Battery Levels', free: false, premium: true },
  { name: 'Unlimited Friends', free: false, premium: true },
  { name: 'Location History', free: false, premium: true },
];

const Premium = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-4 pt-6 pb-8 overflow-y-auto">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="text-muted-foreground text-sm mb-6 tap-scale self-start">← Back</button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-pulse-gold/20 flex items-center justify-center mb-4">
            <Crown size={32} className="text-pulse-gold" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Pulse Premium</h1>
          <p className="text-sm text-muted-foreground">Unlock the full Pulse experience</p>
        </motion.div>

        {/* Feature table */}
        <div className="bg-card rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-3 px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground">Feature</span>
            <span className="text-xs font-semibold text-muted-foreground text-center">Free</span>
            <span className="text-xs font-semibold text-primary text-center">Premium</span>
          </div>
          {features.map((f, i) => (
            <div key={i} className="grid grid-cols-3 px-4 py-2.5 border-b border-border/50 last:border-0">
              <span className="text-xs text-foreground">{f.name}</span>
              <div className="flex justify-center">
                {f.free ? <Check size={14} className="text-primary" /> : <XIcon size={14} className="text-muted-foreground" />}
              </div>
              <div className="flex justify-center">
                <Check size={14} className="text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* Billing toggle */}
        <div className="flex gap-0 bg-card rounded-lg p-1 mb-6">
          <button
            onClick={() => setBilling('monthly')}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all tap-scale ${
              billing === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all tap-scale flex items-center justify-center gap-1 ${
              billing === 'yearly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Yearly
            <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-pill font-bold">-32%</span>
          </button>
        </div>

        <div className="text-center mb-6">
          <span className="text-3xl font-black text-foreground">
            {billing === 'monthly' ? 'R49' : 'R399'}
          </span>
          <span className="text-sm text-muted-foreground">/{billing === 'monthly' ? 'month' : 'year'}</span>
        </div>

        <button className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-pill tap-scale text-base mb-2">
          Start Free 7-Day Trial
        </button>
        <p className="text-xs text-muted-foreground text-center mb-4">Cancel anytime</p>
        <button className="text-xs text-muted-foreground text-center w-full tap-scale">Restore Purchase</button>
      </div>
    </MobileLayout>
  );
};

export default Premium;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Lock, SlidersHorizontal } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import PremiumModal from '@/components/PremiumModal';
import { useApp } from '@/contexts/AppContext';

const activeFriends = [
  { name: 'Lethabo Mokoena', initials: 'LM', color: 'bg-emerald-600', lastSeen: 'Just now' },
  { name: 'Zara Khan', initials: 'ZK', color: 'bg-amber-600', lastSeen: 'Just now' },
];

const recentFriends = [
  { name: 'Ayanda Dlamini', initials: 'AD', color: 'bg-rose-600', lastSeen: '4 min ago' },
];

const inactiveFriends = [
  { name: 'Sipho Nkosi', initials: 'SN', color: 'bg-sky-600', lastSeen: '1h ago' },
  { name: 'Thabo Molefe', initials: 'TM', color: 'bg-violet-600', lastSeen: 'Yesterday' },
];

const PulseCheck = () => {
  const { isPremium } = useApp();
  const [showPremium, setShowPremium] = useState(false);

  const Section = ({ title, friends, status }: { title: string; friends: typeof activeFriends; status: 'active' | 'recent' | 'inactive' }) => (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h3>
      <div className="flex flex-col gap-2">
        {friends.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-lg p-4 flex items-center gap-3"
          >
            <div className={`w-11 h-11 rounded-full ${f.color} flex items-center justify-center shrink-0`}>
              <span className="text-xs font-bold text-foreground">{f.initials}</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-foreground">{f.name}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  status === 'active' ? 'bg-primary animate-glow-pulse' :
                  status === 'recent' ? 'bg-pulse-amber' : 'bg-pulse-grey'
                }`} />
                <span className={`text-xs font-medium ${
                  status === 'active' ? 'text-primary' :
                  status === 'recent' ? 'text-pulse-amber' : 'text-muted-foreground'
                }`}>
                  {status === 'active' ? 'Active Now' : status === 'recent' ? `Active ${f.lastSeen}` : 'Inactive'}
                </span>
              </div>
            </div>
            {isPremium ? (
              <span className="text-[10px] text-muted-foreground">{f.lastSeen}</span>
            ) : (
              <button onClick={() => setShowPremium(true)} className="tap-scale">
                <Lock size={14} className="text-muted-foreground" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-y-auto">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Radio size={20} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Pulse Check</h1>
          </div>
          <button className="tap-scale text-muted-foreground">
            <SlidersHorizontal size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">See who's active right now</p>

        <Section title="Active Now" friends={activeFriends} status="active" />
        <Section title="Recently Active" friends={recentFriends} status="recent" />
        <Section title="Inactive" friends={inactiveFriends} status="inactive" />
      </div>
      <PremiumModal open={showPremium} onClose={() => setShowPremium(false)} />
      <BottomNav />
    </MobileLayout>
  );
};

export default PulseCheck;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';

const friends = [
  { name: 'Lethabo M.', initials: 'LM', color: 'bg-primary', status: 'active', distance: '320m away', x: '25%', y: '35%' },
  { name: 'Zara K.', initials: 'ZK', color: 'bg-pulse-amber', status: 'recent', distance: '1.2km away', x: '65%', y: '50%' },
  { name: 'Sipho N.', initials: 'SN', color: 'bg-pulse-grey', status: 'inactive', distance: 'Location off', x: '45%', y: '70%' },
];

const Home = () => {
  const [sheetOpen, setSheetOpen] = useState(true);
  const navigate = useNavigate();

  const statusDot = (status: string) => {
    if (status === 'active') return 'bg-primary animate-glow-pulse';
    if (status === 'recent') return 'bg-pulse-amber';
    return 'bg-pulse-grey';
  };

  const statusText = (status: string) => {
    if (status === 'active') return 'Active Now';
    if (status === 'recent') return 'Active 5m ago';
    return 'Inactive';
  };

  const statusTextColor = (status: string) => {
    if (status === 'active') return 'text-primary';
    if (status === 'recent') return 'text-pulse-amber';
    return 'text-muted-foreground';
  };

  const pinBorder = (status: string) => {
    if (status === 'active') return 'ring-2 ring-primary';
    return 'ring-2 ring-muted-foreground/40';
  };

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-lg font-bold text-foreground">Pulse</span>
          </div>
          <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-card flex items-center justify-center tap-scale">
            <span className="text-sm font-semibold text-foreground">JD</span>
          </button>
        </div>

        {/* Map placeholder */}
        <div className="flex-1 relative" style={{ background: '#0d0d0d' }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="hsl(153 95% 39%)" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="hsl(153 95% 39%)" strokeWidth="0.5" />
            ))}
          </svg>
          {/* Road-like shapes */}
          <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-muted-foreground/20" />
          <div className="absolute top-0 bottom-0 left-[40%] w-[2px] bg-muted-foreground/20" />
          <div className="absolute top-[60%] left-[20%] right-[30%] h-[2px] bg-muted-foreground/15" />

          {/* Friend pins */}
          {friends.map((f, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="absolute"
              style={{ left: f.x, top: f.y, transform: 'translate(-50%, -50%)' }}
            >
              <div className={`w-10 h-10 rounded-full ${f.color}/20 flex items-center justify-center ${pinBorder(f.status)}`}>
                <span className="text-xs font-bold text-foreground">{f.initials}</span>
              </div>
              {f.status === 'active' && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom sheet */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-card rounded-t-[24px] card-shadow z-10"
          initial={{ y: 100 }}
          animate={{ y: sheetOpen ? 0 : 140 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button
            onClick={() => setSheetOpen(!sheetOpen)}
            className="w-full flex flex-col items-center pt-3 pb-2 tap-scale"
          >
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30 mb-2" />
            {sheetOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronUp size={16} className="text-muted-foreground" />}
          </button>

          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base font-bold text-foreground">Friends</span>
              <span className="bg-primary/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-pill">3</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {friends.map((f, i) => (
                <div key={i} className="min-w-[120px] bg-background rounded-lg p-3 flex flex-col items-center gap-2">
                  <div className={`w-11 h-11 rounded-full ${f.color}/20 flex items-center justify-center ${pinBorder(f.status)}`}>
                    <span className="text-sm font-bold text-foreground">{f.initials}</span>
                  </div>
                  <span className="text-xs font-medium text-foreground">{f.name}</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${statusDot(f.status)}`} />
                    <span className={`text-[10px] font-medium ${statusTextColor(f.status)}`}>{statusText(f.status)}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{f.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Home;

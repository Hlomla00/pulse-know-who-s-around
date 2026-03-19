import { motion } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';

const activities = [
  { emoji: '🟢', name: 'Lethabo', text: 'is Active Now', time: 'Just now', dot: 'bg-primary' },
  { emoji: '📍', name: 'Zara', text: 'started sharing location', time: '2m ago', dot: 'bg-primary' },
  { emoji: '📍', name: 'Sipho', text: 'arrived at CPUT Bellville Campus', time: '15m ago', dot: 'bg-primary' },
  { emoji: '🔴', name: 'Thabo', text: 'stopped sharing location', time: '32m ago', dot: 'bg-destructive' },
  { emoji: '👋', name: 'Ayanda', text: 'joined Pulse', time: '1h ago', dot: 'bg-primary' },
  { emoji: '🟡', name: 'Keanu', text: 'was active 12 minutes ago', time: '1h ago', dot: 'bg-pulse-amber' },
];

const ActivityScreen = () => (
  <MobileLayout>
    <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-y-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Activity</h1>
      <p className="text-sm text-muted-foreground mb-6">Recent updates from your friends</p>

      <div className="flex flex-col gap-2">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-lg p-4 flex items-start gap-3"
          >
            <span className="text-lg">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{a.name}</span> {a.text}
              </p>
              <span className="text-[11px] text-muted-foreground">{a.time}</span>
            </div>
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot}`} />
          </motion.div>
        ))}
      </div>
    </div>
    <BottomNav />
  </MobileLayout>
);

export default ActivityScreen;

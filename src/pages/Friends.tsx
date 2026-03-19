import { useState } from 'react';
import { Search, Lock, UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import PremiumModal from '@/components/PremiumModal';
import { useApp } from '@/contexts/AppContext';

const friendsData = [
  { name: 'Lethabo Mokoena', username: '@lethabo_m', initials: 'LM', color: 'bg-emerald-600', active: true, lastSeen: 'Just now', sharing: true },
  { name: 'Zara Khan', username: '@zara.k', initials: 'ZK', color: 'bg-amber-600', active: true, lastSeen: '2m ago', sharing: true },
  { name: 'Sipho Nkosi', username: '@sipho_n', initials: 'SN', color: 'bg-sky-600', active: false, lastSeen: '1h ago', sharing: false },
  { name: 'Ayanda Dlamini', username: '@ayanda.d', initials: 'AD', color: 'bg-rose-600', active: false, lastSeen: '3h ago', sharing: true },
  { name: 'Thabo Molefe', username: '@thabo_m', initials: 'TM', color: 'bg-violet-600', active: false, lastSeen: 'Yesterday', sharing: false },
];

const requests = [
  { name: 'Keanu Peters', username: '@keanu_p', initials: 'KP', color: 'bg-teal-600' },
];

const Friends = () => {
  const { isPremium } = useApp();
  const [tab, setTab] = useState<'friends' | 'requests'>('friends');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [locationToggles, setLocationToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(friendsData.map(f => [f.username, f.sharing]))
  );

  const filtered = friendsData.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-y-auto">
        <h1 className="text-2xl font-bold text-foreground mb-4">Friends</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search friends..."
            className="w-full bg-card text-foreground placeholder:text-muted-foreground pl-9 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-0 bg-card rounded-lg p-1 mb-4">
          {(['friends', 'requests'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all tap-scale ${
                tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {t === 'friends' ? 'My Friends' : `Requests (${requests.length})`}
            </button>
          ))}
        </div>

        {tab === 'friends' ? (
          <div className="flex flex-col gap-2">
            {filtered.map((f, i) => (
              <motion.div
                key={f.username}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-lg p-3 flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-full ${f.color} flex items-center justify-center shrink-0`}>
                  <span className="text-xs font-bold text-foreground">{f.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">{f.name}</span>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${f.active ? 'bg-primary animate-glow-pulse' : 'bg-pulse-grey'}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{f.username}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {isPremium ? (
                      <span className="text-[10px] text-muted-foreground">{f.lastSeen}</span>
                    ) : (
                      <button onClick={() => setShowPremium(true)} className="flex items-center gap-1 tap-scale">
                        <Lock size={10} className="text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">Last seen</span>
                      </button>
                    )}
                  </div>
                </div>
                {/* Location toggle */}
                <button
                  onClick={() => setLocationToggles(prev => ({ ...prev, [f.username]: !prev[f.username] }))}
                  className={`w-10 h-6 rounded-full relative transition-colors tap-scale ${
                    locationToggles[f.username] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-foreground absolute top-1 transition-all ${
                    locationToggles[f.username] ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {requests.map(r => (
              <div key={r.username} className="bg-card rounded-lg p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-foreground">{r.initials}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-foreground">{r.name}</span>
                  <p className="text-xs text-muted-foreground">{r.username}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-pill tap-scale">Accept</button>
                  <button className="bg-muted text-muted-foreground text-xs font-semibold px-3 py-1.5 rounded-pill tap-scale">Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-pill tap-scale flex items-center justify-center gap-2"
        >
          <UserPlus size={18} /> Add Friend
        </button>
      </div>

      {/* Add Friend Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 z-50" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
            >
              <div className="w-full max-w-[390px] bg-card rounded-t-[24px] p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-foreground">Add Friend</h3>
                  <button onClick={() => setShowAddModal(false)} className="tap-scale text-muted-foreground"><X size={20} /></button>
                </div>
                <input
                  placeholder="Search by username"
                  className="w-full bg-background text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-4"
                />
                <div className="bg-background rounded-lg p-3 flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">NM</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-foreground">Naledi Mthembu</span>
                    <p className="text-xs text-muted-foreground">@naledi_m</p>
                  </div>
                </div>
                <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-pill tap-scale">
                  Send Request
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PremiumModal open={showPremium} onClose={() => setShowPremium(false)} />
      <BottomNav />
    </MobileLayout>
  );
};

export default Friends;

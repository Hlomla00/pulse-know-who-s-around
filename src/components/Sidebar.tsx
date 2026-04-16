import { useNavigate, useLocation } from 'react-router-dom';
import { Map, Users, Activity, Radio, User, Crown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const tabs = [
  { path: '/home', icon: Map, label: 'Map' },
  { path: '/friends', icon: Users, label: 'Friends' },
  { path: '/activity', icon: Activity, label: 'Activity' },
  { path: '/pulse-check', icon: Radio, label: 'Pulse Check' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { layoutMode } = useApp();

  // mobile → always hidden; desktop → always visible; null → responsive
  const visibilityClass =
    layoutMode === 'mobile' ? 'hidden' :
    layoutMode === 'desktop' ? 'flex' :
    'hidden md:flex';

  return (
    <div className={`${visibilityClass} fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border flex-col z-50`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-glow-pulse" />
        <span className="text-xl font-black text-foreground tracking-tight">Pulse</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all tap-scale w-full text-left ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Premium CTA */}
      <div className="px-3 pb-3">
        <button
          onClick={() => navigate('/premium')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border tap-scale hover:border-pulse-gold/50 transition-colors"
        >
          <Crown size={18} className="text-pulse-gold shrink-0" />
          <div className="text-left">
            <p className="text-xs font-semibold text-foreground">Go Premium</p>
            <p className="text-[10px] text-muted-foreground">Unlock all features</p>
          </div>
        </button>
      </div>

      {/* User profile */}
      <div className="px-3 pb-5 border-t border-border pt-3">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full tap-scale hover:bg-card transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary shrink-0">
            <span className="text-xs font-bold text-primary">JD</span>
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">@john_doe</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

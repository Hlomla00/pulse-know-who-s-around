import { useNavigate, useLocation } from 'react-router-dom';
import { Map, Users, Activity, Radio, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const tabs = [
  { path: '/home', icon: Map, label: 'Map' },
  { path: '/friends', icon: Users, label: 'Friends' },
  { path: '/activity', icon: Activity, label: 'Activity' },
  { path: '/pulse-check', icon: Radio, label: 'Pulse' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { layoutMode } = useApp();

  // mobile → always visible; desktop → always hidden; null → responsive
  const visibilityClass =
    layoutMode === 'mobile' ? 'flex' :
    layoutMode === 'desktop' ? 'hidden' :
    'md:hidden flex';

  return (
    <div className={`${visibilityClass} bg-background border-t border-border px-2 pb-6 pt-2 shrink-0`}>
      <div className="flex justify-around">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 tap-scale py-1 px-3 ${active ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;

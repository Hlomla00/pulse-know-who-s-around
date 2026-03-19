import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Crown, LogOut, Lock } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import PremiumModal from '@/components/PremiumModal';
import { useApp } from '@/contexts/AppContext';

const Profile = () => {
  const navigate = useNavigate();
  const { isPremium, shareLocation, setShareLocation, shareStatus, setShareStatus, ghostMode, setGhostMode, hideLastSeen, setHideLastSeen, statusVisibility, setStatusVisibility } = useApp();
  const [showPremium, setShowPremium] = useState(false);

  const Toggle = ({ on, onToggle, disabled }: { on: boolean; onToggle: () => void; disabled?: boolean }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`w-11 h-6 rounded-full relative transition-colors tap-scale ${on ? 'bg-primary' : 'bg-muted'} ${disabled ? 'opacity-50' : ''}`}
    >
      <div className={`w-4 h-4 rounded-full bg-foreground absolute top-1 transition-all ${on ? 'right-1' : 'left-1'}`} />
    </button>
  );

  const SettingRow = ({ label, right, onClick }: { label: string; right?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} className="flex items-center justify-between py-3 w-full tap-scale">
      <span className="text-sm text-foreground">{label}</span>
      {right || <ChevronRight size={16} className="text-muted-foreground" />}
    </button>
  );

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-4 pt-6 pb-2 overflow-y-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3 ring-2 ring-primary">
            <span className="text-2xl font-bold text-primary">JD</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">John Doe</h2>
          <span className="text-sm text-muted-foreground mb-2">@john_doe</span>
          <span className="text-xs text-muted-foreground bg-card px-3 py-1 rounded-pill">CPUT Student</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: 'Friends', value: '12' },
            { label: 'Active Now', value: '3' },
            { label: 'Days on Pulse', value: '7' },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-foreground">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Status */}
        <div className="bg-card rounded-lg p-4 mb-3">
          <h3 className="text-sm font-bold text-foreground mb-3">My Status</h3>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Share Active Status</span>
            <Toggle on={shareStatus} onToggle={() => setShareStatus(!shareStatus)} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Share Location</span>
            <Toggle on={shareLocation} onToggle={() => setShareLocation(!shareLocation)} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Who sees my status</span>
            <select
              value={statusVisibility}
              onChange={e => setStatusVisibility(e.target.value)}
              className="bg-background text-foreground text-xs px-2 py-1 rounded-md focus:outline-none"
            >
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card rounded-lg p-4 mb-3">
          <h3 className="text-sm font-bold text-foreground mb-3">Privacy</h3>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground">Ghost Mode</span>
              {!isPremium && <Lock size={12} className="text-muted-foreground" />}
            </div>
            <Toggle on={ghostMode} onToggle={() => isPremium ? setGhostMode(!ghostMode) : setShowPremium(true)} disabled={!isPremium} />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground">Hide Last Seen</span>
            <Toggle on={hideLastSeen} onToggle={() => setHideLastSeen(!hideLastSeen)} />
          </div>
          <SettingRow label="Block List" />
        </div>

        {/* Premium Card */}
        <div className="rounded-lg p-4 mb-3 premium-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <Crown size={20} className="text-pulse-gold" />
            <span className="text-sm font-bold text-foreground">Pulse Premium</span>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            {['See exact last seen times', 'See who viewed your location', 'Ghost Mode', 'Battery levels', 'Unlimited friends', 'Priority support'].map(b => (
              <span key={b} className="text-xs text-muted-foreground">✓ {b}</span>
            ))}
          </div>
          <button
            onClick={() => navigate('/premium')}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-pill tap-scale text-sm"
          >
            Start 7-Day Free Trial
          </button>
          <p className="text-[10px] text-muted-foreground text-center mt-2">R49/month after trial</p>
        </div>

        {/* Account */}
        <div className="bg-card rounded-lg p-4 mb-6">
          <h3 className="text-sm font-bold text-foreground mb-1">Account</h3>
          <SettingRow label="Edit Profile" />
          <SettingRow label="Notifications" />
          <SettingRow label="Help & Support" />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 py-3 w-full tap-scale"
          >
            <LogOut size={16} className="text-destructive" />
            <span className="text-sm text-destructive">Log Out</span>
          </button>
        </div>
      </div>
      <PremiumModal open={showPremium} onClose={() => setShowPremium(false)} />
      <BottomNav />
    </MobileLayout>
  );
};

export default Profile;

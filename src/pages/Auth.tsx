import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import MobileLayout from '@/components/MobileLayout';

const Auth = () => {
  const [tab, setTab] = useState<'signup' | 'login'>('signup');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/home'); }, 1200);
  };

  const inputClass = "w-full bg-card text-foreground placeholder:text-muted-foreground px-4 py-3.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col px-6 pt-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
          <span className="text-2xl font-black text-foreground">Pulse</span>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-0 bg-card rounded-lg p-1 mb-8">
          {(['signup', 'login'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all tap-scale ${
                tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {t === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {tab === 'signup' && (
            <>
              <input className={inputClass} placeholder="Full Name" />
              <input className={inputClass} placeholder="Username" />
            </>
          )}
          <input className={inputClass} placeholder="Email" type="email" />
          <input className={inputClass} placeholder="Password" type="password" />
          {tab === 'signup' && (
            <input className={inputClass} placeholder="Confirm Password" type="password" />
          )}

          {tab === 'login' && (
            <button type="button" className="text-muted-foreground text-xs text-right tap-scale">
              Forgot Password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-pill tap-scale text-base mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            Continue
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google */}
        <button className="w-full bg-card text-foreground font-medium py-3.5 rounded-pill tap-scale text-sm flex items-center justify-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-muted-foreground text-[10px] text-center mt-6">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </MobileLayout>
  );
};

export default Auth;

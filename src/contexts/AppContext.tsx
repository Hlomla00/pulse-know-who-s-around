import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LayoutMode = 'mobile' | 'desktop' | null;

interface AppState {
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
  shareLocation: boolean;
  setShareLocation: (v: boolean) => void;
  shareStatus: boolean;
  setShareStatus: (v: boolean) => void;
  ghostMode: boolean;
  setGhostMode: (v: boolean) => void;
  hideLastSeen: boolean;
  setHideLastSeen: (v: boolean) => void;
  statusVisibility: string;
  setStatusVisibility: (v: string) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (v: 'mobile' | 'desktop') => void;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [shareStatus, setShareStatus] = useState(true);
  const [ghostMode, setGhostMode] = useState(false);
  const [hideLastSeen, setHideLastSeen] = useState(false);
  const [statusVisibility, setStatusVisibility] = useState('friends');
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    return (localStorage.getItem('pulse_layout_mode') as 'mobile' | 'desktop') || null;
  });

  const setLayoutMode = (mode: 'mobile' | 'desktop') => {
    localStorage.setItem('pulse_layout_mode', mode);
    setLayoutModeState(mode);
  };

  return (
    <AppContext.Provider value={{
      isPremium, setIsPremium,
      shareLocation, setShareLocation,
      shareStatus, setShareStatus,
      ghostMode, setGhostMode,
      hideLastSeen, setHideLastSeen,
      statusVisibility, setStatusVisibility,
      layoutMode, setLayoutMode,
    }}>
      {children}
    </AppContext.Provider>
  );
};

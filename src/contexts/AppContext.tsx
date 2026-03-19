import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  return (
    <AppContext.Provider value={{
      isPremium, setIsPremium,
      shareLocation, setShareLocation,
      shareStatus, setShareStatus,
      ghostMode, setGhostMode,
      hideLastSeen, setHideLastSeen,
      statusVisibility, setStatusVisibility,
    }}>
      {children}
    </AppContext.Provider>
  );
};

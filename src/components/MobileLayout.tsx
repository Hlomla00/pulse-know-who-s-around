import { ReactNode } from 'react';

const StatusBar = () => (
  <div className="flex items-center justify-between px-5 py-2 text-xs font-semibold text-foreground">
    <span>9:41</span>
    <div className="flex items-center gap-1">
      <div className="flex gap-[2px]">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-[3px] rounded-sm bg-foreground" style={{ height: 4 + i * 2 }} />
        ))}
      </div>
      <span className="ml-1">5G</span>
      <div className="ml-1 w-6 h-3 rounded-sm border border-foreground/50 relative">
        <div className="absolute inset-[1px] right-[3px] bg-pulse-green rounded-[1px]" />
      </div>
    </div>
  </div>
);

interface MobileLayoutProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
}

const MobileLayout = ({ children, showStatusBar = true, className = '' }: MobileLayoutProps) => (
  <div className="min-h-screen bg-background flex justify-center">
    <div className={`w-full max-w-[390px] min-h-screen bg-background relative flex flex-col ${className}`}>
      {showStatusBar && <StatusBar />}
      {children}
    </div>
  </div>
);

export default MobileLayout;

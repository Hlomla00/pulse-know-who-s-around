import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useApp } from '@/contexts/AppContext';

const StatusBar = () => {
  const { layoutMode } = useApp();
  // mobile → always show; desktop → always hide; null → responsive
  const visibilityClass =
    layoutMode === 'mobile' ? 'flex' :
    layoutMode === 'desktop' ? 'hidden' :
    'flex md:hidden';

  return (
    <div className={`${visibilityClass} items-center justify-between px-5 py-2 text-xs font-semibold text-foreground shrink-0`}>
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
};

interface MobileLayoutProps {
  children: ReactNode;
  showStatusBar?: boolean;
  showSidebar?: boolean;
  className?: string;
}

const MobileLayout = ({
  children,
  showStatusBar = true,
  showSidebar = true,
  className = '',
}: MobileLayoutProps) => {
  const { layoutMode } = useApp();

  // Sidebar offset: mobile → never; desktop → always; null → responsive
  const sidebarMargin =
    !showSidebar ? '' :
    layoutMode === 'mobile' ? '' :
    layoutMode === 'desktop' ? 'ml-64' :
    'md:ml-64';

  return (
    <div className="min-h-screen bg-background flex">
      {showSidebar && <Sidebar />}
      <div className={`flex-1 flex flex-col min-h-screen ${sidebarMargin} ${className}`}>
        {showStatusBar && <StatusBar />}
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;

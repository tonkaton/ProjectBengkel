import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, activeTab, setActiveTab, onSearchClear }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClear={onSearchClear}
      />

      <div className="flex-1 w-full relative h-screen overflow-y-auto scrollbar-hide">
        {/* PT-24 (PADDING TOP 24) ADALAH KUNCINYA */}
        {/* Ini bikin konten turun ke bawah biar gak ketutupan Header Sidebar di HP */}
        <main className="p-4 pt-24 md:p-8 md:pt-8 w-full max-w-[100vw]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
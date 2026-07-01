import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, activeTab, setActiveTab, onSearchClear }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen overflow-hidden text-ink">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClear={onSearchClear}
      />

      <div className="scrollbar-hide relative h-screen w-full flex-1 overflow-y-auto">
        <main className="w-full max-w-[100vw] p-4 pt-24 md:p-8 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

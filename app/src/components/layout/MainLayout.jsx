import React, { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children, activeTab, setActiveTab, onSearchClear }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClear={onSearchClear}
      />
      <div className="flex-1 overflow-auto p-8">{children}</div>
    </div>
  );
};

export default MainLayout;

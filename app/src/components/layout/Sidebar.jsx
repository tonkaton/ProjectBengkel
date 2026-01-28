import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts';
import { getMenuItems } from '../../constants/menuItems';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  onSearchClear,
}) => {
  const { userRole, logout } = useAuth();
  const menuItems = getMenuItems(userRole);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Otomatis tutup menu kalo di mobile pas klik item
    if (onSearchClear) onSearchClear();
  };

  return (
    // HAPUS SPACER <div className="md:hidden..." /> DARI SINI
    // Langsung return div utamanya aja
    <div
      className={`
        bg-zinc-900 border-zinc-800 transition-all duration-300 flex flex-col z-50
        
        /* --- MOBILE STYLES (Default) --- */
        fixed top-0 left-0 w-full border-b
        ${sidebarOpen ? 'h-screen' : 'h-20'} /* Kalo mobile open, height full screen. Kalo closed, cuma header doang */

        /* --- DESKTOP STYLES (md:...) --- */
        md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r
        ${sidebarOpen ? 'md:w-64' : 'md:w-20'} /* Reset height control di desktop via flex/sticky */
      `}
    >
      {/* Header Section */}
      <div className="shrink-0 p-5 border-b border-zinc-800/50 md:border-zinc-800 flex items-center justify-between h-20">
        
        {/* Logo Logic */}
        <div className={`${!sidebarOpen ? 'block md:hidden' : 'block'} min-w-0 transition-opacity duration-200`}>
           <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent truncate">
            Sintink Garage
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-0.5 truncate">
            {userRole === 'admin' ? 'Admin Panel' : 'Customer Portal'}
          </p>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors flex-shrink-0 text-zinc-400 hover:text-white"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="w-6 h-6 md:w-5 md:h-5" /> : <Menu className="w-6 h-6 md:w-5 md:h-5" />}
        </button>
      </div>

      {/* Navigation & Logout Wrapper */}
      <div className={`
        flex-1 flex flex-col overflow-hidden
        ${sidebarOpen ? 'flex' : 'hidden md:flex'} /* Mobile: Hidden kalo closed. Desktop: Always flex */
      `}>
        
        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab)}
              className={`w-full flex items-center gap-3 py-3 rounded-lg transition-all duration-200 font-medium
                ${
                  sidebarOpen 
                    ? 'px-4 justify-start' 
                    : 'md:justify-center md:px-2 px-4 justify-start' 
                }
                ${
                  activeTab === item.tab
                    ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-sm'
                    : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className={`truncate ${!sidebarOpen ? 'md:hidden' : 'block'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="shrink-0 p-4 border-t border-zinc-800 bg-zinc-900 md:bg-transparent">
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition-all duration-200 font-medium
              ${sidebarOpen ? 'justify-start' : 'md:justify-center justify-start'}
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`truncate ${!sidebarOpen ? 'md:hidden' : 'block'}`}>
              Logout
            </span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
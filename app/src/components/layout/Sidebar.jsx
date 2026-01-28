import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts';
import { getMenuItems } from '../../constants/menuItems';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, onSearchClear }) => {
  const { userRole, logout } = useAuth();
  const menuItems = getMenuItems(userRole);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onSearchClear) onSearchClear();
  };

  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        {sidebarOpen && (
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Sintink Garage
            </h1>
            <p className="text-sm text-gray-400">
              {userRole === 'admin' ? 'Admin Panel' : 'Customer Portal'}
            </p>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {menuItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => handleTabChange(item.tab)}
            className={`w-full flex items-center ${
              sidebarOpen ? 'px-4' : 'px-2 justify-center'
            } py-3 rounded-lg transition-all ${
              activeTab === item.tab
                ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

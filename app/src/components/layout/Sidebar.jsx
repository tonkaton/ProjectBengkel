import React from 'react';
import { Menu, X, LogOut, Wrench } from 'lucide-react';
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
    setSidebarOpen(false);
    if (onSearchClear) onSearchClear();
  };

  return (
    <div
      className={`
        z-50 flex flex-col bg-panel transition-all duration-300
        fixed left-0 top-0 w-full border-b border-white/60
        ${sidebarOpen ? 'h-screen' : 'h-20'}
        md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r
        ${sidebarOpen ? 'md:w-64' : 'md:w-20'}
      `}
    >
      {/* Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/60 p-5">
        <div className={`${!sidebarOpen ? 'block md:hidden' : 'block'} flex min-w-0 items-center gap-2.5`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-base text-accent shadow-soft-in">
            <Wrench size={18} strokeWidth={2.4} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl tracking-wide text-ink">
              Botak<span className="text-accent">.</span> Engine
            </h1>
            <p className="truncate text-[11px] font-medium text-muted">
              {userRole === 'admin' ? 'Admin Panel' : 'Customer Portal'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base text-slate-500 shadow-soft-in transition active:shadow-soft-in-sm"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Nav + Logout */}
      <div className={`flex flex-1 flex-col overflow-hidden ${sidebarOpen ? 'flex' : 'hidden md:flex'}`}>
        <nav className="scrollbar-hide flex-1 space-y-1.5 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const active = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleTabChange(item.tab)}
                className={`flex w-full items-center gap-3 rounded-2xl py-3 font-medium transition-all duration-200
                  ${sidebarOpen ? 'justify-start px-4' : 'justify-start px-4 md:justify-center md:px-2'}
                  ${
                    active
                      ? 'bg-card text-accent shadow-soft'
                      : 'text-slate-500 hover:bg-base hover:text-ink'
                  }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={`truncate ${!sidebarOpen ? 'md:hidden' : 'block'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/60 p-4">
          <button
            onClick={logout}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium text-accent transition-all duration-200 hover:bg-red-50
              ${sidebarOpen ? 'justify-start' : 'justify-start md:justify-center'}`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={`truncate ${!sidebarOpen ? 'md:hidden' : 'block'}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

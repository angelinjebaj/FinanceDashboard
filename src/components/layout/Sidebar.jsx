import React from 'react';
import { LayoutDashboard, ArrowRightLeft, PieChart, PlusCircle, Settings, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import clsx from 'clsx';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
  { id: 'insights', label: 'Insights', icon: PieChart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ currentPage, setCurrentPage, setIsAddModalOpen, isSidebarOpen, setIsSidebarOpen }) => {
  const { role } = useAppContext();

  return (
    <aside className={clsx(
      "w-64 bg-card border-r border-border h-screen flex flex-col transition-transform duration-300 z-30 fixed lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mr-3">
          <span className="text-white font-bold text-xl leading-none">F</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-text">FinDash</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="mb-4 px-2 text-xs font-semibold text-textMuted uppercase tracking-wider">
          Menu
        </div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentPage(item.id);
              setIsSidebarOpen(false); // Close sidebar after navigation on mobile
            }}
            className={clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
              currentPage === item.id 
                ? "bg-primary/10 text-primary" 
                : "text-textMuted hover:bg-white/5 hover:text-text"
            )}
          >
            <item.icon className={clsx(
              "w-5 h-5 transition-colors",
              currentPage === item.id ? "text-primary" : "text-textMuted group-hover:text-text"
            )} />
            {item.label}
          </button>
        ))}

        {role === 'Admin' && (
          <div className="mt-8">
            <div className="mb-4 px-2 text-xs font-semibold text-textMuted uppercase tracking-wider">
              Actions
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-5 h-5" />
                <span>Add Record</span>
              </div>
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border mt-auto">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-textMuted hover:text-danger hover:bg-danger/10 transition-all duration-200 w-full group">
          <LogOut className="w-5 h-5 text-textMuted group-hover:text-danger" />
          Logout
        </button>
      </div>
    </aside>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, Search, User, Menu } from 'lucide-react';

export const Header = ({ setIsSidebarOpen }) => {
  const { role, setRole } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const mockNotifications = [
    { id: 1, title: 'Settings Updated', description: 'Your appearance preferences have been saved.', time: 'Just now', unread: true },
    { id: 2, title: 'New Transaction', description: 'Received ₹500.00 from Side Hustle.', time: '2 hours ago', unread: true },
    { id: 3, title: 'Goal Reached!', description: 'You have hit your savings goal for this month.', time: '1 day ago', unread: false },
  ];

  return (
    <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="lg:hidden p-2 text-textMuted hover:text-text transition-colors rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-card border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-2 mr-2">
          <span className="text-xs text-textMuted font-medium">Role:</span>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-card border border-border text-xs rounded-md px-2 py-1 focus:outline-none focus:border-primary cursor-pointer transition-colors"
          >
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative p-2 text-textMuted hover:text-text transition-colors rounded-full hover:bg-card"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-accent rounded-full border border-background"></span>
          </button>
          
          {showNotifications && (
            <>
              {/* Dropdown Panel */}
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-background/50">
                  <h3 className="font-semibold text-text">Notifications</h3>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all as read</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-border">
                  {mockNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-4 ${notification.unread ? 'bg-primary/5' : ''}`}
                    >
                      <div className="mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${notification.unread ? 'bg-primary' : 'bg-transparent'}`}></div>
                      </div>
                      <div>
                        <p className={`text-sm ${notification.unread ? 'font-semibold text-text' : 'font-medium text-textMuted'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-textMuted mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-textMuted/70 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border text-center bg-background/50 hover:bg-white/5 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-primary">View all notifications</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-border">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-text leading-tight">Alex Johnson</span>
            <span className="text-xs text-textMuted leading-tight">{role}</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-primary/30 p-0.5 cursor-pointer">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-textMuted" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

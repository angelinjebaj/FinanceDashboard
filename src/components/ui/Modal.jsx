import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

export const Modal = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
      <div 
        className="absolute inset-0 bg-background/80 transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className={clsx(
        "relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text">{title}</h2>
          <button 
            onClick={onClose}
            className="text-textMuted hover:text-text transition-colors rounded-full p-1 hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm shadow-primary/20",
    secondary: "bg-card border border-border text-text hover:bg-border/50",
    danger: "bg-danger text-white hover:bg-danger/90 shadow-sm shadow-danger/20",
    ghost: "text-textMuted hover:text-text hover:bg-white/5",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base",
  };

  return (
    <button 
      className={clsx(baseStyles, variants[variant], sizes['md'], className)}
      {...props}
    >
      {children}
    </button>
  );
};

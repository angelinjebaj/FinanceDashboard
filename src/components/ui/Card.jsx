import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={clsx(
        "bg-card border border-border rounded-xl shadow-lg relative overflow-hidden",
        className
      )} 
      {...props}
    >
      {/* Subtle top glare effect for a premium feel */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={clsx("px-6 py-5 border-b border-border", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={clsx("text-lg font-semibold text-text leading-none tracking-tight", className)} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={clsx("p-6", className)} {...props}>
    {children}
  </div>
);

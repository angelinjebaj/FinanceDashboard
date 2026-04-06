import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { User, Shield, Moon } from 'lucide-react';
import clsx from 'clsx';

export const Settings = () => {
  const { role, setRole } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Settings</h1>
          <p className="text-sm text-textMuted mt-1">Manage your account preferences and view profile information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={clsx("w-full text-left p-3 font-medium rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors", activeTab === 'profile' ? "bg-primary/10 text-primary" : "text-textMuted")}
          >
            <User className={clsx("w-5 h-5", activeTab === 'profile' ? "text-primary" : "text-textMuted")} /> Profile Details
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={clsx("w-full text-left p-3 font-medium rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors", activeTab === 'roles' ? "bg-primary/10 text-primary" : "text-textMuted")}
          >
            <Shield className={clsx("w-5 h-5", activeTab === 'roles' ? "text-primary" : "text-textMuted")} /> Roles & Permissions
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={clsx("w-full text-left p-3 font-medium rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors", activeTab === 'appearance' ? "bg-primary/10 text-primary" : "text-textMuted")}
          >
            <Moon className={clsx("w-5 h-5", activeTab === 'appearance' ? "text-primary" : "text-textMuted")} /> Appearance
          </button>
        </div>

        <div className="md:col-span-2 space-y-6">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-card border-2 border-border flex items-center justify-center overflow-hidden">
                    <User className="w-10 h-10 text-textMuted" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-text">Alex Johnson</h3>
                    <p className="text-sm text-textMuted">alex.johnson@example.com</p>
                    <div className="mt-2 text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full inline-block">
                      {role}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-textMuted">First Name</label>
                      <input type="text" defaultValue="Alex" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary disabled:opacity-50" disabled />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-textMuted">Last Name</label>
                      <input type="text" defaultValue="Johnson" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary disabled:opacity-50" disabled />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-textMuted">Email Address</label>
                    <input type="email" defaultValue="alex.johnson@example.com" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-primary disabled:opacity-50" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'roles' && (
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <p className="text-sm text-textMuted mb-4">You are currently viewing the application as an <strong className="text-text">{role}</strong>. For demonstration purposes, you can toggle your role here as well.</p>
                    <div className="flex bg-background border border-border rounded-lg p-1 w-full sm:w-64">
                      <button 
                        onClick={() => setRole('Admin')}
                        className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${role === 'Admin' ? 'bg-card shadow-sm text-text' : 'text-textMuted hover:text-text'}`}
                      >
                        Admin
                      </button>
                      <button 
                        onClick={() => setRole('Viewer')}
                        className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${role === 'Viewer' ? 'bg-card shadow-sm text-text' : 'text-textMuted hover:text-text'}`}
                      >
                        Viewer
                      </button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-textMuted mb-4">The application uses your system preferences or variables defined in the central CSS file. Dark Mode is currently the active default.</p>
                <div className="p-4 border border-border rounded-lg bg-background flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <Moon className="w-5 h-5 text-primary" />
                     <span className="text-sm font-medium text-text">Premium Dark Theme</span>
                   </div>
                   <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">Active</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

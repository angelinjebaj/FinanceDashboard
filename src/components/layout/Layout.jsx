import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AddTransactionModal } from '../transactions/AddTransactionModal';

export const Layout = ({ children, currentPage, setCurrentPage }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-text overflow-hidden relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsAddModalOpen={setIsAddModalOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-screen min-w-0 pb-5">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background relative">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </main>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

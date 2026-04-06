import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Insights } from './pages/Insights';
import { Settings } from './pages/Settings';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

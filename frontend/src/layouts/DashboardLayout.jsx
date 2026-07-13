import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content Pane */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative">
        {/* Background glow effects inside dashboard */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-brand-accent/5 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full"></div>

        <Navbar onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 relative z-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay backdrop */}
      {sidebarOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default DashboardLayout;

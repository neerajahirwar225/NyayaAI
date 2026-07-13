import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, UserCircle } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'N';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Mobile Toggle Menu */}
      <button 
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-lg text-brand-textMuted hover:text-white hover:bg-white/5"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Title Placeholder for desktop */}
      <div className="hidden lg:block text-sm text-brand-textMuted font-light">
        Welcome back, <span className="text-white font-medium">{user?.name}</span>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* User Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-accent/25 border border-brand-accent/50 flex items-center justify-center font-bold text-white text-sm shadow-md">
            {getInitials(user?.name)}
          </div>
          <span className="hidden md:inline text-sm font-medium text-white">{user?.name}</span>
        </div>

        <span className="h-6 w-px bg-white/10"></span>

        {/* Logout Button */}
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-brand-textMuted hover:text-brand-danger transition-colors rounded-lg hover:bg-white/5"
          title="Sign Out"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

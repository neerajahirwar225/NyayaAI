import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileSignature, 
  Eye, 
  ShieldAlert, 
  User, 
  Scale
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dashboard/chatbot', label: 'AI Chatbot', icon: MessageSquare },
    { to: '/dashboard/document-generator', label: 'Document Generator', icon: FileSignature },
    { to: '/dashboard/document-analyzer', label: 'Document Analyzer', icon: Eye },
    { to: '/dashboard/rights-awareness', label: 'Rights Awareness', icon: ShieldAlert },
    { to: '/dashboard/profile', label: 'My Profile', icon: User }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/5 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
        <Scale className="h-7 w-7 text-brand-accent animate-pulse" />
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">NyayaAI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-brand-accent/20 text-white border border-brand-accent/35 shadow-lg shadow-brand-accent/5' 
                    : 'text-brand-textMuted hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 text-center text-xs text-brand-textMuted">
        <p>NyayaAI Legal v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;

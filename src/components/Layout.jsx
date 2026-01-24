import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Bike, Users, Music, MessageSquare, Settings, Home, Menu, X } from 'lucide-react';

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/rides', icon: Bike, label: 'Rides' },
    { path: '/group-rides', icon: Users, label: 'Group Rides' },
    { path: '/music', icon: Music, label: 'Music Sync' },
    { path: '/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#EAF6FF]">
      <nav className="bg-[#121A22] border-b border-[#1a2332]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-[#00F0FF]">RideSync</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive(item.path)
                          ? 'border-[#00F0FF] text-[#00F0FF]'
                          : 'border-transparent text-[#EAF6FF] hover:border-[#00F0FF] hover:text-[#00F0FF]'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#EAF6FF] hover:bg-[#0B0F14] focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
            <div className="flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-[#EAF6FF]">{currentUser.email}</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#0B0F14] bg-[#00F0FF] hover:bg-[#00d9e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00F0FF]"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-[#0B0F14] bg-[#00F0FF] hover:bg-[#00d9e6]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-[#0B0F14] text-[#00F0FF]'
                        : 'text-[#EAF6FF] hover:bg-[#0B0F14] hover:text-[#00F0FF]'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-[#1a2332]">
              {currentUser ? (
                <div className="px-3 space-y-3">
                  <div className="px-3 py-2 text-sm text-gray-400">{currentUser.email}</div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-base font-medium text-[#EAF6FF] hover:bg-[#0B0F14] hover:text-[#00F0FF] rounded-md"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-[#EAF6FF] hover:bg-[#0B0F14] hover:text-[#00F0FF] rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

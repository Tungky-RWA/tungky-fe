import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Settings } from 'lucide-react';

interface HeaderProps {
  showNavigation?: boolean;
  userRole?: 'brand' | 'buyer' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ showNavigation = false, userRole }) => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Tungky</span>
          </Link>
          
          {showNavigation && (
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/verify" className="text-white/80 hover:text-white transition-colors">
                Verifikasi Produk
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {userRole && (
              <div className="flex items-center space-x-2 text-white/80">
                {userRole === 'brand' && <User className="h-4 w-4" />}
                {userRole === 'admin' && <Settings className="h-4 w-4" />}
                <span className="capitalize">{userRole}</span>
              </div>
            )}
            
            {!userRole && (
              <div className="flex space-x-2">
                <Link
                  to="/brand"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Brand Login
                </Link>
                <Link
                  to="/admin"
                  className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
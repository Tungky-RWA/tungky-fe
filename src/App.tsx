import React, { useState } from 'react';
import { Shield, Package, Users, Settings, ChevronRight, Plus, Scan, Wallet, Bell, Search } from 'lucide-react';
import BrandDashboard from './components/BrandDashboard';
import BuyerValidation from './components/BuyerValidation';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

type UserRole = 'brand' | 'buyer' | 'admin' | null;

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Tungky</span>
              </div>
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
                <span>RWA & Product Authentication</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {currentRole === 'brand' ? 'Brand Account' : 
                   currentRole === 'admin' ? 'Administrator' : 'Buyer Account'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'brand' && <BrandDashboard />}
        {currentRole === 'buyer' && <BuyerValidation />}
        {currentRole === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}

export default App;
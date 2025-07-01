
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  Coins, 
  Package, 
  Smartphone, 
  QrCode, 
  HelpCircle, 
  BarChart3,
  MapPin,
  LogOut,
  Circle,
  Zap,
  Store
} from 'lucide-react';
import { Button } from '@/components/UI/button';

const Sidebar = () => {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = React.useState(true);

  const navItems = [
    { path: '/brand', icon: Home, label: 'Dashboard' },
    { path: '/brand/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/brand/nft-tracker', icon: MapPin, label: 'NFT Tracker' },
    { path: '/brand/nft', icon: Coins, label: 'NFT Service' },
    { path: '/brand/token', icon: Wallet, label: 'Token Service' },
    { path: '/brand/product', icon: Package, label: 'Product Service' },
    { path: '/brand/marketplace', icon: Store, label: 'Marketplace Service' },
    { path: '/brand/nfc', icon: Smartphone, label: 'NFC Service' },
    { path: '/brand/qr', icon: QrCode, label: 'QR Code Service' },
    { path: '/brand/help', icon: HelpCircle, label: 'Help Service' },
  ];

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <aside className="w-64 h-screen crypto-glass border-r border-white/10 flex flex-col sticky top-0 backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center animate-glow">
            <span className="text-white font-bold">T</span>
          </div>
          <div>
            <h2 className="font-bold text-lg blockchain-gradient">Tungky</h2>
            <p className="text-xs text-muted-foreground">Web3 Brand Portal</p>
          </div>
        </div>

        <div className="mb-6">
          <Button
            onClick={handleWalletConnect}
            className={`w-full justify-start crypto-glass web3-glow ${
              isWalletConnected 
                ? 'bg-gradient-to-r from-green-400/20 to-cyan-400/20 border-green-400/30 text-green-400' 
                : 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-primary'
            }`}
            variant="outline"
          >
            <Wallet className="mr-3 h-4 w-4" />
            {isWalletConnected ? (
              <div className="flex items-center gap-2">
                <span>Wallet Connected</span>
                <Circle className="h-2 w-2 fill-green-400 text-green-400 animate-pulse" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Connect Wallet</span>
                <Zap className="h-3 w-3" />
              </div>
            )}
          </Button>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/30 shadow-lg shadow-primary/10 web3-glow'
                      : 'text-muted-foreground hover:text-white hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:border-primary/20 border border-transparent'
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-colors ${
                    isActive ? 'text-primary' : 'group-hover:text-primary'
                  }`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400/50 crypto-glass"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

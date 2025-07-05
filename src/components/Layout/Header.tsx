import React from "react";
import { Bell, Search, User, Wallet } from "lucide-react";
import { Button } from "@/components/UI/button";

interface HeaderProps {
  userRole: string;
  metadata?: any;
}

const Header: React.FC<HeaderProps> = ({ userRole, metadata }) => {
  return (
    <header className="h-16 crypto-glass border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-lg flex items-center justify-center animate-glow">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold blockchain-gradient">
              Tungky
            </h1>
            <p className="text-xs text-muted-foreground capitalize">
              {userRole} • Web3 Portal
            </p>
          </div>
        </div> */}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search NFTs, tokens..."
            className="w-64 pl-10 pr-4 py-2 bg-input/50 backdrop-blur-sm border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all neon-border"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="relative web3-glow hover:bg-primary/10"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-pulse"></span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="web3-glow hover:bg-primary/10"
        >
          <User className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full border border-green-400/30">
          <Wallet className="h-3 w-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">Connected</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Coins, 
  Package, 
  Nfc, 
  ShoppingCart, 
  LogOut,
  Check,
  X,
  Eye,
  Settings,
  Activity,
  Copy
} from 'lucide-react';
import { Badge } from "@/components/UI/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import { cn, formatAddress } from "@/lib/utils";
import Header from '../components/Layout/Header';
import CardCustom from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';
import { useSignerStatus } from "@account-kit/react";
import { useSmartAccountClient } from "@account-kit/react";
import LoginCard from '@/components/Register/login-card';

const AdminDashboard: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const signerStatus = useSignerStatus();
  const location = useLocation();
  const { client } = useSmartAccountClient({});

  const sidebarItems = [
    { path: '/admin', label: 'Dashboard', icon: Shield },
    { path: '/admin/brands', label: 'Brand Management', icon: Users },
    { path: '/admin/tokens', label: 'TOKEN Management', icon: Coins },
    { path: '/admin/nfts', label: 'NFT Management', icon: Package },
    { path: '/admin/nfc', label: 'NFC Management', icon: Nfc },
    // { path: '/admin/buyers', label: 'Buyer Management', icon: Users },
    { path: '/admin/transactions', label: 'Transaction Management', icon: ShoppingCart },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(client?.account?.address ?? "");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <LoginCard cardDescription="Need to login first"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Header userRole="admin" /> */}
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10 min-h-screen mt-16">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-white text-xs py-1 px-2">
                  {formatAddress(client?.account?.address ?? "")}
                </Badge>
                <TooltipProvider>
                  <Tooltip open={isCopied}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCopy}
                      >
                        <Copy className="h-4 w-4" color="white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copied!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/brands" element={<BrandManagement />} />
            <Route path="/tokens" element={<TokenManagement />} />
            <Route path="/nfts" element={<NFTManagement />} />
            <Route path="/nfc" element={<NFCManagement />} />
            <Route path="/buyers" element={<BuyerManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const AdminHome: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
      <p className="text-white/60">Monitor dan kelola seluruh platform Tungky</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CardCustom className="text-center">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Total Brands</h3>
        <p className="text-2xl font-bold text-primary">156</p>
        <p className="text-white/60 text-sm">+12 this month</p>
      </CardCustom>
      
      <CardCustom className="text-center">
        <Package className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Total NFTs</h3>
        <p className="text-2xl font-bold text-accent">2,847</p>
        <p className="text-white/60 text-sm">+89 today</p>
      </CardCustom>
      
      <CardCustom className="text-center">
        <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Verifications</h3>
        <p className="text-2xl font-bold text-primary">12,459</p>
        <p className="text-white/60 text-sm">+234 today</p>
      </CardCustom>
      
      <CardCustom className="text-center">
        <Coins className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Token Supply</h3>
        <p className="text-2xl font-bold text-accent">1.2M</p>
        <p className="text-white/60 text-sm">Total circulating</p>
      </CardCustom>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">New Brand Registration</p>
              <p className="text-white/60 text-sm">Premium Electronics Co.</p>
            </div>
            <span className="text-green-400 text-sm">5m ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">NFT Minted</p>
              <p className="text-white/60 text-sm">Luxury Watch #3456</p>
            </div>
            <span className="text-blue-400 text-sm">12m ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Product Verified</p>
              <p className="text-white/60 text-sm">Fashion Bag #7890</p>
            </div>
            <span className="text-accent text-sm">18m ago</span>
          </div>
        </div>
      </CardCustom>

      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Pending Approvals</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Brand Verification</p>
              <p className="text-white/60 text-sm">Tech Gadgets Ltd.</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-green-400 hover:text-green-300">
                <Check className="h-4 w-4" />
              </button>
              <button className="text-red-400 hover:text-red-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div>
              <p className="text-white font-medium">NFC Request</p>
              <p className="text-white/60 text-sm">500 tags for Fashion Brand</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-green-400 hover:text-green-300">
                <Check className="h-4 w-4" />
              </button>
              <button className="text-red-400 hover:text-red-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardCustom>
    </div>
  </div>
);

const BrandManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Brand Management</h1>
      <p className="text-white/60">Kelola registrasi dan status brand</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Pending Brand Registrations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-medium">Premium Electronics Co.
                  
                </h4>
                <p className="text-white/60 text-sm">electronics@premium.com</p>
                <p className="text-white/60 text-sm">Registered: 2 hours ago</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="accent" size="sm" icon={Check}>
                Validate
              </Button>
              <Button variant="secondary" size="sm" icon={X}>
                Reject
              </Button>
              <Button variant="outline" size="sm" icon={Eye}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardCustom>

      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Active Brands</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-medium">Tech Gadgets Ltd.</h4>
                <p className="text-white/60 text-sm">156 NFTs Created</p>
                <p className="text-white/60 text-sm">Active since: Jan 2025</p>
              </div>
              <span className="text-green-400 text-sm">Active</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" icon={Settings}>
                Matikan
              </Button>
              <Button variant="outline" size="sm" icon={Eye}>
                View Details
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-medium">Luxury Watch Co.</h4>
                <p className="text-white/60 text-sm">89 NFTs Created</p>
                <p className="text-white/60 text-sm">Active since: Dec 2024</p>
              </div>
              <span className="text-green-400 text-sm">Active</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" icon={Settings}>
                Matikan
              </Button>
              <Button variant="outline" size="sm" icon={Eye}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardCustom>
    </div>
  </div>
);

const TokenManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">TOKEN Management (ERC-1155)</h1>
      <p className="text-white/60">Kelola token supply dan distribusi</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Token Operations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="text-primary font-medium mb-2">Current Supply</h4>
            <p className="text-white text-2xl font-bold">1,250,000 Tokens</p>
          </div>
          
          <div className="space-y-3">
            <Button variant="primary" size="md" className="w-full">
              Minting Token
            </Button>
            <Button variant="accent" size="md" className="w-full">
              Pull Token
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              Burn Token
            </Button>
            <Button variant="outline" size="md" className="w-full">
              Transfer Token
            </Button>
          </div>
        </div>
      </CardCustom>

      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Token Distribution</h3>
        <div className="space-y-4">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Brands</span>
              <span className="text-white font-medium">750,000 (60%)</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Treasury</span>
              <span className="text-white font-medium">375,000 (30%)</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Liquidity</span>
              <span className="text-white font-medium">125,000 (10%)</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <input
                type="number"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                placeholder="Amount to mint"
              />
              <input
                type="text"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
                placeholder="Recipient address"
              />
            </div>
          </div>
        </div>
      </CardCustom>
    </div>
  </div>
);

const NFTManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">NFT Management</h1>
      <p className="text-white/60">Monitor dan kelola semua NFT di platform</p>
    </div>

    <CardCustom>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Read All NFT</h3>
        <div className="flex space-x-4">
          <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-primary focus:outline-none">
            <option value="">All Brands</option>
            <option value="tech">Tech Gadgets Ltd.</option>
            <option value="luxury">Luxury Watch Co.</option>
          </select>
          <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-primary focus:outline-none">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white/80 py-3 px-4">Token ID</th>
              <th className="text-left text-white/80 py-3 px-4">Product Name</th>
              <th className="text-left text-white/80 py-3 px-4">Brand</th>
              <th className="text-left text-white/80 py-3 px-4">Created</th>
              <th className="text-left text-white/80 py-3 px-4">Status</th>
              <th className="text-left text-white/80 py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-white">#1234</td>
              <td className="py-3 px-4 text-white">Premium Watch</td>
              <td className="py-3 px-4 text-white/80">Luxury Watch Co.</td>
              <td className="py-3 px-4 text-white/80">Jan 15, 2025</td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </td>
              <td className="py-3 px-4">
                <Button variant="outline" size="sm" icon={Eye}>
                  View
                </Button>
              </td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-white">#5678</td>
              <td className="py-3 px-4 text-white">Smart Phone</td>
              <td className="py-3 px-4 text-white/80">Tech Gadgets Ltd.</td>
              <td className="py-3 px-4 text-white/80">Jan 20, 2025</td>
              <td className="py-3 px-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                  Pending
                </span>
              </td>
              <td className="py-3 px-4">
                <Button variant="outline" size="sm" icon={Eye}>
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardCustom>
  </div>
);

const NFCManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">NFC Management</h1>
      <p className="text-white/60">Kelola permintaan dan distribusi NFC tags</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">Pending NFC Requests</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-white font-medium">Fashion Luxe Brand</h4>
                <p className="text-white/60 text-sm">Quantity: 500 tags</p>
                <p className="text-white/60 text-sm">Product: Luxury Bags</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="accent" size="sm" icon={Check}>
                Approve
              </Button>
              <Button variant="secondary" size="sm" icon={X}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      </CardCustom>

      <CardCustom>
        <h3 className="text-xl font-semibold text-white mb-4">NFC Inventory</h3>
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="text-primary font-medium mb-2">Available Tags</h4>
            <p className="text-white text-2xl font-bold">2,450</p>
          </div>
          
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <h4 className="text-accent font-medium mb-2">Distributed Tags</h4>
            <p className="text-white text-2xl font-bold">1,850</p>
          </div>
          
          <Button variant="primary" size="md" className="w-full">
            Order More Tags
          </Button>
        </div>
      </CardCustom>
    </div>
  </div>
);

const BuyerManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Buyer Management</h1>
      <p className="text-white/60">Kelola registrasi dan aktivitas buyer</p>
    </div>

    <CardCustom>
      <h3 className="text-xl font-semibold text-white mb-4">Buyer Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white/80 py-3 px-4">Buyer ID</th>
              <th className="text-left text-white/80 py-3 px-4">Verifications</th>
              <th className="text-left text-white/80 py-3 px-4">Last Activity</th>
              <th className="text-left text-white/80 py-3 px-4">Status</th>
              <th className="text-left text-white/80 py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-white">0x1234...5678</td>
              <td className="py-3 px-4 text-white/80">45 verifications</td>
              <td className="py-3 px-4 text-white/80">2 hours ago</td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  Active
                </span>
              </td>
              <td className="py-3 px-4">
                <Button variant="outline" size="sm" icon={Eye}>
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardCustom>
  </div>
);

const TransactionManagement: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Transaction Management</h1>
      <p className="text-white/60">Monitor semua transaksi di platform</p>
    </div>

    <CardCustom>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Melihat Seluruh Transaksi</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:border-primary focus:outline-none"
            placeholder="Search transactions..."
          />
          <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:border-primary focus:outline-none">
            <option value="">All Types</option>
            <option value="mint">NFT Minting</option>
            <option value="verify">Verification</option>
            <option value="token">Token Transfer</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white/80 py-3 px-4">TX Hash</th>
              <th className="text-left text-white/80 py-3 px-4">Type</th>
              <th className="text-left text-white/80 py-3 px-4">From</th>
              <th className="text-left text-white/80 py-3 px-4">Amount</th>
              <th className="text-left text-white/80 py-3 px-4">Time</th>
              <th className="text-left text-white/80 py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-white font-mono text-sm">0xab12...cd34</td>
              <td className="py-3 px-4 text-white/80">NFT Mint</td>
              <td className="py-3 px-4 text-white/80">Luxury Watch Co.</td>
              <td className="py-3 px-4 text-white/80">10 Tokens</td>
              <td className="py-3 px-4 text-white/80">5m ago</td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  Confirmed
                </span>
              </td>
            </tr>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-white font-mono text-sm">0xef56...gh78</td>
              <td className="py-3 px-4 text-white/80">Verification</td>
              <td className="py-3 px-4 text-white/80">Consumer</td>
              <td className="py-3 px-4 text-white/80">-</td>
              <td className="py-3 px-4 text-white/80">12m ago</td>
              <td className="py-3 px-4">
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                  Success
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardCustom>
  </div>
);

export default AdminDashboard;
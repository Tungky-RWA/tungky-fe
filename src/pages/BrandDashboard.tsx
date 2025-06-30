import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Coins, 
  Package, 
  Gift, 
  Nfc, 
  QrCode, 
  HelpCircle, 
  LogOut,
  Plus,
  List,
  Eye,
  Edit,
  CreditCard,
  Download
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';

const BrandDashboard: React.FC = () => {
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  const sidebarItems = [
    { path: '/brand', label: 'Dashboard', icon: Shield },
    { path: '/brand/nft', label: 'NFT Service', icon: Package },
    { path: '/brand/token', label: 'Token Service', icon: Coins },
    { path: '/brand/product', label: 'Product Service', icon: Gift },
    { path: '/brand/nfc', label: 'NFC Service', icon: Nfc },
    { path: '/brand/qr', label: 'QR Code Service', icon: QrCode },
    { path: '/brand/help', label: 'Help Service', icon: HelpCircle },
  ];

  const handleWalletConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Header userRole="brand" /> */}
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10 min-h-screen mt-16">
          <div className="p-6">
            <div className="mb-8">
              {!isConnected ? (
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleWalletConnect}
                  className="w-full"
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-white/80 text-sm">Wallet Connected</p>
                </div>
              )}
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
            <Route path="/" element={<DashboardHome />} />
            <Route path="/nft" element={<NFTService />} />
            <Route path="/token" element={<TokenService />} />
            <Route path="/product" element={<ProductService />} />
            <Route path="/nfc" element={<NFCService />} />
            <Route path="/qr" element={<QRService />} />
            <Route path="/help" element={<HelpService />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const DashboardHome: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Brand Dashboard</h1>
      <p className="text-white/60">Kelola produk dan NFT Anda dengan mudah</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="text-center">
        <Package className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Total Products</h3>
        <p className="text-2xl font-bold text-primary">24</p>
      </Card>
      
      <Card className="text-center">
        <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">NFTs Minted</h3>
        <p className="text-2xl font-bold text-accent">18</p>
      </Card>
      
      <Card className="text-center">
        <Coins className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Token Balance</h3>
        <p className="text-2xl font-bold text-primary">1,250</p>
      </Card>
      
      <Card className="text-center">
        <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Verifications</h3>
        <p className="text-2xl font-bold text-accent">89</p>
      </Card>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link to="/brand/nft">
            <Button variant="primary" size="sm" icon={Plus} className="w-full justify-start">
              Create New NFT
            </Button>
          </Link>
          <Link to="/brand/product">
            <Button variant="accent" size="sm" icon={Package} className="w-full justify-start">
              Add Product
            </Button>
          </Link>
          <Link to="/brand/nfc">
            <Button variant="secondary" size="sm" icon={Nfc} className="w-full justify-start">
              Request NFC Tags
            </Button>
          </Link>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">NFT #1234 Created</p>
              <p className="text-white/60 text-sm">Product: Premium Watch</p>
            </div>
            <span className="text-green-400 text-sm">2h ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Verification Completed</p>
              <p className="text-white/60 text-sm">Product: Luxury Bag</p>
            </div>
            <span className="text-blue-400 text-sm">4h ago</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const NFTService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">NFT Service</h1>
      <p className="text-white/60">Kelola NFT dan tokenisasi produk Anda</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-primary" />
          Create NFT Product (Minting)
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              rows={3}
              placeholder="Product description"
            ></textarea>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Price (Token)</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <Button variant="primary" size="md" className="w-full">
            Mint NFT
          </Button>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <List className="h-5 w-5 mr-2 text-accent" />
          List All NFT & Product
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-medium">Premium Watch #1234</h4>
              <span className="text-green-400 text-sm">Active</span>
            </div>
            <p className="text-white/60 text-sm mb-3">Wallet: 0x1234...5678</p>
            <Button variant="outline" size="sm" icon={Eye}>
              Lihat Detail
            </Button>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-medium">Luxury Bag #5678</h4>
              <span className="text-yellow-400 text-sm">Pending</span>
            </div>
            <p className="text-white/60 text-sm mb-3">Wallet: 0x9876...4321</p>
            <Button variant="outline" size="sm" icon={Eye}>
              Lihat Detail
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const TokenService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Token Service</h1>
      <p className="text-white/60">Kelola token dan kuota minting Anda</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          Beli Token/Kuota untuk Minting
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-primary font-medium">Current Balance: 1,250 Tokens</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Amount to Purchase</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Enter amount"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
              100 Tokens
            </button>
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
              500 Tokens
            </button>
            <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
              1000 Tokens
            </button>
          </div>
          <Button variant="primary" size="md" className="w-full">
            Buy Tokens
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-accent" />
          Withdraw Token
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Withdraw Amount</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Enter amount to withdraw"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Withdrawal Method</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="">Select method</option>
              <option value="fiat">Fiat Currency</option>
              <option value="eth">Ethereum</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Destination Address/Account</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Enter address or account"
            />
          </div>
          <Button variant="accent" size="md" className="w-full">
            Withdraw Tokens
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

const ProductService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Product Service</h1>
      <p className="text-white/60">Kelola produk dan integrasinya dengan NFT</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2 text-primary" />
          Add Product Langsung jadi NFT
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="luxury">Luxury Items</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Harga dalam Bentuk Token Kita</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Price in tokens"
            />
          </div>
          <Button variant="primary" size="md" className="w-full">
            Create Product & Mint NFT
          </Button>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Edit className="h-5 w-5 mr-2 text-accent" />
          Edit Product yang sudah jadi NFT
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Select Product</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="">Choose product to edit</option>
              <option value="1">Premium Watch #1234</option>
              <option value="2">Luxury Bag #5678</option>
            </select>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Current Product Info</h4>
            <p className="text-white/60 text-sm">Name: Premium Watch</p>
            <p className="text-white/60 text-sm">Token ID: #1234</p>
            <p className="text-white/60 text-sm">Price: 50 Tokens</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">New Price (Tokens)</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="New price"
            />
          </div>
          <Button variant="accent" size="md" className="w-full">
            Update Product
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

const NFCService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">NFC Service</h1>
      <p className="text-white/60">Kelola NFC tags untuk produk Anda</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Nfc className="h-5 w-5 mr-2 text-primary" />
          Request NFC
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Product for NFC</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="">Select product</option>
              <option value="1">Premium Watch #1234</option>
              <option value="2">Luxury Bag #5678</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              placeholder="Number of NFC tags needed"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Shipping Address</label>
            <textarea
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary focus:outline-none"
              rows={3}
              placeholder="Enter complete shipping address"
            ></textarea>
          </div>
          <Button variant="primary" size="md" className="w-full">
            Request NFC Tags
          </Button>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Edit className="h-5 w-5 mr-2 text-accent" />
          Self Service NFC
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
            <h4 className="text-accent font-medium mb-2">Instructions</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Download NFC writing app</li>
              <li>• Select product from dropdown</li>
              <li>• Write verification URL to NFC tag</li>
              <li>• Test the NFC tag functionality</li>
            </ul>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Select Product</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="">Choose product</option>
              <option value="1">Premium Watch #1234</option>
              <option value="2">Luxury Bag #5678</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Generated URL</label>
            <div className="p-3 bg-white/5 rounded-lg">
              <code className="text-accent text-sm">
                https://tungky.com/verify/abc123def456
              </code>
            </div>
          </div>
          <Button variant="accent" size="md" className="w-full">
            Generate NFC Data
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

const QRService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">QR Code Service</h1>
      <p className="text-white/60">Generate dan print QR codes untuk produk</p>
    </div>

    <Card className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <QrCode className="h-5 w-5 mr-2 text-primary" />
        Print QR Code
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Select Product</label>
          <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
            <option value="">Choose product for QR code</option>
            <option value="1">Premium Watch #1234</option>
            <option value="2">Luxury Bag #5678</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">QR Code Size</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="small">Small (2x2 cm)</option>
              <option value="medium">Medium (3x3 cm)</option>
              <option value="large">Large (5x5 cm)</option>
            </select>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Format</label>
            <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:outline-none">
              <option value="png">PNG</option>
              <option value="pdf">PDF</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>
        <div className="p-6 bg-white/5 rounded-lg text-center">
          <div className="w-32 h-32 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
            <QrCode className="h-24 w-24 text-gray-400" />
          </div>
          <p className="text-white/60 text-sm">QR Code Preview</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="primary" size="md" className="flex-1">
            Generate QR Code
          </Button>
          <Button variant="accent" size="md" className="flex-1">
            Download & Print
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

const HelpService: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Help Service</h1>
      <p className="text-white/60">Bantuan dan dukungan untuk brand</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <HelpCircle className="h-5 w-5 mr-2 text-primary" />
          FAQ and Common Questions
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">How do I mint my first NFT?</h4>
            <p className="text-white/70 text-sm">Navigate to NFT Service and fill in the product details to create your first NFT...</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">What are the token costs?</h4>
            <p className="text-white/70 text-sm">Each NFT minting costs 10 tokens, NFC requests cost 5 tokens per tag...</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">How do I track verifications?</h4>
            <p className="text-white/70 text-sm">You can view all verification activity in your dashboard analytics...</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Customer Service & Support</h3>
        <div className="space-y-4">
          <Button variant="accent" size="md" className="w-full">
            Start Live Chat
          </Button>
          <Button variant="secondary" size="md" className="w-full">
            Request Custom Service
          </Button>
          <Button variant="primary" size="md" className="w-full">
            Request NFC Consultation
          </Button>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Contact Information</h4>
            <p className="text-white/60 text-sm">Email: support@tungky.com</p>
            <p className="text-white/60 text-sm">Phone: +62-xxx-xxxx-xxxx</p>
            <p className="text-white/60 text-sm">Business Hours: 9 AM - 6 PM (WIB)</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default BrandDashboard;
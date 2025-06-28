import React, { useState } from 'react';
import { Package, Plus, Coins, Smartphone, QrCode, BarChart3, Eye, Edit, Trash2 } from 'lucide-react';

function BrandDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'nft', label: 'NFT Service', icon: Coins },
    { id: 'nfc', label: 'NFC/QR', icon: Smartphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brand Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your products and authentication tokens</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">NFTs Minted</p>
                <p className="text-2xl font-bold text-green-900">987</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Verifications</p>
                <p className="text-2xl font-bold text-purple-900">5,432</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Token Balance</p>
                <p className="text-2xl font-bold text-orange-900">2,156</p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'nft' && <NFTTab />}
          {activeTab === 'nfc' && <NFCTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  const products = [
    { id: 1, name: 'Premium Leather Wallet', status: 'NFT Minted', verifications: 45, lastScan: '2 hours ago' },
    { id: 2, name: 'Artisan Coffee Beans', status: 'Pending NFT', verifications: 0, lastScan: 'Never' },
    { id: 3, name: 'Handcrafted Jewelry', status: 'NFT Minted', verifications: 78, lastScan: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
          Add New Product
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verifications</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Scan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'NFT Minted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.verifications}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.lastScan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-1">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NFTTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">NFT Service</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Mint New NFT</h4>
          <p className="text-gray-600 mb-4">Create a new NFT for your product with metadata and authenticity proof.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Start Minting
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Auto-Mint Settings</h4>
          <p className="text-gray-600 mb-4">Configure automatic NFT minting when products are sold through your marketplace.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Configure
          </button>
        </div>
      </div>
    </div>
  );
}

function NFCTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">NFC & QR Code Management</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
          <Smartphone className="w-8 h-8 text-purple-600 mb-4" />
          <h4 className="font-semibold text-gray-900 mb-4">Request NFC Cards</h4>
          <p className="text-gray-600 mb-4">Order physical NFC cards for your products with custom branding.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Place Order
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
          <QrCode className="w-8 h-8 text-orange-600 mb-4" />
          <h4 className="font-semibold text-gray-900 mb-4">Generate QR Codes</h4>
          <p className="text-gray-600 mb-4">Create and download QR codes for immediate product authentication.</p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Generate QR
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Verification Trends</h4>
          <div className="h-32 bg-gradient-to-t from-blue-100 to-transparent rounded"></div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Popular Products</h4>
          <div className="h-32 bg-gradient-to-t from-green-100 to-transparent rounded"></div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Geographic Distribution</h4>
          <div className="h-32 bg-gradient-to-t from-purple-100 to-transparent rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default BrandDashboard;
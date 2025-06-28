import React, { useState } from 'react';
import { Users, Shield, Coins, Package, CheckCircle, XCircle, Eye, Settings } from 'lucide-react';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'brands', label: 'Brand Management', icon: Package },
    { id: 'buyers', label: 'Buyer Management', icon: Users },
    { id: 'tokens', label: 'Token Management', icon: Coins },
  ];

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Administrator Dashboard</h1>
        <p className="text-purple-100 text-lg">
          Manage platform operations, validate users, and oversee the authentication ecosystem
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Brands</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-green-600 text-sm">+12 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Buyers</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-green-600 text-sm">+340 this month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">NFTs Minted</p>
              <p className="text-2xl font-bold text-gray-900">45,231</p>
              <p className="text-green-600 text-sm">+1,234 this week</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Verifications</p>
              <p className="text-2xl font-bold text-gray-900">128,945</p>
              <p className="text-green-600 text-sm">+2,456 today</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-orange-600" />
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
                      ? 'border-purple-500 text-purple-600'
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
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'brands' && <BrandManagementTab />}
          {activeTab === 'buyers' && <BuyerManagementTab />}
          {activeTab === 'tokens' && <TokenManagementTab />}
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Platform Overview</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New brand registrations</span>
              <span className="font-medium text-gray-900">3 today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Product verifications</span>
              <span className="font-medium text-gray-900">2,456 today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">NFTs minted</span>
              <span className="font-medium text-gray-900">187 today</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">System Health</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Blockchain Connectivity</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Response Time</span>
              <span className="text-green-600 font-medium">245ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Uptime</span>
              <span className="text-green-600 font-medium">99.9%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandManagementTab() {
  const pendingBrands = [
    { id: 1, name: 'Artisan Crafts Co.', email: 'contact@artisancrafts.com', submitted: '2 hours ago', status: 'pending' },
    { id: 2, name: 'Premium Electronics Ltd.', email: 'admin@premiumelec.com', submitted: '1 day ago', status: 'pending' },
    { id: 3, name: 'Luxury Fashion House', email: 'info@luxuryfashion.com', submitted: '3 days ago', status: 'under_review' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Brand Validation Queue</h3>
        <span className="text-sm text-gray-500">{pendingBrands.length} pending approvals</span>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingBrands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{brand.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{brand.submitted}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    brand.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {brand.status === 'pending' ? 'Pending' : 'Under Review'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-1">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 p-1">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
                    <XCircle className="w-4 h-4" />
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

function BuyerManagementTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Buyer Management</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Active Buyers</h4>
          <p className="text-2xl font-bold text-blue-600">2,847</p>
          <p className="text-sm text-gray-500">+340 this month</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Total Verifications</h4>
          <p className="text-2xl font-bold text-green-600">128,945</p>
          <p className="text-sm text-gray-500">+2,456 today</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Average Per User</h4>
          <p className="text-2xl font-bold text-purple-600">45.3</p>
          <p className="text-sm text-gray-500">verifications</p>
        </div>
      </div>
    </div>
  );
}

function TokenManagementTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Token Economy Management</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Token Operations</h4>
          <div className="space-y-3">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Mint New Tokens
            </button>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Token Transfer
            </button>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Burn Tokens
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Token Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Supply</span>
              <span className="font-medium">1,000,000 TKY</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Circulating</span>
              <span className="font-medium">756,432 TKY</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Burned</span>
              <span className="font-medium">12,345 TKY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
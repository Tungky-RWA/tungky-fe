import React from 'react';
import { Shield, Package, Users, Wallet } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'brand' | 'buyer' | 'admin') => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Tungky</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              RWA & Product Authentication Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Revolutionize product authenticity verification using blockchain technology. 
              Combat counterfeiting with tamper-proof digital certificates and seamless NFC/QR verification.
            </p>
          </div>

          {/* Login Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Brand Login */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Register your products, mint NFTs, manage authentication tokens, and track product ownership.
              </p>
              <button 
                onClick={() => onLogin('brand')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            </div>

            {/* Buyer Login */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Verification</h3>
              <p className="text-gray-600 mb-6">
                Verify product authenticity, view ownership history, and access digital certificates.
              </p>
              <button 
                onClick={() => onLogin('buyer')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            </div>

            {/* Admin Login */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administrator</h3>
              <p className="text-gray-600 mb-6">
                Manage brands, validate registrations, oversee token economy, and monitor platform activity.
              </p>
              <button 
                onClick={() => onLogin('admin')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Why Choose Tungky?
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Tamper-Proof</h4>
                <p className="text-sm text-gray-600">Blockchain immutability ensures authentic verification</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Easy Integration</h4>
                <p className="text-sm text-gray-600">Simple NFC/QR implementation for any product</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Brand Trust</h4>
                <p className="text-sm text-gray-600">Build consumer confidence with verified authenticity</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Ready</h4>
                <p className="text-sm text-gray-600">Blockchain technology for international markets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
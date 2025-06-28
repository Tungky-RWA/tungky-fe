import React, { useState } from 'react';
import { Scan, Shield, Package, User, Wallet, Clock, CheckCircle, XCircle } from 'lucide-react';

function BuyerValidation() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        productName: 'Premium Leather Wallet',
        brand: 'Luxury Crafts Inc.',
        isAuthentic: true,
        owner: 'John Doe',
        walletAddress: '0xC721...3b64',
        mintDate: '2024-01-15',
        verificationCount: 45,
        transferHistory: [
          { date: '2024-01-15', from: 'Brand', to: 'First Owner', type: 'Mint' },
          { date: '2024-02-20', from: 'First Owner', to: 'Current Owner', type: 'Transfer' },
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Product Authentication</h1>
          <p className="text-blue-100 text-lg">
            Verify product authenticity instantly using NFC or QR code scanning. 
            Get complete ownership history and digital certificates.
          </p>
        </div>
      </div>

      {/* Scan Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
            isScanning 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300'
          }`}>
            <Scan className={`w-12 h-12 ${isScanning ? 'text-white' : 'text-gray-600'}`} />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {isScanning ? 'Scanning Product...' : 'Scan to Verify'}
          </h2>
          
          <p className="text-gray-600 mb-8">
            Hold your device near the NFC tag or scan the QR code on your product
          </p>
          
          <button 
            onClick={mockScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
          >
            <Scan className="w-5 h-5" />
            <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
          </button>
        </div>
      </div>

      {/* Scan Results */}
      {scanResult && (
        <div className="space-y-6">
          {/* Authentication Status */}
          <div className={`rounded-2xl p-6 ${
            scanResult.isAuthentic 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-4">
              {scanResult.isAuthentic ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
              <div>
                <h3 className={`text-xl font-semibold ${
                  scanResult.isAuthentic ? 'text-green-900' : 'text-red-900'
                }`}>
                  {scanResult.isAuthentic ? 'Authentic Product' : 'Product Not Verified'}
                </h3>
                <p className={`${
                  scanResult.isAuthentic ? 'text-green-700' : 'text-red-700'
                }`}>
                  {scanResult.isAuthentic 
                    ? 'This product has been verified as authentic' 
                    : 'This product could not be verified'}
                </p>
              </div>
            </div>
          </div>

          {scanResult.isAuthentic && (
            <>
              {/* Product Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Product Name</h4>
                        <p className="text-gray-600">{scanResult.productName}</p>
                        <p className="text-sm text-gray-500">by {scanResult.brand}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Current Owner</h4>
                        <p className="text-gray-600">{scanResult.owner}</p>
                        <p className="text-sm text-gray-500 font-mono">{scanResult.walletAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Mint Date</h4>
                        <p className="text-gray-600">{scanResult.mintDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Verifications</h4>
                        <p className="text-gray-600">{scanResult.verificationCount} times</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ownership History */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Ownership History</h3>
                
                <div className="space-y-4">
                  {scanResult.transferHistory.map((transfer, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{transfer.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-gray-900">{transfer.to}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">{transfer.date}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            transfer.type === 'Mint' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {transfer.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">How Authentication Works</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">1. Scan Product</h4>
            <p className="text-gray-600 text-sm">Use NFC or QR code to identify the product</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">2. Blockchain Verification</h4>
            <p className="text-gray-600 text-sm">Check authenticity against immutable blockchain records</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">3. Get Results</h4>
            <p className="text-gray-600 text-sm">Receive instant verification and ownership details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerValidation;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandLayout from './pages/LayoutBrandDashboard';
import BuyerInterface from './pages/BuyerInterface';
import AdminDashboard from './pages/AdminDashboard';
import VerifyProduct from './pages/VerifyProduct';
import Navbar from './components/Layout/Navbar';
import NFTService from './pages/Brand/NFTService';
import BrandDashboard from './pages/Brand/BrandDashboard';
import Analytics from './pages/Brand/analytics';
import NFTTracker from './pages/Brand/NFTTracker';
import TokenService from './pages/Brand/TokenService';
import ProductService from './pages/Brand/ProductService';
import MarketplaceService from './pages/Brand/MarketplaveService';
import NFCService from './pages/Brand/NFCService';
import QRService from './pages/Brand/QRService';


function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/brand/*" element={<BrandDashboard />} /> */}
          <Route path="/brand" element={<BrandLayout />}>
            <Route index element={<BrandDashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="nft-tracker" element={<NFTTracker />} />
            <Route path="nft" element={<NFTService />} />
            <Route path="token" element={<TokenService />} />
            <Route path="product" element={<ProductService />} />
            <Route path="marketplace" element={<MarketplaceService />} />
            <Route path="nfc" element={<NFCService />} />
            <Route path="qr" element={<QRService />} />
            {/* <Route path="help" element={<HelpService />} /> */}
          </Route>
          <Route path="/buyer" element={<BuyerInterface />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/verify/:productId" element={<VerifyProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
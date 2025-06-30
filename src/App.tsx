import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandDashboard from './pages/BrandDashboard';
import BuyerInterface from './pages/BuyerInterface';
import AdminDashboard from './pages/AdminDashboard';
import VerifyProduct from './pages/VerifyProduct';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brand/*" element={<BrandDashboard />} />
          <Route path="/buyer" element={<BuyerInterface />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/verify/:productId" element={<VerifyProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
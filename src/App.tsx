import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrandLayout from "./pages/LayoutBrandDashboard";
import AdminLayout from "./pages/LayoutAdminDashboard.tsx";
import BuyerInterface from "./pages/BuyerInterface";
// import AdminDashboard from './pages/AdminDashboard';
import VerifyProduct from "./pages/VerifyProduct";
import Register from "./pages/Register";
import Navbar from "./components/Layout/Navbar";
import NFTService from "./pages/Brand/NFTService";
import BrandDashboard from "./pages/Brand/BrandDashboard";
import Analytics from "./pages/Brand/Analytics";
import NFTTracker from "./pages/Brand/NFTTracker";
import TokenService from "./pages/Brand/TokenService";
import ProductService from "./pages/Brand/ProductService";
import MarketplaceService from "./pages/Brand/MarketplaveService";
import NFCService from "./pages/Brand/NFCService";
import QRService from "./pages/Brand/QRService";

import RequireAuth from "./hooks/requireBrand.tsx";

import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import AdminBrand from "./pages/Admin/Brand.tsx";

import { Providers } from "./providers.tsx";
import { cookieToInitialState } from "@account-kit/core";
import { config } from "./config";
import { Toaster } from "react-hot-toast";

import VerificationPage from "./pages/Verification";
import RequireAdmin from "./hooks/requireAdmin.tsx";
import RequireBrand from "./hooks/requireBrand.tsx";
import RegisterCard from "./components/Register/login-card.tsx";
import Login from "./pages/Login.tsx";

function App() {
  const initialState = cookieToInitialState(config);

  return (
    <Providers initialState={initialState}>
      <Router>
        <div className="relative min-h-screen w-full overflow-x-hidden">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route element={<BrandLayout />}> */}
            <Route path="/brand" element={<BrandLayout />}>
              <Route index element={<BrandDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="nft-tracker" element={<NFTTracker />} />
              <Route path="nft" element={<NFTService />} />
              <Route path="token" element={<TokenService />} />
              <Route path="product" element={<ProductService />} />
              {/* <Route path="marketplace" element={<MarketplaceService />} /> */}
              <Route path="nfc" element={<NFCService />} />
              <Route path="qr" element={<QRService />} />
              {/* <Route path="help" element={<HelpService />} /> */}
            </Route>
            {/* </Route> */}
            {/* <Route element={<RequireAdmin />}> */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="brand" element={<AdminBrand />} />
              {/* <Route path="help" element={<HelpService />} /> */}
            </Route>
          {/* </Route> */}
          <Route path="/register" element={<Register />} />
          <Route path="/buyer" element={<BuyerInterface />} />
          <Route path="/verify/" element={<VerifyProduct />} />
          {/* <Route path="/verify/:productId" element={<VerificationPage />} /> */}
        </Routes>
        </div>
      </Router>
      <Toaster />
    </Providers>
  );
}

export default App;

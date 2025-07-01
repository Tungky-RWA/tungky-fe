import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandDashboard from './pages/BrandDashboard';
import BuyerInterface from './pages/BuyerInterface';
import AdminDashboard from './pages/AdminDashboard';
import VerifyProduct from './pages/VerifyProduct';
import Register from './pages/Register';
import Navbar from './components/Layout/Navbar';
import { Providers } from "./providers.tsx";
import { cookieToInitialState } from "@account-kit/core";
import { config } from "./config";
import { Toaster } from 'react-hot-toast';

function App() {
  const initialState = cookieToInitialState(
    config
  );

  return (
    <Providers initialState={initialState}>
      <Router>
        <div className="relative min-h-screen w-screen overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/brand/*" element={<BrandDashboard />} />
            <Route path="/buyer" element={<BuyerInterface />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/verify/:productId" element={<VerifyProduct />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </Providers>
  );
}

export default App;
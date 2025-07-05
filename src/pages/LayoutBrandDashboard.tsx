import { Outlet } from "react-router-dom";
import Sidebar from "./Brand/Sidebar";
import Header from "@/components/Layout/Header";
import LoginCard from "@/components/Register/login-card";
import { useSignerStatus } from "@account-kit/react";
import Navbar from "@/components/Layout/Navbar";

const BrandLayout = () => {
  const signerStatus = useSignerStatus();

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <LoginCard cardDescription="Login to continue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blockchain-gradient flex w-full">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-screen z-50">
        <Sidebar />
      </div>

      {/* Main Content with left padding to make space for sidebar */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header userRole="brand" />
        <main className="flex-1 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;

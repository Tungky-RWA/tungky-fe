import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';
import { useSignerStatus } from "@account-kit/react";
import LoginCard from '@/components/Register/login-card';

const BrandLayout = () => {
  const signerStatus = useSignerStatus();

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <LoginCard cardDescription="Need to login first"/>
      </div>
    )
  }
  return (
    <div className="min-h-screen relative bg-blockchain-gradient flex w-full">
      <Sidebar pageType="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header userRole="brand" />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;

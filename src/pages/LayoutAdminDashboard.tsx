import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';
import { useSignerStatus, useSmartAccountClient  } from "@account-kit/react";
import LoginCard from '@/components/Register/login-card';
import { useReadHasRole } from '@/hooks/useHasRole';
import LoadingPage from '@/components/UI/loadingPage';

import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { MASTER_ABI } from '@/lib/masterAbi';
import { CONTRACT_TEMP, MASTER_ADDRESS, DEFAULT_ROLE_ADMIN } from '@/lib/constants';
import Navbar from '@/components/Layout/Navbar';

const BrandLayout = () => {
  const signerStatus = useSignerStatus();
  const { isLoadingClient, client } = useSmartAccountClient({});

  const { hasRole, isLoadingHasRole } = useReadHasRole({
    roleAddress: DEFAULT_ROLE_ADMIN,
    userAddress: client?.account?.address || "0x0"
  })

  console.log(isLoadingClient, isLoadingClient, signerStatus)

  if (isLoadingHasRole || (isLoadingClient && !signerStatus.isDisconnected)) {
    return <LoadingPage />;
  }
  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <LoginCard cardDescription="Login to continue"/>
      </div>
    )
  }
  
  
  if (!hasRole && signerStatus.isConnected) {
    
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <LoginCard cardDescription="You are not authorized to access this page"/>
      </div>
    )
  }
  return (

    <div className="min-h-screen bg-blockchain-gradient flex w-full">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-screen z-50">
        <Sidebar pageType="admin" />
      </div>

      {/* Main Content with left padding to make space for sidebar */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header userRole="admin" />
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

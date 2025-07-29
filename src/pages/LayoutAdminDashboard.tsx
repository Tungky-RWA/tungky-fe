import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';
import LoginCard from '@/components/Register/login-card';
import LoadingPage from '@/components/UI/loadingPage';

import { DEFAULT_ROLE_ADMIN, MASTER_ABI, MASTER_ADDRESS } from '@/lib/constants';
import Navbar from '@/components/Layout/Navbar';
import { useActiveAccount, useReadContract  } from "thirdweb/react";
import { client } from "@/config";
import { defineChain, getContract } from "thirdweb";

const contract = getContract({
  address: MASTER_ADDRESS,
  chain: defineChain(4202),
  client,
  abi: MASTER_ABI
});

const AdminLayout = () => {
  const activeAccount = useActiveAccount();

  const { data: hasRole, isLoading: isLoadingHasRole } = useReadContract({
    contract: contract,
    method: "hasRole",
    params: [DEFAULT_ROLE_ADMIN, activeAccount?.address || ""],
  });

  if (isLoadingHasRole) {
    return <LoadingPage />;
  }
  if (!activeAccount) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <LoginCard cardDescription="Login to continue"/>
      </div>
    )
  }
  
  
  if (!hasRole && activeAccount) {
    
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

export default AdminLayout;

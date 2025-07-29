import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';
import LoginCard from '@/components/Register/login-card';
import { useReadHasRole } from '@/hooks/useHasRole';
import LoadingPage from '@/components/UI/loadingPage';
import { useActiveAccount } from "thirdweb/react";
import Navbar from '@/components/Layout/Navbar';

import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { MASTER_ABI } from '@/lib/masterAbi';
import { CONTRACT_TEMP, MASTER_ADDRESS, DEFAULT_ROLE_ADMIN } from '@/lib/constants';
import { Toaster } from 'react-hot-toast';

const UserLayout = () => {
  const activeAccount = useActiveAccount();

  if (!activeAccount) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <LoginCard cardDescription="Login to continue"/>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-blockchain-gradient flex w-full">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-screen z-50">
        <Sidebar pageType="user" />
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
       <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: 'bg-background text-foreground border border-border',
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #333333'
          },
        }}
      />
    
    </div>
  );
};

export default UserLayout;

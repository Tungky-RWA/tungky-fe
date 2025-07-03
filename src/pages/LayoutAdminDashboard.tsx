import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';
import { useSignerStatus, useSmartAccountClient  } from "@account-kit/react";
import LoginCard from '@/components/Register/login-card';
// import { Alchemy } from "@alchemy/aa-core";

import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { MASTER_ABI } from '@/lib/masterAbi';
import { MASTER_ADDRESS } from '@/lib/constants';

const ADMIN_ROLE = import.meta.env.VITE_ADMIN_ROLE as `0x${string}`;

const BrandLayout = () => {
  const signerStatus = useSignerStatus();
  const { address, isLoadingClient, client } = useSmartAccountClient({});
  console.log(client?.account?.address)

  console.log(address, isLoadingClient)

  // const { data: hasRole, isLoading } = useQuery({
  //   queryKey: ['hasRole', client?.account?.address],
  //   enabled: !!client?.account?.address,
  //   queryFn: async () => {
  //     const result = await client!.readContract({
  //       address: MASTER_ADDRESS,
  //       abi: MASTER_ABI,
  //       functionName: 'hasRole',
  //       args: ['0x0000000000000000000000000000000000000000000000000000000000000000', '0x26F7384F8f2e80035c6bF0f1c40D0B69f7021Be2'],
  //     });

  //     return result as boolean;
  //   },
  // });

  // console.log(hasRole, isLoading, "TESTTTT")

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <LoginCard cardDescription="Login to continue"/>
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

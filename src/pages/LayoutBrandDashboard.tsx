import { Outlet } from "react-router-dom";
import Sidebar from "./Brand/Sidebar";
import Header from "@/components/Layout/Header";
import LoginCard from "@/components/Register/login-card";
import { useSignerStatus } from "@account-kit/react";
import { useSmartAccountClient } from "@account-kit/react";
import { useReadbrandIds } from "@/hooks/useReadBrandIds";
import { useReadbrandMetadata } from "@/hooks/useGetBrandUri";

const BrandLayout = () => {
  const signerStatus = useSignerStatus();
  const { client } = useSmartAccountClient({});

  const { brandIds } = useReadbrandIds({
    brandAddress: client?.account?.address,
  });

  const { metaData } = useReadbrandMetadata({
    brandTokenId: String(brandIds),
  });

  console.log(metaData, "metadata");

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <LoginCard cardDescription="Login to continue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blockchain-gradient flex w-full">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-screen z-50">
        <Sidebar metadata={metaData} />
      </div>

      {/* Main Content with left padding to make space for sidebar */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header userRole="brand" />
        <main className="flex-1 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet context={metaData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;

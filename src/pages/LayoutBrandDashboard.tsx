import { Outlet } from "react-router-dom";
import Sidebar from "./Brand/Sidebar";
import Header from "@/components/Layout/Header";
import LoginCard from "@/components/Register/login-card";
import { useSignerStatus, useSmartAccountClient } from "@account-kit/react";
import Navbar from "@/components/Layout/Navbar";
import { useBrandRole } from "@/hooks/useHasRole";
import CardCustom from "@/components/UI/CardCustom";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import LoadingPage from "@/components/UI/loadingPage";
import { useBrandNFTS } from "@/hooks/useGetBrandNFTS";
import { useEffect } from "react";
import { useActiveAccount, useReadContract  } from "thirdweb/react";
import { client } from "@/config";
import { defineChain, getContract } from "thirdweb";
import { FACTORY_ABI, FACTORY_ADDRESS, METADATA_ABI, METADATA_ADDRESS } from "@/lib/constants";

const contract = getContract({
  address: METADATA_ADDRESS,
  chain: defineChain(4202),
  client,
  abi: METADATA_ABI
});

const contractFactory = getContract({
  address: FACTORY_ADDRESS,
  chain: defineChain(4202),
  client,
  abi: FACTORY_ABI
});

const BrandLayout = () => {
  const activeAccount = useActiveAccount();
  // const { data: dataBrandRole, isLoading: isLoadingBrandRole } = useBrandRole();

  // const { brandIds } = useReadbrandIds({
  //   brandAddress: client?.account?.address,
  // });

  const { data: dataBrandRole, isLoading: isLoadingBrandRole } = useReadContract({
    contract: contractFactory,
    method: "getBrandNFTContractAddress",
    params: [activeAccount?.address || ""],
  });

  const { data: brandIds, isLoading: isLoadingBrandIds } = useReadContract({
    contract: contract,
    method: "brandIds",
    params: [activeAccount?.address || ""],
  });
  
  console.log(brandIds, 'woi hasrole')
  
  const { data: metaData, isLoading: isLoadingMetadata } = useReadContract({
    contract: contract,
    method: "tokenURI",
    params: [brandIds || 0n],
  });

  console.log(dataBrandRole, "metadatatest");

  const { data, refetch } = useBrandNFTS(dataBrandRole);

  console.log(data, "data");

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoadingBrandRole) {
    return <LoadingPage />;
  }

  if (!activeAccount) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar />
        <LoginCard cardDescription="Login to continue" />
      </div>
    );
  }
  //@ts-ignore
  if (dataBrandRole?.includes("0x000000")) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar />
        <CardCustom>
          <CardHeader className={cn("text-center space-y-4 pb-8")}>
            <CardTitle
              className={cn(
                "text-4xl font-bold blockchain-gradient animate-glow",
                "dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              )}
            >
              BRAND REGISTER
            </CardTitle>
            <CardDescription className={cn("text-muted-foreground text-lg")}>
              You need to register as a brand to continue
            </CardDescription>
          </CardHeader>

          <CardContent className={cn("space-y-6 pb-8")}>
            <Link to="/register">
              <ButtonCustom
                variant="crypto"
                className="w-full mt-4 border border-border/30 hover:border-primary/50"
              >
                Register Now
              </ButtonCustom>
            </Link>
          </CardContent>
        </CardCustom>
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
            <Outlet context={data} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;

import { Outlet } from "react-router-dom";
import Sidebar from "./Brand/Sidebar";
import Header from "@/components/Layout/Header";
import LoginCard from "@/components/Register/login-card";
import { useSignerStatus, useSmartAccountClient } from "@account-kit/react";
import Navbar from "@/components/Layout/Navbar";
import { useBrandRole } from "@/hooks/useHasRole";
import CardCustom from "@/components/UI/CardCustom";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import LoadingPage from "@/components/UI/loadingPage";
import { useReadbrandIds } from "@/hooks/useReadBrandIds";
import { useReadbrandMetadata } from "@/hooks/useGetBrandUri";
import { useBrandNFTS } from "@/hooks/useGetBrandNFTS";

const BrandLayout = () => {
  const { isLoadingClient } = useSmartAccountClient({});
  const { data: dataBrandRole, isLoading: isLoadingBrandRole } = useBrandRole();
  const signerStatus = useSignerStatus();
  const { client } = useSmartAccountClient({});

  const { brandIds } = useReadbrandIds({
    brandAddress: client?.account?.address,
  });

  const { metaData } = useReadbrandMetadata({
    brandTokenId: String(brandIds),
  });

  console.log(metaData, "metadata");

  const { data, refetch, isLoading, isFetching, error } = useBrandNFTS();

  if (isLoadingBrandRole || (isLoadingClient && !signerStatus.isDisconnected)) {
    return <LoadingPage />;
  }

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar />
        <LoginCard cardDescription="Login to continue" />
      </div>
    );
  }

  if (dataBrandRole?.includes('0x000000')) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <Navbar/>
        <CardCustom>
          <CardHeader className={cn("text-center space-y-4 pb-8")}>
            <CardTitle
              className={cn(
                "text-4xl font-bold blockchain-gradient animate-glow",
                "dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
              )}
            >
              BRAND REGISTER
            </CardTitle>
            <CardDescription
              className={cn("text-muted-foreground text-lg")}
            >
              You need to register as a brand to continue
            </CardDescription>
          </CardHeader>

          <CardContent className={cn("space-y-6 pb-8")}>
            <Link to="/register">
              <ButtonCustom variant="crypto" className="w-full mt-4 border border-border/30 hover:border-primary/50">
                Register Now
              </ButtonCustom>
            </Link>
          </CardContent>
        </CardCustom>
      </div>
    )
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

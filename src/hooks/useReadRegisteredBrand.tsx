import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { CONTRACT_ABI } from "@/lib/constants";

interface UseReadNFTUriParams {
  contractAddress?: Address;
  ownerAddress?: Address;
}

interface BrandInfoReturn {
  brandWallet: string;
  isActive: boolean;
  isLegalVerified: boolean;
  name: string;
  nftContractAddress: string;
  nftSymbol: string;
  registrationTimestamp: bigint
}

export const useReadBrandData = (props: UseReadNFTUriParams) => {
  const { contractAddress, ownerAddress } = props;

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data: brandInfo,
    isLoading: isLoadingBrandInfo,
    error: brandInfoError,
    refetch: refetchBrandInfo,
  } = useQuery<
    BrandInfoReturn | undefined,
    Error,
    BrandInfoReturn | undefined,
    readonly unknown[]
  >({
    queryKey: ["brandInfo", contractAddress, ownerAddress, client?.chain?.id],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!contractAddress) {
        throw new Error("Contract address is not defined for queryFn.");
      }
      if (!ownerAddress) {
        throw new Error("Owner address is not defined for queryFn.");
      }
      const info = await client.readContract({
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: "getBrandInfo",
        args: [ownerAddress],
      });
      return info;
      
    },
    
    enabled: !!client && !!contractAddress && !!ownerAddress,
  });

  return {
    brandInfo,
    isLoading: isLoadingBrandInfo,
    isLoadingBrandInfo,
    error: brandInfoError,
    brandInfoError,
    refetchBrandInfo,
  };
};

import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { METADATA_ABI } from "@/lib/constants";
import { METADATA_ADDRESS } from "@/lib/constants";

interface UseReadBrandIdsParams {
  brandAddress?: Address;
}

interface BrandIdsReturn {
  brandWallet: string;
  isActive: boolean;
  isLegalVerified: boolean;
  name: string;
  nftContractAddress: string;
  nftSymbol: string;
  registrationTimestamp: bigint;
}

export const useReadbrandIds = (props: UseReadBrandIdsParams) => {
  const { brandAddress } = props;

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data: brandIds,
    isLoading: isLoadingBrandInfo,
    error: brandInfoError,
    refetch: refetchBrandInfo,
  } = useQuery<
    BrandIdsReturn | undefined,
    Error,
    BrandIdsReturn | undefined,
    readonly unknown[]
  >({
    queryKey: ["brandIds", brandAddress, client?.chain?.id],
    //@ts-ignore
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!brandAddress) {
        throw new Error("Brand address is not defined for queryFn.");
      }
      const info = await client.readContract({
        address: METADATA_ADDRESS,
        abi: METADATA_ABI,
        functionName: "brandIds",
        args: [brandAddress],
      });
      return info;
    },

    enabled: !!client && !!brandAddress,
  });

  return {
    brandIds,
    isLoading: isLoadingBrandInfo,
    isLoadingBrandInfo,
    error: brandInfoError,
    brandInfoError,
    refetchBrandInfo,
  };
};

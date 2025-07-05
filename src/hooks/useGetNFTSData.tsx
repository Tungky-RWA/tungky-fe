import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { NFTBRAND_ABI } from "@/lib/constants";

interface UseReadNFTUriParams {
  contractAddress?: Address;
  tokenid?: string;
}

interface BrandInfoReturn {
  brandWallet: string;
  isActive: boolean;
  isLegalVerified: boolean;
  name: string;
  nftContractAddress: string;
  nftSymbol: string;
  registrationTimestamp: bigint;
}

export const useReadNFTData = (props: UseReadNFTUriParams) => {
  const { contractAddress, tokenid } = props;

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data: nftdata,
    isLoading: isLoadingBrandInfo,
    error: brandInfoError,
    refetch: refetchNftInfo,
  } = useQuery<
    BrandInfoReturn | undefined,
    Error,
    BrandInfoReturn | undefined,
    readonly unknown[]
  >({
    queryKey: ["nftInfo", contractAddress, tokenid, client?.chain?.id],
    //@ts-ignore
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!contractAddress) {
        throw new Error("Contract address is not defined for queryFn.");
      }
      if (!tokenid) {
        throw new Error("TokenId is not defined for queryFn.");
      }
      const info = await client.readContract({
        address: contractAddress,
        abi: NFTBRAND_ABI,
        functionName: "tokenURI",
        args: [tokenid],
      });
      return info;
    },

    enabled: !!client && !!contractAddress && !!tokenid,
  });

  return {
    nftdata,
    isLoading: isLoadingBrandInfo,
    isLoadingBrandInfo,
    error: brandInfoError,
    brandInfoError,
    refetchNftInfo,
  };
};

import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { METADATA_ABI } from "@/lib/constants";
import { METADATA_ADDRESS } from "@/lib/constants";

interface UseReadBrandMetadataParams {
  nftTokenId?: any;
}

interface BrandMetadataReturn {
  brandWallet: string;
  isActive: boolean;
  isLegalVerified: boolean;
  name: string;
  nftContractAddress: string;
  nftSymbol: string;
  registrationTimestamp: bigint;
}

export const useReadbrandMetadata = (props: UseReadBrandMetadataParams) => {
  const { nftTokenId } = props;

  // console.log(brandTokenId, "brandTokenId");

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data: nftUri,
    isLoading: isLoadingBrandInfo,
    error: brandInfoError,
    refetch: refetchBrandInfo,
  } = useQuery<
    BrandMetadataReturn | undefined,
    Error,
    BrandMetadataReturn | undefined,
    readonly unknown[]
  >({
    queryKey: ["tokenURIbrand", nftTokenId, client?.chain?.id],
    //@ts-ignore
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!nftTokenId) {
        throw new Error("NFT tokenId is not defined for queryFn.");
      }
      const info = await client.readContract({
        address: METADATA_ADDRESS,
        abi: METADATA_ABI,
        functionName: "tokenURI",
        args: [nftTokenId],
      });

      const res = await fetch(info);
      const json = await res.json();
      return json;
    },

    enabled: !!client && !!nftTokenId,
  });

  return {
    nftUri,
    isLoading: isLoadingBrandInfo,
    isLoadingBrandInfo,
    error: brandInfoError,
    brandInfoError,
    refetchBrandInfo,
  };
};

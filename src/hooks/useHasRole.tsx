import { useSmartAccountClient } from "@account-kit/react";
import { useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS, FACTORY_ABI, FACTORY_ADDRESS, MASTER_ABI, MASTER_ADDRESS } from "@/lib/constants";

interface UseHasRoleParams {
  roleAddress?: Address;
  userAddress?: Address;
}

export const useBrandRole = () => {

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<boolean>({
    queryKey: ["getBrandNFTContractAddress", client?.chain?.id],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      const info = await client.readContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: "getBrandNFTContractAddress",
        args: [client?.account?.address],
      });
      console.log(info, 'woi info')
      return info;
    },
    refetchOnWindowFocus: false,
    enabled: !!client,
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
};

export const useReadHasRole = (props: UseHasRoleParams) => {
  const { roleAddress, userAddress } = props;

  const { client } = useSmartAccountClient({});

  // Query for NFT count
  const {
    data: hasRole,
    isLoading: isLoadingHasRole,
    error: brandHasRoleError,
    refetch: refetchHasRole,
  } = useQuery<boolean>({
    queryKey: ["hasRole", roleAddress, userAddress, client?.chain?.id],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!roleAddress) {
        throw new Error("Role address is not defined for queryFn.");
      }
      if (!userAddress) {
        throw new Error("Owner address is not defined for queryFn.");
      }
      const info = await client.readContract({
        address: MASTER_ADDRESS,
        abi: MASTER_ABI,
        functionName: "hasRole",
        args: [roleAddress, userAddress],
      });
      
      return info;
    },
    refetchOnWindowFocus: false,
    enabled: !!client && !!roleAddress && !!userAddress,
  });

  return {
    hasRole,
    isLoading: isLoadingHasRole,
    isLoadingHasRole,
    error: brandHasRoleError,
    brandHasRoleError,
    refetchHasRole,
  };
};

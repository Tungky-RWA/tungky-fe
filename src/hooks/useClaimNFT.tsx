import { useCallback, useMemo, useState } from "react";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { encodeFunctionData, type Address } from "viem";
import { NFTBRAND_ABI } from "@/lib/constants";
import toast from "react-hot-toast";
import axios from "axios";

export interface useClaimNFT {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  contractAddress?: Address;
  ownerAddress?: Address;
}

export interface useClaimNFTReturn {
  preMint: (
    serialNumber: string,
    uri: URL,
    brandAddress: `0x${string}`
  ) => void;
  updatePreMint: (
    oldSerialNumber: string,
    newSerialNumber: string,
    uri: URL,
    brandAddress: `0x${string}`
  ) => void;
  mutation: any;
  claimNFT: (
    tokenId: string | null,
    to: `0x${string}`,
    contractAddress: `0x${string}`
  ) => void;
  transactionUrl?: string;
  error?: string;
}

export interface useVerificationParams {
  contractAddress: Address;
  tokenId: string | null;
  client: any;
  enabled?: boolean;
}

// const infoMinted = await client.readContract({
//         address: contractAddress,
//         abi: NFTBRAND_ABI,
//         functionName: "tokenURI",
//         args: [tokenId],
//       });

// const ownerOf = await client.readContract({
//   address: contractAddress,
//   abi: NFTBRAND_ABI,
//   functionName: "ownerOf",
//   args: [tokenId],
// });

export const useOwner = ({
  tokenId,
  contractAddress,
}: useVerificationParams) => {
  const { client } = useSmartAccountClient({});
  const { data, isLoading, isError, refetch } = useQuery<
    string | undefined,
    Error,
    string | undefined,
    readonly unknown[]
  >({
    queryKey: ["ownerOf", contractAddress, tokenId],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!contractAddress) {
        throw new Error("Contract Address is not defined for queryFn");
      }
      if (!tokenId) {
        throw new Error("tokenId is not defined for queryFn.");
      }

      const infoOwner = await client.readContract({
        address: contractAddress,
        abi: NFTBRAND_ABI,
        functionName: "ownerOf",
        args: [tokenId],
      });

      return infoOwner;
    },

    enabled: !!client && !!contractAddress && !!tokenId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export const useInfoMinted = ({
  tokenId,
  contractAddress,
  enabled = true,
}: useVerificationParams) => {
  const { client } = useSmartAccountClient({});
  const { data, isLoading, isError, refetch } = useQuery<
    string | undefined,
    Error,
    string | undefined,
    readonly unknown[]
  >({
    queryKey: ["infoMinted", contractAddress, tokenId],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!contractAddress) {
        throw new Error("Contract Address is not defined for queryFn");
      }
      if (!tokenId) {
        throw new Error("tokenId is not defined for queryFn.");
      }

      const infoMinted = await client.readContract({
        address: contractAddress,
        abi: NFTBRAND_ABI,
        functionName: "tokenURI",
        args: [tokenId],
      });

      return infoMinted;
    },

    enabled: enabled && !!client && !!contractAddress && !!tokenId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export const useVerification = ({
  tokenId,
  contractAddress,
  client,
}: useVerificationParams) => {
  const { data, isLoading, isError, refetch } = useQuery<
    string | undefined,
    Error,
    string | undefined,
    readonly unknown[]
  >({
    queryKey: ["preMints", contractAddress, client?.chain?.id, tokenId],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }
      if (!contractAddress) {
        throw new Error("Contract Address is not defined for queryFn");
      }
      if (!tokenId) {
        throw new Error("tokenId is not defined for queryFn.");
      }

      const _tokenId = BigInt(tokenId);

      const info = await client.readContract({
        address: contractAddress,
        abi: NFTBRAND_ABI,
        functionName: "preMints",
        args: [_tokenId],
      });

      return info;
    },

    enabled: !!client && !!contractAddress && !!tokenId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export const useClaimNFT = ({
  onSuccess,
  contractAddress,
  ownerAddress,
}: useClaimNFT): useClaimNFTReturn => {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  const [error, setError] = useState<string>();

  const { client } = useSmartAccountClient({});

  const handleSuccess = () => {
    setIsRegistering(false);
    setError(undefined);
    onSuccess?.();
  };

  const handleError = (error: Error) => {
    console.error("Mint error:", error);
    setIsRegistering(false);
    toast.dismiss();
    toast.error(error.message || "Failed to mint NFT");
    setError(error.message || "Failed to mint NFT");
  };

  const { sendUserOperationResult, sendUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onError: handleError,
    onSuccess: handleSuccess,
    onMutate: () => {
      setIsRegistering(true);
      toast.loading("Waiting...");
      setError(undefined);
    },
  });

  const mutation = useMutation({
    mutationFn: (body: {
      tokenId: any;
      to: `0x${string}`;
      contractAddress: `0x${string}`;
    }) => {
      return axios.post("http://blockdev.aone.my.id:42070/api/claim-nft", body);
    },
    onMutate: () => {
      toast.loading("claiming nft...");
    },
    onSuccess,
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  const claimNFT = useCallback(
    async (
      tokenId: string | null,
      to: `0x${string}`,
      contractAddress: `0x${string}`
    ) => {
      if (!client) {
        setError("Wallet not connected");
        return;
      }

      const body = {
        tokenId,
        contractAddress,
        to,
      };

      mutation.mutate(body);
    },
    [mutation]
  );

  const updatePreMint = useCallback(
    async (
      oldSerialNumber: string,
      newSerialNumber: string,
      uri: URL,
      brandAddress: `0x${string}`
    ) => {
      if (!client) {
        setError("Wallet not connected");
        return;
      }
      sendUserOperation({
        uo: {
          target: brandAddress,
          data: encodeFunctionData({
            abi: NFTBRAND_ABI,
            functionName: "updatePreMint",
            args: [oldSerialNumber, newSerialNumber, uri],
          }),
        },
      });
    },
    [client, sendUserOperation]
  );

  const transactionUrl = useMemo(() => {
    if (!client?.chain?.blockExplorers || !sendUserOperationResult?.hash) {
      return undefined;
    }
    return `${client.chain.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`;
  }, [client, sendUserOperationResult?.hash]);

  return {
    claimNFT,
    mutation,
    updatePreMint,
    transactionUrl,
    error,
  };
};

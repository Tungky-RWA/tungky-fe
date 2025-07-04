import { useCallback, useMemo, useState } from "react";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { NFTBRAND_ABI } from "@/lib/constants";
import toast from 'react-hot-toast';

export interface usePremintParams {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export interface usePreMintParamsReturn {
  isPreMint: boolean;
  preMint: (serialNumber: string, uri: string, brandAddress: `0x${string}`) => void;
  updatePreMint: (oldSerialNumber: string, newSerialNumber: string, uri: URL, brandAddress: `0x${string}`) => void;
  transactionUrl?: string;
  error?: string;
}

export const usePreMint = ({ onSuccess }: usePremintParams): usePreMintParamsReturn => {
  const [isPreMint, setIsRegistering] = useState(false);
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
    toast.error(error.message || "Failed to mint NFT")
    setError(error.message || "Failed to mint NFT");
  };

  const { sendUserOperationResult, sendUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onError: handleError,
    onSuccess: handleSuccess,
    onMutate: () => {
      setIsRegistering(true);
      toast.loading('Waiting...');
      setError(undefined);
    },
  });

  const preMint = useCallback(async (serialNumber: string, uri: string, brandAddress: `0x${string}`) => {
    if (!client) {
      setError("Wallet not connected");
      return;
    }

    sendUserOperation({
      uo: {
        target: brandAddress,
        data: encodeFunctionData({
          abi: NFTBRAND_ABI,
          functionName: "preMint",
          args: [serialNumber, uri],
        }),
      },
    });
  }, [client, sendUserOperation]);

  const updatePreMint = useCallback(async (oldSerialNumber: string, newSerialNumber: string, uri: URL, brandAddress: `0x${string}`) => {
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
  }, [client, sendUserOperation]);

  const transactionUrl = useMemo(() => {
    if (!client?.chain?.blockExplorers || !sendUserOperationResult?.hash) {
      return undefined;
    }
    return `${client.chain.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`;
  }, [client, sendUserOperationResult?.hash]);

  return {
    isPreMint,
    updatePreMint,
    preMint,
    transactionUrl,
    error,
  };
};

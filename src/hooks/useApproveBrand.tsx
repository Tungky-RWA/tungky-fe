import { useCallback, useMemo, useState } from "react";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/constants";
import toast from 'react-hot-toast';

export interface useApproveBrandParams {
  onSuccess?: () => void;
}
export interface useRegisterBrandReturn {
  isLegalVerified: boolean;
  handleApproveBrand: (brandName: string, nftSymbol: string, brandWallet: `0x${string}`) => void;
  approveRegisteredBrand: (brandWallet: `0x${string}`) => void;
  transactionUrl?: string;
  error?: string;
}

export const useUpproveBrand = ({ onSuccess }: useApproveBrandParams): useRegisterBrandReturn => {
  const [isRegistering, setIsRegistering] = useState(false);
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

  const approveRegisteredBrand = useCallback(async (brandWallet: `0x${string}`) => {
    if (!client) {
      setError("Wallet not connected");
      return;
    }


    sendUserOperation({
      uo: {
        target: CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: CONTRACT_ABI,
          functionName: "updateBrandLegalStatus",
          args: [brandWallet, true],
        }),
      },
    });
  }, [client, sendUserOperation]);

  const handleRegisterBrand = useCallback(async (brandName: string, brandSymbol: string, brandWallet: `0x${string}`) => {
    if (!client) {
      setError("Wallet not connected");
      return;
    }
    sendUserOperation({
      uo: {
        target: CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: CONTRACT_ABI,
          functionName: "registerBrand",
          args: [brandName, brandSymbol, brandWallet],
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
    isRegistering,
    handleRegisterBrand,
    approveRegisteredBrand,
    transactionUrl,
    error,
  };
};

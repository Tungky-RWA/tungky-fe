import { useCallback, useMemo, useState } from "react";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { nftBrandAbi } from "@/lib/nftBrand";
import toast from 'react-hot-toast'

export interface useTransferNFTParams {
  onSuccess?: () => void;
}
export interface useTransferReturn {
  isMinting: boolean;
  handleTransfer: (contractAddress: `0x${string}`, to: `0x${string}`, tokenId: string) => void;
  transactionUrl?: string;
  error?: string;
}

export const useTransfer = ({ onSuccess }: useTransferNFTParams): useTransferReturn => {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string>();

  const { client } = useSmartAccountClient({});

  const handleSuccess = () => {
    setIsMinting(false);
    setError(undefined);
    onSuccess?.();
  };

  const handleError = (error: Error) => {
    toast.dismiss();
    console.error("Mint error:", error);
    setIsMinting(false);
    setError(error.message || "Failed to mint NFT");
    toast.error(error.message)
  };

  const { sendUserOperationResult, sendUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onError: handleError,
    onSuccess: handleSuccess,
    onMutate: () => {
      setIsMinting(true);
      setError(undefined);
      toast.loading('transfering')
    },
  });

  const handleTransfer = useCallback(async (contractAddress: `0x${string}`, to: `0x${string}`, tokenId: string) => {
    if (!client) {
      setError("Wallet not connected");
      return;
    }

    // Alamat Smart Wallet pengguna yang sedang aktif
    const smartWalletAddress = client.getAddress()
      // Kirim UserOperation dengan DUA instruksi (batch transaction)
      sendUserOperation({
        // Perhatikan di sini, kita mengirim array dari UserOperation
        uo: [
          // 1. Instruksi pertama: Approve
          {
            target: contractAddress,
            data: encodeFunctionData({
              abi: nftBrandAbi,
              functionName: "approve",
              // args: [to, tokenId]
              // Smart Wallet Anda memberikan izin kepada dirinya sendiri untuk memindahkan token.
              // Dalam beberapa implementasi AA, Anda mungkin perlu approve ke EntryPoint.
              // Namun, umumnya approve ke alamat smart wallet itu sendiri sudah cukup.
              args: [to, BigInt(tokenId)], //masih hardcode bro
            }),
            value: BigInt(0), // Tidak mengirim nilai/ETH
          },
          // 2. Instruksi kedua: Transfer
          {
            target: contractAddress,
            data: encodeFunctionData({
              abi: nftBrandAbi,
              functionName: "transferFrom",
              // args: [from, to, tokenId]
              args: [smartWalletAddress, to, BigInt(tokenId)],
            }),
            value: BigInt(0), // Tidak mengirim nilai/ETH
          },
        ],
      });
  }, [client, sendUserOperation]);

  const transactionUrl = useMemo(() => {
    if (!client?.chain?.blockExplorers || !sendUserOperationResult?.hash) {
      return undefined;
    }
    return `${client.chain.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`;
  }, [client, sendUserOperationResult?.hash]);

  return {
    isMinting,
    handleTransfer,
    transactionUrl,
    error,
  };
};

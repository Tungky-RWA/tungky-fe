import { useSmartAccountClient } from "@account-kit/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { NFTBRAND_ABI } from "@/lib/constants";

// Tipe data untuk NFT item
interface NFTItem {
  NftContractAddress: string;
  blockNumber: string;
  blockTimestamp: string;
  latitude: null;
  logIndex: string;
  longitude: null;
  ownerAddress: string;
  status: string;
  tokenId: string;
  transactionHash: string;
}

// Tipe data untuk NFT dengan URI
interface NFTWithURI extends NFTItem {
  uri?: string;
  uriLoading?: boolean;
  uriError?: Error;
}

// Hook untuk mendapatkan URI dari single NFT
const useNFTUri = (contractAddress: Address, tokenId: string) => {
  const { client } = useSmartAccountClient({});

  return useQuery({
    queryKey: ["nftUri", contractAddress, tokenId, client?.chain?.id],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }

      const uri = await client.readContract({
        address: contractAddress,
        abi: NFTBRAND_ABI,
        functionName: "tokenURI",
        args: [tokenId],
      });

      return uri as string;
    },
    enabled: !!client && !!contractAddress && !!tokenId,
    staleTime: 1000 * 60 * 5, // 5 menit cache
  });
};

// Hook utama untuk mendapatkan URI dari array NFT
export const useNFTsWithURIs = (nftArray: NFTItem[]) => {
  const { client } = useSmartAccountClient({});

  // Menggunakan useQueries untuk fetch multiple URI sekaligus
  const queries = useQueries({
    queries: nftArray.map((nft) => ({
      queryKey: [
        "nftUri",
        nft.NftContractAddress,
        nft.tokenId,
        client?.chain?.id,
      ],
      queryFn: async () => {
        if (!client) {
          throw new Error("Smart account client not ready");
        }

        const uri = await client.readContract({
          address: nft.NftContractAddress as Address,
          abi: NFTBRAND_ABI,
          functionName: "tokenURI",
          args: [nft.tokenId],
        });

        return {
          ...nft,
          uri: uri as string,
        };
      },
      enabled: !!client && !!nft.NftContractAddress && !!nft.tokenId,
      staleTime: 1000 * 60 * 5, // 5 menit cache
    })),
  });

  // Menggabungkan hasil dengan status loading/error
  const nftsWithURIs: NFTWithURI[] = nftArray.map((nft, index) => {
    const query = queries[index];
    return {
      ...nft,
      uri: query.data?.uri,
      uriLoading: query.isLoading,
      uriError: query.error,
    };
  });

  const isLoadingAny = queries.some((query) => query.isLoading);
  const isLoadingAll = queries.every((query) => query.isLoading);
  const hasErrors = queries.some((query) => query.error);

  return {
    nftsWithURIs,
    isLoadingAny,
    isLoadingAll,
    hasErrors,
    queries, // Jika butuh akses langsung ke queries
  };
};

// Contoh penggunaan dalam component
const NFTListComponent = () => {
  // Contoh data array NFT
  const nftData: NFTItem[] = [
    {
      NftContractAddress: "0x05c390e812811a54543b74c82644375cde176616",
      blockNumber: "24775974",
      blockTimestamp: "1751704872",
      latitude: null,
      logIndex: "26",
      longitude: null,
      ownerAddress: "0x0000000000000000000000000000000000000000",
      status: "premint",
      tokenId:
        "56096340643174778558965722232081637579601833530593697721142208680959773063887",
      transactionHash: "0xcf5808561ab09fa",
    },
    // ... more NFT items
  ];

  const { nftsWithURIs, isLoadingAny, hasErrors } = useNFTsWithURIs(nftData);

  if (isLoadingAny) {
    return <div>Loading NFT URIs...</div>;
  }

  return (
    <div>
      <h2>NFT List with URIs</h2>
      {nftsWithURIs.map((nft, index) => (
        <div
          key={`${nft.NftContractAddress}-${nft.tokenId}`}
          style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
        >
          <p>
            <strong>Contract:</strong> {nft.NftContractAddress}
          </p>
          <p>
            <strong>Token ID:</strong> {nft.tokenId}
          </p>
          <p>
            <strong>Status:</strong> {nft.status}
          </p>

          {nft.uriLoading && <p>Loading URI...</p>}
          {nft.uriError && (
            <p style={{ color: "red" }}>
              Error loading URI: {nft.uriError.message}
            </p>
          )}
          {nft.uri && (
            <p>
              <strong>URI:</strong> {nft.uri}
            </p>
          )}
        </div>
      ))}

      {hasErrors && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Some URIs failed to load. Check individual items for details.
        </div>
      )}
    </div>
  );
};

// Alternative: Hook untuk fetch URI satu per satu (sequential)
export const useNFTsWithURIsSequential = (nftArray: NFTItem[]) => {
  const { client } = useSmartAccountClient({});

  return useQuery({
    queryKey: [
      "nftsWithURIs",
      nftArray.map((nft) => nft.tokenId).join(","),
      client?.chain?.id,
    ],
    queryFn: async () => {
      if (!client) {
        throw new Error("Smart account client not ready");
      }

      const results: NFTWithURI[] = [];

      for (const nft of nftArray) {
        try {
          const uri = await client.readContract({
            address: nft.NftContractAddress as Address,
            abi: NFTBRAND_ABI,
            functionName: "tokenURI",
            args: [nft.tokenId],
          });

          results.push({
            ...nft,
            uri: uri as string,
          });
        } catch (error) {
          results.push({
            ...nft,
            uriError: error as Error,
          });
        }
      }

      return results;
    },
    enabled: !!client && nftArray.length > 0,
    staleTime: 1000 * 60 * 5, // 5 menit cache
  });
};

export default NFTListComponent;

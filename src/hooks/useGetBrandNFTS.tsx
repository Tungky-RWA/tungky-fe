import { useQuery } from "@tanstack/react-query";

const fetchBrandNFTS = async (contractBrand: any) => {
  const res = await fetch(import.meta.env.VITE_PONDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
       query MyQuery {
        nfts(
          orderDirection: "desc"
          orderBy: "blockTimestamp"
          where: {NftContractAddress: "${contractBrand}"}
        ) {
          totalCount
          items {
            NftContractAddress
            blockTimestamp
            blockNumber
            latitude
            logIndex
            longitude
            ownerAddress
            status
            tokenId
            transactionHash
            brand {
              BrandWalletAddress
              NftContractAddress
              name
            }
          }
        }
      }
      `,
    }),
  });

  const response = await res.json();
  // console.log("GraphQL Response:", response?.data?.nfts); // 🔍 DEBUG

  if (response.errors) {
    console.error("❌ GraphQL Error:", response.errors);
    throw new Error("GraphQL query error");
  }

  return response?.data?.nfts; // ✅ return final
};

export const useBrandNFTS = (contractBrand: any) => {
  return useQuery({
    queryKey: ["brandNFTS", contractBrand],
    queryFn: () => fetchBrandNFTS(contractBrand),
    enabled: !!contractBrand,
  });
};

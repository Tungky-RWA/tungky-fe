import { useQuery } from "@tanstack/react-query";

const fetchUserNFTS = async (userContractAddress: string) => {
  const res = await fetch(import.meta.env.VITE_PONDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query MyQuery {
          nfts(
            orderDirection: "desc"
            orderBy: "blockTimestamp"
            where: {ownerAddress: "${userContractAddress}"}
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
  console.log("GraphQL Response:", response); // 🔍 DEBUG

  if (response.errors) {
    console.error("❌ GraphQL Error:", response.errors);
    throw new Error("GraphQL query error");
  }

  return response.data; // ✅ return final
};

export const useUserNFTS = (userContractAddress: string) => {
  return useQuery({
    queryKey: ["userNFTS"],
    //@ts-ignore
    queryFn: () => fetchUserNFTS(userContractAddress),
  });
};

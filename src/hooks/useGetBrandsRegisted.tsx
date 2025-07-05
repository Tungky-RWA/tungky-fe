import { useQuery } from '@tanstack/react-query';

const fetchBrandRegisted = async () => {
  const res = await fetch(import.meta.env.VITE_PONDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetVerifiedAndUnverifiedBrands {
          verifiedBrands: brands(where: {verified: true}) {
            totalCount
            items {
              name
              verified
              BrandWalletAddress
              blockNumber
              transactionHash
              blockNumber
              blockTimestamp
            }
          }

          unverifiedBrands: brands(where: {verified: false}) {
            totalCount
            items {
              name
              verified
              BrandWalletAddress
              blockNumber
              transactionHash
              blockNumber
              blockTimestamp
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
}

export const useBrandRegisted = () => {
  return useQuery({
    queryKey: ['brandRegisted'],
    queryFn: fetchBrandRegisted,
  });
};

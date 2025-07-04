// // src/hooks/useSmartAccount.ts

// import { useEffect, useState } from 'react';
// import { createSmartAccountClient } from '@alchemy/aa-core';
// import { GoogleAuth } from '@alchemy/aa-auth';
// import { http } from 'viem';
// import { sepolia } from 'viem/chains';

// export const useSmartAccount = () => {
//   const [client, setClient] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const auth = new GoogleAuth({
//     clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
//   });

//   useEffect(() => {
//     const init = async () => {
//       const isRestored = await auth.restore(); // ✅ ini penting
//       if (isRestored) {
//         const smartClient = await createSmartAccountClient({
//           chain: sepolia,
//           transport: http(),
//           auth,
//         });
//         setClient(smartClient);
//       }
//       setLoading(false);
//     };
//     init();
//   }, []);

//   return { client, loading, auth };
// };

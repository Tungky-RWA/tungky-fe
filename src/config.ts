import { createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { alchemy, baseSepolia } from "@account-kit/infra";
import { createThirdwebClient } from "thirdweb";

export const config = createConfig(
  {
    // signerConnection: signer,
    transport: alchemy({ apiKey: "HNCmzdMfqwxh_eIJAK9xKUALn1uFE2uh" }), // Replace with your API key
    chain: baseSepolia,
    // ssr: true,
    enablePopupOauth: true,
    policyId: "b15b8944-958b-452a-8489-ee01ff09f92e",
    sessionConfig: {
      expirationTimeMs: 86400000,
      sessionKey: "HNCmzdMfqwxh_eIJAK9xKUALn1uFE2uh"
    }
  },
  {
    auth: {
      sections: [
        [{ type: "email" }],
        [
          { type: "passkey" },
          { type: "social", authProviderId: "google", mode: "popup" },
        ],
      ],
      addPasskeyOnSignup: true,
    },
  },
);

export const queryClient = new QueryClient();

export const client = createThirdwebClient({
  clientId: "3c293f82e6e77f130220ed84ebce68cf", // Get from your thirdweb dashboard
});
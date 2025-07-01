import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { alchemy, monadTestnet } from "@account-kit/infra";

export const config = createConfig(
  {
    transport: alchemy({ apiKey: "WsqtzV_qpbzbcea1SWe3Q" }), // Replace with your API key
    chain: monadTestnet,
    ssr: true,
    enablePopupOauth: true,
    policyId: "0b6f281e-1d97-41bc-924c-70f42630fd22",
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
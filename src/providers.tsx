"use client";
import { config, queryClient } from "@/config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider, createConfig } from 'wagmi';
import { http } from 'viem';
import type {
  Chain
} from 'wagmi/chains';
import { ThirdwebProvider } from "thirdweb/react";

// Konfigurasi Chain Monad Testnet
const monadTestnet: Chain = {
  id: 534351,
  name: 'Scroll Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'SCR',
    symbol: 'SCR',
  },
  rpcUrls: {
    default: {
      http: ['https://scroll-sepolia.g.alchemy.com/v2/HNCmzdMfqwxh_eIJAK9xKUALn1uFE2uh'],
    },
    public: {
      http: ['https://scroll-sepolia.g.alchemy.com/v2/HNCmzdMfqwxh_eIJAK9xKUALn1uFE2uh'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Scrollscan',
      url: 'https://sepolia.scrollscan.com/',
    },
  },
  testnet: true,
};

const wagmiconfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
  ssr: true,
});

export const Providers = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>,
) => {
  return (
    <ThirdwebProvider>
      {/* <WagmiProvider config={wagmiconfig}> */}
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      {/* </WagmiProvider> */}
    </ThirdwebProvider>
  );
};

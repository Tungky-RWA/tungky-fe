import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import { cn } from "@/lib/utils";
import { useAuthModal, useUser } from "@account-kit/react";
import { defineChain } from "thirdweb/chains";
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { useConnect, useActiveAccount } from "thirdweb/react";
import { inAppWallet, smartWallet } from "thirdweb/wallets";
import { client } from "@/config";

interface RegisterCardProps {
  cardDescription?: string
}

const wallet = inAppWallet({
  executionMode: {
    mode: "EIP4337",
    smartAccount: {
      chain: defineChain(4202),
      sponsorGas: true,
    },
  },
});

export default function RegisterCard({ cardDescription }: RegisterCardProps) {
  const { connect } = useConnect({
    client,
    accountAbstraction: {
      chain: defineChain(4202),
      sponsorGas: true
    }
  });
  // const { openAuthModal } = useAuthModal();

  const onClick = () => {
    connect(async () => {
      await wallet.connect({
        client, // your thirdweb client
        strategy: "google", // or any other auth strategy
        chain: defineChain(4202)
      });
      return wallet;
    });
  };

  return (
    <CardCustom className="w-full max-w-md" variant="neon">
      <CardHeader className={cn("text-center space-y-4 pb-8")}>
        <CardTitle
          className={cn(
            "text-4xl font-bold blockchain-gradient animate-glow",
            "dark:from-white dark:to-gray-300 bg-clip-text text-transparent",
          )}
        >
          Login
        </CardTitle>
        <CardDescription
          className={cn("text-muted-foreground text-lg")}
        >
          {cardDescription ? cardDescription : "Before Register, Click log in to continue."}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn("space-y-6 pb-8")}>
        <ButtonCustom variant="crypto" className="w-full mt-4 border border-border/30 hover:border-primary/50"
          onClick={onClick}
        >
          Login
        </ButtonCustom>
      </CardContent>
    </CardCustom>
  );
}

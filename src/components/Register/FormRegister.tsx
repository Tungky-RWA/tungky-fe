"use client";

import { Link } from 'react-router-dom';
import { useState } from "react";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import { cn, formatAddress } from "@/lib/utils";
import { useUser, useSmartAccountClient } from "@account-kit/react";
import { useRegisterBrand } from "@/hooks/useRegisterBrand";
import { useReadBrandData } from '@/hooks/useReadRegisteredBrand';
import toast from 'react-hot-toast';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export default function FormRegister() {
  const [isCopied, setIsCopied] = useState(false);
  const [brandName, setBrandName] = useState("")
  const [nftSymbol, setNftSymbol] = useState("")
  const user = useUser();
  const userEmail = user?.email ?? "anon";
  const { client } = useSmartAccountClient({});
  console.log(client?.account?.address)
  
  const { handleRegisterBrand, isRegistering, transactionUrl } = useRegisterBrand({
    onSuccess: () => {
      console.log('success register');
      toast.dismiss();
      toast.success('success register');
    }
  });

  const { brandInfo, isLoadingBrandInfo, refetchBrandInfo } = useReadBrandData({
    contractAddress: CONTRACT_ADDRESS,
    ownerAddress: client?.account?.address,
  });
  
  const handleCopy = () => {
    navigator.clipboard.writeText(client?.account?.address ?? "");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <Card
      className={cn(
        "relative w-full max-w-md shadow-xl border border-gray-200/50",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md",
        "hover:shadow-2xl transition-all duration-300"
      )}
    >
      <CardHeader className={cn("text-center space-y-4 pb-8")}>
        <CardTitle
          className={cn(
            "text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600",
            "dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          )}
        >
          Register Brand
        </CardTitle>
        {!brandInfo?.name && <CardDescription
          className={cn("text-base text-gray-600 dark:text-gray-400")}
        >
          Fill the form below.
        </CardDescription>}
      </CardHeader>

      <CardContent className={cn("space-y-6 pb-8")}>
        {brandInfo?.name ? (
          <div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm font-medium">
                You are already register
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="">
                Your brand is under review by our team
              </p>
            </div>
          </div>
        ): (
          <>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </p>
              <p className="font-medium">{userEmail}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Smart wallet address
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs py-1 px-2">
                  {formatAddress(client?.account?.address ?? "")}
                </Badge>
                <TooltipProvider>
                  <Tooltip open={isCopied}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleCopy}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copied!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => {
                    const address = client?.account?.address;
                    if (address && client?.chain?.blockExplorers?.default?.url) {
                      window.open(
                        `${client.chain.blockExplorers.default.url}/address/${address}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <form
              className="flex flex-col items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(brandName, nftSymbol, client?.account?.address)
                handleRegisterBrand(brandName, nftSymbol, client?.account?.address || "0x")
              }}
            >
              <Input onChange={(e) => setBrandName(e.target.value)} type="text" placeholder="Brand Name" />
              <Input onChange={(e) => setNftSymbol(e.target.value)} type="text" placeholder="NFT Symbol (ex: ARY)" />
                <Button
                  type="submit"
                  disabled={isRegistering}
                  size="lg"
                  // disabled={isLoggingIn}
                  className={cn(
                    "w-full h-12 text-base font-medium bg-gradient-to-r from-gray-600/80 to-gray-800/80",
                    "hover:from-gray-700/90 hover:to-gray-900/90 border-0 shadow-lg hover:shadow-xl",
                    "dark:from-gray-300/20 dark:to-gray-500/30 dark:hover:from-gray-200/30 dark:hover:to-gray-400/40",
                    "backdrop-blur-sm text-white dark:text-gray-100",
                    "transition-all duration-200"
                  )}
                >
                  Submit
                </Button>
            </form>
            {transactionUrl && (
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "gap-2 w-full sm:w-auto relative overflow-hidden transition-all duration-500",
                  "border-green-400 text-green-700 hover:bg-green-50",
                  "animate-in fade-in duration-700"
                )}
              >
                <Link
                  to={transactionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <span>View Transaction</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

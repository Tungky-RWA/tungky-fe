"use client";

import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Badge } from "@/components/UI/badge";
import { Card, CardContent } from "@/components/UI/card";
import { Separator } from "@/components/UI/separator";
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Hash,
  Link,
  Copy,
  CheckCircle,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NftReviewDialog({ children, brandData, nftData }: any) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const generatedUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/verify?tokenId=${brandData?.tokenId}&contract=${
    brandData?.NftContractAddress
  }`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL");
    }
  };

  const handleGenerateNFC = async () => {
    setIsGenerating(true);

    // Simulate generation process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsGenerating(false);
    setIsGenerated(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[95vh] overflow-y-auto p-0 border-0 bg-transparent">
        <div className="relative bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-gradient-x"></div>

          {/* Header with floating elements */}
          <div className="relative p-8 pb-6">
            <div className="absolute top-4 right-4 opacity-20">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>

            <DialogHeader className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10">
                    <Sparkles className="h-8 w-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text" />
                  </div>
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
                NFT Authentication Certificate
              </DialogTitle>
              <DialogDescription className="text-zinc-200 text-lg ">
                Secure digital authentication for your exclusive NFT collectible
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-8 pb-8 space-y-8">
            {/* Hero NFT Display */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative">
                      <img
                        src={
                          nftData?.image ||
                          "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=center" ||
                          "/placeholder.svg"
                        }
                        alt="NFT Preview"
                        className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl shadow-2xl object-cover border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
                      {/* Floating verification badge */}
                      <div className="absolute -top-2 -right-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-sm animate-pulse"></div>
                          <div className="relative bg-green-500 text-white p-2 rounded-full shadow-lg">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="space-y-3">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                        {nftData?.name || "Premium Digital Collectible"}
                      </h3>
                      <p className="text-slate-300 text-base leading-relaxed max-w-lg">
                        {nftData?.description ||
                          "An exclusive digital asset representing authentic ownership and provenance verification."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Authenticated
                      </Badge>
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Verified Original
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Details */}
              <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Technical Details
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="group/item">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4" />
                        NFT Symbol
                      </label>
                      <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 group-hover/item:border-blue-500/30 transition-colors">
                        <p className="text-white font-mono text-sm">
                          {nftData?.nftSymbol || "PREMIUM"}
                        </p>
                      </div>
                    </div>
                    <div className="group/item">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4" />
                        Category
                      </label>
                      <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 group-hover/item:border-purple-500/30 transition-colors">
                        <p className="text-white font-medium">
                          Digital Art & Collectibles
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Information */}
              <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      Blockchain Record
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-400 mb-2 block">
                        Registration Timestamp
                      </label>
                      <div className="p-4 bg-gradient-to-r from-slate-900/60 to-slate-800/60 rounded-lg border border-slate-600/50">
                        <p className="text-white font-mono text-sm">
                          {brandData?.blockTimestamp
                            ? new Date(
                                brandData?.blockTimestamp * 1000
                              ).toLocaleString("en-US", {
                                dateStyle: "full",
                                timeStyle: "short",
                              })
                            : "Retrieving blockchain data..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced URL Generation Section with Animations */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                    <Link className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      NFC Authentication Gateway
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Generate secure authentication URL for NFC integration
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerateNFC}
                    disabled={isGenerating}
                    className={cn(
                      "w-full h-14 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 group relative overflow-hidden",
                      isGenerating
                        ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 cursor-not-allowed"
                        : isGenerated
                        ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600"
                        : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:scale-[1.02]"
                    )}
                  >
                    {/* Animated background for generating state */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
                    )}

                    <div className="flex items-center gap-3 relative z-10">
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span className="animate-pulse">
                            Generating Authentication Data...
                          </span>
                        </>
                      ) : isGenerated ? (
                        <>
                          <CheckCircle className="h-5 w-5 animate-bounce" />
                          <span>Authentication Data Generated!</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 group-hover:animate-bounce" />
                          <span>Generate NFC Authentication Data</span>
                        </>
                      )}
                    </div>

                    {/* Shimmer effect during generation */}
                    {isGenerating && (
                      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    )}
                  </Button>

                  {/* Animated URL Display */}
                  <div
                    className={cn(
                      "transition-all duration-700 ease-out transform",
                      isGenerated
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    )}
                  >
                    <div className="relative group">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 rounded-xl blur-sm animate-pulse"></div>

                      {/* URL Container */}
                      <div className="relative p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
                        {/* Success indicator */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle className="h-4 w-4 animate-pulse" />
                            <span className="text-sm font-medium">
                              Authentication URL Generated
                            </span>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                        </div>

                        {/* URL Display */}
                        <div className="relative">
                          <p className="font-mono text-sm text-slate-300 break-all leading-relaxed pr-16">
                            {generatedUrl}
                          </p>

                          {/* Copy Button */}
                          <Button
                            onClick={handleCopyUrl}
                            size="sm"
                            className={cn(
                              "absolute top-0 right-0 h-10 w-10 p-0 rounded-lg transition-all duration-300",
                              copied
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 scale-110"
                                : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white hover:scale-105"
                            )}
                          >
                            {copied ? (
                              <CheckCircle className="h-5 w-5 animate-bounce" />
                            ) : (
                              <Copy className="h-5 w-5" />
                            )}
                          </Button>
                        </div>

                        {/* Animated border */}
                        {/* <div className="absolute inset-0 rounded-xl border border-emerald-400/20 animate-pulse"></div> */}
                      </div>
                    </div>

                    {/* Success message */}
                    <div className="mt-4 text-center">
                      <p className="text-emerald-400 text-sm font-medium animate-fade-in">
                        ✨ Ready for NFC programming and authentication
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <DialogFooter className="p-6 bg-slate-900/20 backdrop-blur-sm">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/20 text-slate-300 hover:bg-white/5 text-white  hover:border-white/30 bg-transparent font-medium rounded-lg transition-all duration-300"
              >
                Close Preview
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

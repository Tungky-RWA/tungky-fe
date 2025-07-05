import React, { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Circle,
  Gem,
  Zap,
  X,
  Tags,
  Upload,
  Image,
} from "lucide-react";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { useReadNFTData } from "@/hooks/useGetNFTSData";
import { useInfoMinted } from "@/hooks/useClaimNFT";
import { useSmartAccountClient } from "@account-kit/react";

interface NFTItem {
  NftContractAddress: string;
  blockNumber: string;
  blockTimestamp: string;
  latitude: null;
  logIndex: string;
  longitude: null;
  ownerAddress: string;
  status: string;
  tokenId: string;
  transactionHash: string;
}

function CardNFT({ tokenId, contractAddress }: any) {
  // console.log(dataNft, "NFTCARD");
  const { client } = useSmartAccountClient({});
  const [nftdata, setNftdata] = useState<any>(null);
  // const { nftdata, refetchNftInfo } = useReadNFTData({
  //   contractAddress: dataNft?.contractAddress,
  //   tokenid: dataNft?.tokenId,
  // });

  // console.log(tokenId, contractAddress);

  const { data: dataInfoMinted } = useInfoMinted({
    contractAddress: contractAddress,
    tokenId: tokenId,
    client,
  });

  async function fetchPinataJson(link: any) {
    try {
      const res = await fetch(link);
      const json = await res.json();
      setNftdata(json);
      console.log(json); // Ini adalah JSON metadata-nya
      return json;
    } catch (error) {
      console.error("Gagal fetch JSON dari Pinata:", error);
    }
  }

  useEffect(() => {
    fetchPinataJson(dataInfoMinted);
  }, [tokenId]);

  console.log(nftdata);

  return (
    // <div>
    //   {/* render nftData jika sudah ada */}
    //   {nftdata && (
    //     <div>
    //       <h2 className="text-xl font-bold">{nftdata.name}</h2>
    //       <p>{nftdata.description}</p>
    //       <img
    //         src={nftdata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
    //         alt={nftdata.name}
    //         className="mt-2 w-64 rounded-lg"
    //       />
    //     </div>
    //   )}
    // </div>
    <div
      key={nftdata.tokenId}
      className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 crypto-glass backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium text-foreground">{nftdata.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Wallet:{" "}
            <span className="font-mono text-cyan-400">
              {nftdata.nftContractAddress}
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Serial Number: {nftdata.serialNumber}
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Circle
              className={`h-2 w-2 fill-current ${
                nft.status === "Active" ? "text-green-400" : "text-yellow-400"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                nft.status === "Active" ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {nft.status}
            </span>
          </div>
          <ButtonCustom variant="outline" size="sm">
            <Eye className="mr-2 h-3 w-3" />
            View Details
          </ButtonCustom>
        </div> */}
      </div>

      {/* Attributes Display */}
      {/* {nft.attributes && nft.attributes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Tags className="h-3 w-3 text-purple-400" />
            <span className="text-xs font-medium text-muted-foreground">
              Attributes
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {nft.attributes.map((attr, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-xs text-purple-300 border border-purple-500/30"
              >
                {attr.trait_type}: {attr.value}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default CardNFT;

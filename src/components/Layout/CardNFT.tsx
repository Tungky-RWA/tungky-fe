import { useState, useEffect } from "react";
import {
  Eye,
  Circle,
  Tags,
} from "lucide-react";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { formatTimestampToIndoDate } from "@/utils/formatTime";
import NftReviewDialog from "../Dialogs/NftReviewDialog";
import { client } from "@/config";
import { useReadContract  } from "thirdweb/react";
import { defineChain, getContract } from "thirdweb";
import { NFTBRAND_ABI } from "@/lib/constants";

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

function CardNFT({ data }: any) {
  // console.log(dataNft, "NFTCARD");
  const contract = getContract({
    client,
    chain: defineChain(4202),
    address: data?.NftContractAddress,
    abi: NFTBRAND_ABI
  })
  const [nftdata, setNftdata] = useState<any>(null);

  // console.log(tokenId, contractAddress);

  const { data: dataInfoMinted } = useReadContract({
    contract: contract,
    method: "preMints",
    params: [data?.tokenId],
  });

  async function fetchPinataJson(link: any) {
    try {
      const res = await fetch(link);
      const json = await res.json();
      console.log(json, 'woi json')
      setNftdata(json);
      return json;
    } catch (error) {
      console.error("Gagal fetch JSON dari Pinata:", error);
    }
  }

  useEffect(() => {
    fetchPinataJson(dataInfoMinted);
  }, [data]);

  if (!nftdata) {
    return <></>;
  }

  return (
    // <></>
    <div
      key={Number(data?.logIndex)}
      className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 crypto-glass backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-medium text-foreground">
            {nftdata?.name} #{nftdata?.nftSymbol}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tsh:{" "}
            <span className="font-mono text-cyan-400">
              {(data?.transactionHash as string).slice(0, 6)}...
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Premint Date: {formatTimestampToIndoDate(nftdata?.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Circle
              className={`h-2 w-2 fill-current ${
                data?.status === "premint"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                data?.status === "premint"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {data?.status}
            </span>
          </div>
          <NftReviewDialog brandData={data} nftData={nftdata}>
            <ButtonCustom variant="outline" size="sm">
              <Eye className="mr-2 h-3 w-3" />
              View Details
            </ButtonCustom>
          </NftReviewDialog>
        </div>
      </div>

      {/* Attributes Display */}
      {nftdata?.attributes && nftdata?.attributes?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center gap-2 mb-2">
            <Tags className="h-3 w-3 text-purple-400" />
            <span className="text-xs font-medium text-muted-foreground">
              Attributes
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {nftdata?.attributes?.map((attr: any, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-xs text-purple-300 border border-purple-500/30"
              >
                {attr.trait_type}: {attr.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardNFT;

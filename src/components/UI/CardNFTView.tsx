import { useState, useEffect } from "react";
import CardCustom from "./CardCustom";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { useVerification, useInfoMinted } from "@/hooks/useClaimNFT";
import { useSmartAccountClient } from "@account-kit/react";
import { formatTimestampToIndoDate } from "@/utils/formatTime";
import NftReviewDialog from "../Dialogs/NftReviewDialog";

function CardNFTView({ data }: any) {
  const { client } = useSmartAccountClient({});
  const [nftdata, setNftdata] = useState<any>(null);

  console.log(data, "MASOKKK");

  const { data: dataMint } = useInfoMinted({
    contractAddress: data?.NftContractAddress,
    tokenId: data?.tokenId,
    client,
    enabled: data?.status === "mint",
  });

  const { data: dataPremint } = useVerification({
    contractAddress: data?.NftContractAddress,
    tokenId: data?.tokenId,
    client,
    enabled: data?.status === "premint",
  });

  // console.log(data, "masukk");

  // Fetch Pinata JSON when relevant data is available
  useEffect(() => {
    const url = dataMint || dataPremint;

    if (!url) return;

    async function fetchPinataJson(link: string) {
      try {
        const res = await fetch(link);
        const json = await res.json();
        setNftdata(json);
        console.log("✅ Metadata:", json);
      } catch (error) {
        console.error("❌ Gagal fetch JSON dari Pinata:", error);
      }
    }

    fetchPinataJson(url);
  }, [dataMint, dataPremint]);

  if (!nftdata) return null;

  console.log(nftdata, "nftdata");
  console.log(data, "dataInfo");

  return (
    <NftReviewDialog brandData={data} nftData={nftdata}>
      <CardCustom variant="neon" className="group overflow-hidden h-full">
        <div className="relative h-56 bg-muted">
          {/* Placeholder for image */}
          {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-xs text-muted-foreground">
              {nft.name} Image
            </div> */}
          <img
            src={nftdata?.image}
            alt={nftdata?.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground truncate">
            {nftdata?.name}
          </h3>
          <p className="text-sm text-muted-foreground">{nftdata?.brand}</p>
        </div>
      </CardCustom>
    </NftReviewDialog>
  );
}

export default CardNFTView;

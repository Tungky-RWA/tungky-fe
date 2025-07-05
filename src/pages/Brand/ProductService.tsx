import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Package, Plus, Edit } from "lucide-react";
import CardCustom from "@/components/UI/CardCustom";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { useBrandNFTS } from "@/hooks/useGetBrandNFTS";
import CardNFTView from "@/components/UI/CardNFTView";

const ProductService = () => {
  const data = useOutletContext();
  // console.log(data.items[0]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold blockchain-gradient animate-glow">
          Product Mint
        </h1>
        <p className="text-muted-foreground text-lg">View all your product</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.items?.map((nft: any, index: number) => (
          <CardNFTView key={index} data={nft} />
          // <div
          //   key={nft.id}
          //   // onClick={() => handleNftClick(nft)}
          //   className="cursor-pointer"
          // >
          //   <CardCustom variant="neon" className="group overflow-hidden h-full">
          //     <div className="relative h-56 bg-muted">
          //       {/* Placeholder for image */}
          //       {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-xs text-muted-foreground">
          //           {nft.name} Image
          //        </div> */}
          //       <img
          //         src={nft.image}
          //         alt={nft.name}
          //         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          //       />
          //     </div>
          //     <div className="p-4">
          //       <h3 className="font-semibold text-foreground truncate">
          //         {nft.name}
          //       </h3>
          //       <p className="text-sm text-muted-foreground">{nft.brand}</p>
          //     </div>
          //   </CardCustom>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default ProductService;

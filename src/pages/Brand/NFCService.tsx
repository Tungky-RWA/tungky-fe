import React, { useState } from "react";
import { Smartphone, Plus, Link as LinkIcon } from "lucide-react";
import CardCustom from "@/components/UI/CardCustom";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

const NFCService = () => {
  const [nfcRequest, setNfcRequest] = useState({
    product: "",
    quantity: "",
    address: "",
  });

  const [selfService, setSelfService] = useState({
    selectedProduct: "",
    generatedUrl: "",
  });

  const products = [
    { id: "prod_001", name: "Premium Watch" },
    { id: "prod_002", name: "Luxury Bag" },
    { id: "prod_003", name: "Designer Shoes" },
  ];

  const handleRequestNFC = () => {
    console.log("Requesting NFC tags:", nfcRequest);
    setNfcRequest({ product: "", quantity: "", address: "" });
  };

  const handleGenerateNFC = () => {
    const url = `https://tungky.com/verify/${Math.random()
      .toString(36)
      .substr(2, 12)}`;
    setSelfService({ ...selfService, generatedUrl: url });
    console.log("Generated NFC data for:", selfService.selectedProduct);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold blockchain-gradient animate-glow">
          NFC Service
        </h1>
        <p className="text-muted-foreground text-lg">
          Kelola NFC tags untuk produk Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Request NFC Form */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Request NFC Tags</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="nfcProduct">Product for NFC</Label>
                <Select
                  value={nfcRequest.product}
                  onValueChange={(value) =>
                    setNfcRequest({ ...nfcRequest, product: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={nfcRequest.quantity}
                  onChange={(e) =>
                    setNfcRequest({ ...nfcRequest, quantity: e.target.value })
                  }
                  placeholder="Enter quantity needed"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                <Textarea
                  id="shippingAddress"
                  value={nfcRequest.address}
                  onChange={(e) =>
                    setNfcRequest({ ...nfcRequest, address: e.target.value })
                  }
                  placeholder="Enter complete shipping address"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <ButtonCustom
                variant="primary"
                onClick={handleRequestNFC}
                className="w-full mt-6"
                disabled={
                  !nfcRequest.product ||
                  !nfcRequest.quantity ||
                  !nfcRequest.address
                }
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Request NFC Tags
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>

        {/* Self Service NFC */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/20 rounded-lg">
                <LinkIcon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Self Service NFC</h2>
            </div>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-medium mb-3">Instructions:</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Select the product you want to create NFC data for</li>
                <li>• Generate the verification URL</li>
                <li>• Use any NFC writing app to program your NFC tags</li>
                <li>• Write the generated URL to your NFC tags</li>
                <li>• Test the NFC tag to ensure it works properly</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="selfServiceProduct">Select Product</Label>
                <Select
                  value={selfService.selectedProduct}
                  onValueChange={(value) =>
                    setSelfService({ ...selfService, selectedProduct: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selfService.generatedUrl && (
                <div>
                  <Label>Generated URL</Label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg border border-border/50">
                    <code className="text-sm break-all text-primary">
                      {selfService.generatedUrl}
                    </code>
                  </div>
                </div>
              )}

              <ButtonCustom
                variant="accent"
                onClick={handleGenerateNFC}
                className="w-full mt-6"
                disabled={!selfService.selectedProduct}
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Generate NFC Data
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default NFCService;

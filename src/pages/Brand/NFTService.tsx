
import React, { useState } from 'react';
import { Plus, Eye, Circle, Gem, Zap } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Label } from '@/components/UI/label';

const NFTService = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: ''
  });

  const nftProducts = [
    {
      id: '1234',
      name: 'Premium Watch',
      status: 'Active',
      wallet: '0x742...4c2a',
      minted: '2024-01-15'
    },
    {
      id: '5678',
      name: 'Luxury Bag',
      status: 'Pending',
      wallet: '0x8f3...9d1b',
      minted: '2024-01-14'
    },
    {
      id: '9012',
      name: 'Designer Shoes',
      status: 'Active',
      wallet: '0xa21...7e8f',
      minted: '2024-01-13'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMintNFT = () => {
    console.log('Minting NFT:', formData);
    // Reset form
    setFormData({ productName: '', description: '', price: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold blockchain-gradient animate-glow">NFT Service</h1>
        <p className="text-muted-foreground text-lg">
          Manage NFTs and tokenize your products with blockchain technology
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Gem className="h-4 w-4 text-purple-400" />
          <span>Mint • Trade • Verify</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create NFT Form */}
        <CardCustom variant="crypto">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                <Plus className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Create NFT Product</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="productName" className="text-sm font-medium text-foreground">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="mt-1 neon-border bg-input/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product"
                  className="mt-1 min-h-[100px] neon-border bg-input/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label htmlFor="price" className="text-sm font-medium text-foreground">Price (Token)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price in tokens"
                  className="mt-1 neon-border bg-input/50 backdrop-blur-sm"
                />
              </div>

              <ButtonCustom 
                variant="crypto"
                onClick={handleMintNFT}
                className="w-full mt-6"
              >
                <Zap className="mr-2 h-4 w-4" />
                Mint NFT
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>

        {/* NFT List */}
        <CardCustom variant="neon">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Gem className="h-5 w-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold">All NFT & Products</h2>
            </div>
            
            <div className="space-y-4">
              {nftProducts.map((nft) => (
                <div key={nft.id} className="p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-all duration-300 crypto-glass backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{nft.name} #{nft.id}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Wallet: <span className="font-mono text-cyan-400">{nft.wallet}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Minted: {nft.minted}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Circle className={`h-2 w-2 fill-current ${
                          nft.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          nft.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {nft.status}
                        </span>
                      </div>
                      <ButtonCustom variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </ButtonCustom>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default NFTService;

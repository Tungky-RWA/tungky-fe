
import React, { useState } from 'react';
import { Clock, Eye, Circle, Gem, Zap } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Label } from '@/components/UI/label';
import BrandReviewDialog from '@/components/Dialogs/BrandReviewDialog';

const Brand = () => {

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
        <h1 className="text-4xl font-bold blockchain-gradient animate-glow">Brand</h1>
        <p className="text-muted-foreground text-lg">
          Kelola Brand yang terdaftar di platform
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Gem className="h-4 w-4 text-purple-400" />
          <span>Mint • Trade • Verify</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create NFT Form */}
        <CardCustom variant="neon">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold">Pending Brand</h2>
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
                      <BrandReviewDialog>
                        <ButtonCustom variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          View Details
                        </ButtonCustom>
                      </BrandReviewDialog>
                    </div>
                  </div>
                </div>
              ))}
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
              <h2 className="text-xl font-semibold">Registered Brand</h2>
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

export default Brand;

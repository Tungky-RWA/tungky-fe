import React, { useState } from 'react';
import { Plus, Eye, Circle, Gem, Zap, X, Tags, Upload, Image } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Label } from '@/components/UI/label';
import { hashSerial } from '@/utils/hashSerial';
import { usePreMint } from '@/hooks/usePreMint';
import { useReadBrandData } from '@/hooks/useReadRegisteredBrand';
import { FACTORY_ADDRESS } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useSmartAccountClient } from "@account-kit/react";
import { pinataApiKey, pinataSecretKey, pinataGateway } from '@/lib/constants';

const NFTService = () => {
  const { client } = useSmartAccountClient({});
  const [formData, setFormData] = useState({
    serialNumber: '',
    productName: '',
    description: '',
    price: ''
  });

  console.log(import.meta.env.VITE_PINATA_GATEWAY, "gateway");

  const [attributes, setAttributes] = useState([
    { trait_type: '', value: '' }
  ]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const nftProducts = [
    {
      id: '1234',
      name: 'Premium Watch',
      status: 'Active',
      wallet: '0x742...4c2a',
      minted: '2024-01-15',
      attributes: [
        { trait_type: 'Brand', value: 'Luxury' },
        { trait_type: 'Material', value: 'Gold' },
        { trait_type: 'Rarity', value: 'Rare' }
      ]
    },
    {
      id: '5678',
      name: 'Luxury Bag',
      status: 'Pending',
      wallet: '0x8f3...9d1b',
      minted: '2024-01-14',
      attributes: [
        { trait_type: 'Brand', value: 'Designer' },
        { trait_type: 'Color', value: 'Black' },
        { trait_type: 'Size', value: 'Medium' }
      ]
    },
    {
      id: '9012',
      name: 'Designer Shoes',
      status: 'Active',
      wallet: '0xa21...7e8f',
      minted: '2024-01-13',
      attributes: [
        { trait_type: 'Style', value: 'Sneakers' },
        { trait_type: 'Size', value: '42' },
        { trait_type: 'Limited Edition', value: 'Yes' }
      ]
    }
  ];

  const { brandInfo, isLoadingBrandInfo, refetchBrandInfo } = useReadBrandData({
    contractAddress: FACTORY_ADDRESS,
    ownerAddress: client?.account?.address,
  });

  console.log(brandInfo, "ini brand info")

const { preMint, isPreMint, transactionUrl } = usePreMint({
  onSuccess: () => {
    toast.dismiss();
    toast.success('Registration successful! Your brand is under review.');
  },
  onError: (error) => {
    toast.dismiss();
    const message = error?.shortMessage ?? "An error occurred.";
    toast.error(`Registration failed: ${message}`);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Upload metadata to Pinata IPFS
  const uploadMetadataToPinata = async (metadata) => {
    const data = JSON.stringify(metadata);
    
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretKey,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `NFT_Metadata_${metadata.name || 'Unknown'}_${Date.now()}`,
          keyvalues: {
            type: 'nft_metadata',
            productName: metadata.name || 'Unknown'
          }
        },
        pinataOptions: {
          cidVersion: 0,
        }
      }),
    };

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', config);
      const result = await response.json();
      
      if (response.ok) {
        return result.IpfsHash;
      } else {
        throw new Error(result.error || 'Failed to upload metadata');
      }
    } catch (error) {
      console.error('Error uploading metadata:', error);
      throw error;
    }
  };

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  // Upload image to Pinata IPFS
  const uploadImageToPinata = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const metadata = JSON.stringify({
      name: `NFT_Image_${Date.now()}`,
      keyvalues: {
        type: 'nft_image',
        productName: formData.productName || 'Unknown'
      }
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretKey,
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        return result.IpfsHash;
      } else {
        throw new Error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };


  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    if (attributes.length > 1) {
      setAttributes(attributes.filter((_, i) => i !== index));
    }
  };

  const handleMintNFT = async () => {
    if (!formData.productName || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    toast.loading('Waiting...');

    try {
      let imageHash = null;
      
      // Upload image to IPFS if present
      if (imageFile) {
        toast.loading('Uploading image to IPFS...');
        imageHash = await uploadImageToPinata(imageFile);
        console.log('Image uploaded to IPFS:', imageHash);
      }

      // Prepare metadata
      const metadata = {
        name: formData.productName,
        serialNumber: formData.serialNumber,
        description: formData.description,
        image: imageHash ? `${pinataGateway}/ipfs/${imageHash}` : null,
        attributes: attributes.filter(attr => attr.trait_type && attr.value),
        external_url: '', // Optional: link to your website
        nameBrand: brandInfo?.name,
        nftContractAddress: brandInfo?.nftContractAddress,
        nftSymbol: brandInfo?.nftSymbol,
        created_at: new Date().toISOString(),
      };

      // Upload metadata to IPFS
      toast.loading('Uploading metadata to IPFS...');
      const metadataHash = await uploadMetadataToPinata(metadata);
      console.log('Metadata uploaded to IPFS:', metadataHash);
      const linkMetadata = `${pinataGateway}/ipfs/${metadataHash}`

      // Mint NFT
      preMint(String(hashSerial(formData.serialNumber)), linkMetadata, brandInfo?.nftContractAddress);

      // Final result
      const nftData = {
        imageHash,
        metadataHash,
        serialHash: hashSerial(formData.serialNumber),
        imageUrl: imageHash ? `${pinataGateway}/ipfs/${imageHash}` : null,
        metadataUrl: `${pinataGateway}/ipfs/${metadataHash}`,
        metadata
      };

      console.log('NFT minted successfully:', nftData);
      console.log(nftData.serialHash, 'serial hash')
      toast.dismiss();
      toast.success('NFT minted successfully!');
      
      // Reset form after successful upload
      setTimeout(() => {
        setFormData({ serialNumber: '', productName: '', description: '', price: '' });
        setAttributes([{ trait_type: '', value: '' }]);
        setImageFile(null);
        setImagePreview(null);
        toast.dismiss();
      }, 2000);

    } catch (error: any) {
      console.error('Error minting NFT:', error);
      // setUploadStatus('Error: ' + error.message);
      toast.dismiss();
      toast.error(error.message)
    } finally {
      // setIsUploading(false);
      toast.dismiss();
    }
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
                <Label htmlFor="serialNumber" className="text-sm font-medium text-foreground">Serial Number</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  placeholder="Enter serial Number Product (SN: 20240715-001-123, etc)"
                  className="mt-1 neon-border bg-input/50 backdrop-blur-sm"
                />
              </div>
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

              {/* Image Upload Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image className="h-4 w-4 text-purple-400" />
                  <Label className="text-sm font-medium text-foreground">NFT Image</Label>
                </div>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
                        <Upload className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Upload NFT Image</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="NFT Preview"
                      className="w-full h-48 object-cover rounded-lg border border-border/50"
                    />
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 h-8 w-8 bg-background/80 backdrop-blur-sm"
                    >
                      <X className="h-4 w-4" />
                    </ButtonCustom>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {imageFile?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {imageFile && (imageFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Attributes Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tags className="h-4 w-4 text-purple-400" />
                  <Label className="text-sm font-medium text-foreground">Metadata Attributes</Label>
                </div>
                
                <div className="space-y-3">
                  {attributes.map((attribute, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Input
                          placeholder="Trait Type (e.g., Color, Size)"
                          value={attribute.trait_type}
                          onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                          className="neon-border bg-input/50 backdrop-blur-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Value (e.g., Blue, Large)"
                          value={attribute.value}
                          onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                          className="neon-border bg-input/50 backdrop-blur-sm"
                        />
                      </div>
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        onClick={() => removeAttribute(index)}
                        disabled={attributes.length === 1}
                        className="p-2 h-9 w-9"
                      >
                        <X className="h-4 w-4" />
                      </ButtonCustom>
                    </div>
                  ))}
                  
                  <ButtonCustom
                    variant="outline"
                    size="sm"
                    onClick={addAttribute}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Attribute
                  </ButtonCustom>
                </div>
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
                  <div className="flex items-center justify-between mb-3">
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
                  
                  {/* Attributes Display */}
                  {nft.attributes && nft.attributes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Tags className="h-3 w-3 text-purple-400" />
                        <span className="text-xs font-medium text-muted-foreground">Attributes</span>
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
                  )}
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
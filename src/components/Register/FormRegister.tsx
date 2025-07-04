"use client";

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, type DragEvent } from "react";
import { ExternalLink, Copy, Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/UI/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/tooltip";
import { cn, formatAddress } from "@/lib/utils";
import { useUser, useSmartAccountClient, useLogout } from "@account-kit/react";
import { useRegisterBrand } from "@/hooks/useRegisterBrand";
import { useReadBrandData } from '@/hooks/useReadRegisteredBrand';
import toast from 'react-hot-toast';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import { Checkbox } from '../UI/CheckBox';
import CardCustom from '../UI/CardCustom';
import ButtonCustom from '../UI/ButtonCustom';




// Palet warna
const accentPurple = "violet-600";
const accentPurpleHover = "violet-700";
const accentCyan = "cyan-400";
const accentCyanHover = "cyan-300";

// --- Komponen Pengunggah Logo yang Ditingkatkan ---
interface EnhancedLogoUploaderProps {
  onLogoChange?: (file: File | null) => void;
  className?: string;
}

function EnhancedLogoUploader({ onLogoChange, className = "" }: EnhancedLogoUploaderProps) {
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpdate = (file: File | null) => {
    if (file && file.type.match(/^image\/(png|jpeg|svg\+xml)$/)) {
      const url = URL.createObjectURL(file);
      setLogoPreviewUrl(url);
      setFileName(file.name);
      onLogoChange?.(file);
    } else {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
      setLogoPreviewUrl(null);
      setFileName("");
      onLogoChange?.(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleLogoUpdate(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleLogoUpdate(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLogoUpdate(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="brandLogo" className="text-[#FAFAFA] text-sm font-medium">
        Brand Logo
      </Label>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ease-in-out h-full flex flex-col justify-center items-center",
          isDragOver ? "border-violet-400 bg-violet-500/10 scale-[1.02]" : "border-gray-600 hover:border-violet-500 hover:bg-violet-500/5",
          logoPreviewUrl ? "bg-black/20" : "bg-black/10"
        )}
      >
        <Input
          ref={fileInputRef}
          id="brandLogo"
          name="brandLogo"
          type="file"
          accept="image/png, image/jpeg, image/svg+xml"
          onChange={handleFileSelect}
          className="hidden"
        />
        {logoPreviewUrl ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={logoPreviewUrl}
                alt="Logo Preview"
                className="h-24 w-auto max-w-full rounded-lg shadow-lg border border-gray-700"
              />
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors duration-200 shadow-lg leading-none"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-[#FAFAFA] text-sm font-medium truncate max-w-xs mx-auto">{fileName}</p>
              <p className="text-gray-400 text-xs">Click to change or drag a new image</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <p className="text-[#FAFAFA] font-medium">
                <span className="text-violet-400">Upload a file</span> or drag and drop
              </p>
              <p className="text-gray-500 text-xs mt-1">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function FormRegister() {
  const { logout } = useLogout();
  const [isCopied, setIsCopied] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  const { client } = useSmartAccountClient({});

  const [formData, setFormData] = useState({
    companyName: "",
    incorporationCertificateNumber: "",
    brandName: "",
    identityNumber: "",
    websiteLink: "",
    picName: "",
    email: "",
    phoneNumber: "",
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [logoFile, setLogoFile] = useState<File | null>(null);



   const uploadMetadataToPinata = async (metadata : any) => {


    const config = {


      method: 'POST',


      headers: {


        'Content-Type': 'application/json',


        'pinata_api_key': "d71f9a4588a09de46fa8",


        'pinata_secret_api_key': "c1c1d69aaabb92dad7fe2aa6752ee40d1096ccffc26fd241a1dce0a631733ace",


      },


      body: JSON.stringify({


        pinataContent: metadata,


        pinataMetadata: {


          name: `Logo_Metadata_${metadata.companyName || 'Unknown'}_${Date.now()}`,


          keyvalues: {


            type: 'logo_metadata',


            productName: metadata.brand || 'Unknown'


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


        // return result.IpfsHash;
        return `https://copper-defeated-gopher-612.mypinata.cloud/ipfs/${result.IpfsHash}?pinataGatewayToken=74Gtv0rsnTkTxjAlvYRQqwNgDvZVsXAgX1llN5vtq7FyD5cuksMtQND9v_uxNRlC`


      } else {


        throw new Error(result.error || 'Failed to upload metadata');


      }


    } catch (error) {


      console.error('Error uploading metadata:', error);


      throw error;


    }


  };



    const uploadFileToPinata = async (fileContent : any, fileName : string) => {
      const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNzFkOWEzZi1iNmJlLTQyZGItYjViNy1iYjg1YWRjM2M5ZGYiLCJlbWFpbCI6Imhkenp6enp6MDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQ3MWY5YTQ1ODhhMDlkZTQ2ZmE4Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzFjMWQ2OWFhYWJiOTJkYWQ3ZmUyYWE2NzUyZWU0MGQxMDk2Y2NmZmMyNmZkMjQxYTFkY2UwYTYzMTczM2FjZSIsImV4cCI6MTc4MzE3OTkzNH0.eW2UIKuoeaA2moiUPV1nw6DxZDqkxV1_4pImHrJbdoE'; 
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

      // 1. Membuat objek FormData
      const formData = new FormData();
      
      // 2. Menambahkan file ke FormData
      // Argumen pertama 'file' adalah nama field yang diharapkan oleh API Pinata.
      formData.append('file', fileContent, { filename : fileName } as any);

      // 3. (Opsional) Menambahkan metadata kustom
      const metadata = JSON.stringify({
        name: `Asset_${fileName}_${Date.now()}`,
        // keyvalues: {
        //   source: 'my-dapp',
        //   user: 'user-id-123'
        // }
      });
      formData.append('pinataMetadata', metadata);

      // 4. (Opsional) Menambahkan opsi pinning
      const options = JSON.stringify({
        cidVersion: 0,
      });

      formData.append('pinataOptions', options);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            // Penting: Jangan set 'Content-Type' secara manual.
            // fetch akan melakukannya secara otomatis dengan boundary yang benar.
            'Authorization': `Bearer ${PINATA_JWT}`
          },
          body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.details || response.statusText}`);
        }

        const result = await response.json();
        console.log('File berhasil diunggah ke Pinata: ', result);
        
        // CID (Content Identifier) dari file Anda di IPFS
        // return result.IpfsHash;

        return `https://copper-defeated-gopher-612.mypinata.cloud/ipfs/${result.IpfsHash}?pinataGatewayToken=74Gtv0rsnTkTxjAlvYRQqwNgDvZVsXAgX1llN5vtq7FyD5cuksMtQND9v_uxNRlC`

      } catch (error) {
        console.error('Gagal mengunggah file:', error);
        throw error;
      }
    };



  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }) as any);
    }
  }, [user?.email]);

  const { handleRegisterBrand, isRegistering, transactionUrl } = useRegisterBrand({
    onSuccess: () => {
      toast.dismiss();
      toast.success('Registration successful! Your brand is under review.');
      refetchBrandInfo();
    },
    onError: (error) => {
      toast.dismiss();
      const message = error?.shortMessage ?? "An error occurred.";
      toast.error(`Registration failed: ${message}`);
    }
  });

  const { brandInfo, isLoadingBrandInfo, refetchBrandInfo } = useReadBrandData({
    contractAddress: CONTRACT_ADDRESS,
    ownerAddress: client?.account?.address,
  });

  const handleCopy = () => {
    if (!client?.account?.address) return;
    navigator.clipboard.writeText(client.account.address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFormChange = (name : any, value : any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e : React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("submit");
    
    

    console.log('Mengirimkan data:', { ...formData, address: client?.account?.address, logoFile });
    // handleUploadImageToIpfs();
    const imageLinkIpfs = await uploadFileToPinata(logoFile, "logo_" + formData.companyName);

    const metaDataLink = await uploadMetadataToPinata({
      ...formData,
      image: imageLinkIpfs
    })

    console.log(metaDataLink);
    

    
    handleRegisterBrand(
        formData.companyName,
        formData.brandName,
        client?.account?.address || "0x",
        metaDataLink
    );


    setIsLoading(false);
  };

  const inputStyles = `bg-black/30 border border-gray-700 placeholder:text-gray-500 focus:border-${accentPurple} focus:ring-1 focus:ring-${accentPurple}`;
                
  const isFormInvalid =
    !formData.companyName ||
    !formData.brandName ||
    !formData.identityNumber ||
    !formData.termsAccepted ||
    isRegistering;

  if (isLoadingBrandInfo) {
    return <div className="text-center p-8 text-[#FAFAFA]">Loading brand information...</div>;
  }

  return (
    <CardCustom
      className={cn(
        "relative w-full max-w-4xl shadow-2xl border neon-border crypto-glass", // [DIUBAH] max-w-4xl untuk layout lebih lebar
        "bg-[#1D242B]/95 text-[#FAFAFA] backdrop-blur-md"
      )}
    >
      <CardHeader className={cn("text-center space-y-4 pb-6")}>
        <CardTitle className={cn("text-3xl font-bold tracking-tight text-[#FAFAFA]")}>
          Brand Registration
        </CardTitle>
        {!brandInfo?.name && <CardDescription className={cn("text-base text-gray-400")}>
          Complete the form below to register your brand.
        </CardDescription>}
      </CardHeader>

      <CardContent className={cn("space-y-6 pb-8")}>
        {brandInfo?.name ? (
          <div className="text-center space-y-4">
            <p className={`font-medium text-lg text-${accentPurple}`}>
              You Are Already Registered!
            </p>
            <p className="text-[#FAFAFA]">
              Your brand (<span className='font-semibold'>{brandInfo.name}</span>) is under review by our team.
            </p>
            <Button onClick={() => navigate('/brand')} className={cn(
                `w-full text-base font-medium text-[#FAFAFA] bg-${accentPurple} hover:bg-${accentPurpleHover}`
            )}>
                Back to Dashboard
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-[#FAFAFA]">Your Smart Wallet Address</Label>
              <div className="flex items-center gap-2">
                <div
                  id="walletAddress"
                  className="flex-grow rounded-md bg-black/30 px-3 py-2 text-sm font-mono text-gray-300 border border-gray-700"
                >
                  {client?.account?.address ? formatAddress(client.account.address) : "Address not available"}
                </div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip open={isCopied}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        disabled={!client?.account?.address}
                        className="shrink-0 text-[#FAFAFA] hover:bg-white/10"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copied!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* --- [DIUBAH] Form sekarang menggunakan layout 2 kolom --- */}
            <form className="border-t border-white/10 pt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row lg:gap-8">
                
                {/* Kolom Kiri - Input Fields */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-[#FAFAFA]">Company Name <span className="text-red-500">*</span></Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="text" placeholder="e.g., Digital Innovation Inc." required className={inputStyles} />
                  </div>
                  <div>
                    <Label htmlFor="incorporationCertificateNumber" className="text-[#FAFAFA]">Incorporation Certificate Number</Label>
                    <Input id="incorporationCertificateNumber" name="incorporationCertificateNumber" value={formData.incorporationCertificateNumber} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="text" placeholder="e.g., 123/PMA/2024" className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="brandName" className="text-[#FAFAFA]">Brand Name <span className="text-red-500">*</span></Label>
                    <Input id="brandName" name="brandName" value={formData.brandName} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="text" placeholder="e.g., Authentify" required className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="identityNumber" className="text-[#FAFAFA]">PIC National ID Number <span className="text-red-500">*</span></Label>
                    <Input id="identityNumber" name="identityNumber" value={formData.identityNumber} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="text" placeholder="16-digit National ID of PIC" required className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="websiteLink" className="text-[#FAFAFA]">Website</Label>
                    <Input id="websiteLink" name="websiteLink" value={formData.websiteLink} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="url" placeholder="https://yourwebsite.com" className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="picName" className="text-[#FAFAFA]">Person in Charge (PIC) Name</Label>
                    <Input id="picName" name="picName" value={formData.picName} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="text" placeholder="Full name as per ID" className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#FAFAFA]">Email</Label>
                    <Input disabled id="email" name="email" value={formData.email} type="email" placeholder="contact@company.com" className={inputStyles}/>
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="text-[#FAFAFA]">Phone Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="tel" placeholder="081234567890" className={inputStyles}/>
                  </div>
                </div>

                {/* Kolom Kanan - Pengunggah Logo */}
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <EnhancedLogoUploader onLogoChange={setLogoFile } />
                </div>
              </div>

              {/* Bagian Bawah - Persetujuan dan Tombol */}
              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" name="termsAccepted" checked={formData.termsAccepted} onCheckedChange={(checked : any) => handleFormChange("termsAccepted", checked)} 
                      className={`border-${accentPurple} data-[state=checked]:bg-${accentPurple} data-[state=checked]:text-[#FAFAFA]`}
                  />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#FAFAFA]">
                    I agree to the applicable policies and terms <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => logout()} className={cn(
                      `w-full sm:w-1/3 border-${accentPurple} text-${accentPurple}`,
                      `hover:bg-gradient-to-r hover:from-${accentPurpleHover} hover:via-${accentCyanHover} hover:to-${accentCyanHover} hover:text-white`
                  )}>
                    Back
                  </Button>
                  <ButtonCustom variant="primary" type="submit" disabled={isFormInvalid || isLoading} className={cn(
                      "w-full sm:w-2/3 text-base font-medium text-[#FAFAFA]", 
                      `bg-${accentPurple} hover:bg-${accentPurpleHover}`,
                      "disabled:bg-gray-600 disabled:cursor-not-allowed"
                  )}>
                    {isRegistering || isLoading ? 'Submitting...' : 'Submit Registration'}
                  </ButtonCustom>
                </div>
              </div>

              {transactionUrl && (
                <div className="text-center mt-6">
                  <a href={transactionUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 text-${accentCyan} hover:text-${accentCyanHover}`}>
                    <span>View Transaction</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </form>
          </>
        )}
      </CardContent>
    </CardCustom>
  );
}

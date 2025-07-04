"use client";

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ExternalLink, Copy } from "lucide-react";
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

// Palet warna baru yang terinspirasi dari dashboard
const accentPurple = "violet-600";
const accentPurpleHover = "violet-700";
const accentCyan = "cyan-400";
const accentCyanHover = "cyan-300";

export default function FormRegister() {
  const { logout } = useLogout()
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

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const { handleRegisterBrand, isRegistering, transactionUrl } = useRegisterBrand({
   
    onSuccess: () => {
      toast.dismiss();
      toast.success('Registration successful! Your brand is under review.');
      refetchBrandInfo();
    },
    onError: (error: any) => {
      toast.dismiss();
      const message = error?.shortMessage ?? "An error occurred.";
      toast.error(`Registration failed: ${message}`);
    }
  });

  console.log(transactionUrl, "Transaction URL");

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

  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form data:', formData,"Address", client?.account?.address);

    handleRegisterBrand(
      formData.companyName,
      "tes",
      client?.account?.address || "0x"
    );
  };

  // Gaya input disesuaikan dengan warna aksen ungu saat focus
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
        "relative w-full max-w-lg shadow-2xl border neon-border crypto-glass",
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
            <p className={`font-medium text-lg text-${accentPurple}`}> {/* Warna aksen ungu */}
              You Are Already Registered!
            </p>
            <p className="text-[#FAFAFA]">
              Your brand (<span className='font-semibold'>{brandInfo.name}</span>) is under review by our team.
            </p>
            <Button onClick={() => navigate('/dashboard')} className={cn(
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
            
            <form className="space-y-4 border-t border-white/10 pt-6" onSubmit={handleSubmit}>
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
                <Input disabled id="email" name="email" value={formData.email} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="email" placeholder="contact@company.com" className={inputStyles}/>
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-[#FAFAFA]">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => handleFormChange(e.target.name, e.target.value)} type="tel" placeholder="081234567890" className={inputStyles}/>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" name="termsAccepted" checked={formData.termsAccepted} onCheckedChange={(checked) => handleFormChange("termsAccepted", checked)} 
                    className={`border-${accentPurple} data-[state=checked]:bg-${accentPurple} data-[state=checked]:text-[#FAFAFA]`}
                />
                <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#FAFAFA]">
                  I agree to the applicable policies and terms <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => {
                  logout()
                }} className={cn(
                    `w-full sm:w-1/3 border-${accentPurple} text-${accentPurple}`,
                    `hover:bg-gradient-to-r hover:from-${accentPurpleHover} hover:via-${accentCyanHover} hover:to-${accentCyanHover} hover:text-white`
                )}>
                  Back
                </Button>
                <ButtonCustom variant="primary" type="submit" disabled={isFormInvalid} className={cn(
                    "w-full sm:w-2/3 text-base font-medium text-[#FAFAFA]", 
                    `bg-${accentPurple} hover:bg-${accentPurpleHover}`,
                    "disabled:bg-gray-600 disabled:cursor-not-allowed"
                )}>
                  {isRegistering ? 'Submitting...' : 'Submit Registration'}
                </ButtonCustom>
              </div>

              {transactionUrl && (
                <div className="text-center mt-4">
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

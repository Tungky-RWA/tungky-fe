import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/UI/CardCustom";
import Navbar from "@/components/Layout/Navbar";
import LoginCard from "@/components/Register/login-card";
import LoadingPage from "@/components/UI/loadingPage";
import ButtonCustom from "../components/UI/ButtonCustom";
import toast from "react-hot-toast";

import { useActiveAccount, useReadContract, useProfiles, useDisconnect, useActiveWallet } from "thirdweb/react";
import { client } from "@/config";
import { defineChain, getContract } from "thirdweb";
import { NFTBRAND_ABI } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const VerifyProduct: React.FC = () => {
  const activeAccout = useActiveAccount();
  const [searchParams] = useSearchParams();
  const tokenId = searchParams.get("tokenId");
  const contract = searchParams.get("contract") as `0x${string}`;
  // const { client } = useSmartAccountClient({});

  const contractBrand = getContract({
    client,
    chain: defineChain(4202),
    address: contract,
    abi: NFTBRAND_ABI
  })

  const { data } = useReadContract({
    contract: contractBrand,
    method: "preMints",
    params: [BigInt(tokenId || 0)],
  });

  const { data: dataInfoMinted } = useReadContract({
    contract: contractBrand,
    method: "tokenURI",
    params: [BigInt(tokenId || 0)],
  });

  // const { data: ownerNFT, isLoading: isLoadingVerif, dataPreMint, refetch, isLoadingPremint, isSuccess, isSuccessPremint, error: errorOwner, errorPremint, isStale } = useVerification({
  //   tokenId,
  //   contractAddress: contract,
  //   client
  // })
  // const { data } = useVerification({
  //   tokenId,
  //   contractAddress: contract,
  //   client,
  // // });
  // const { data: dataInfoMinted } = useInfoMinted({
  //   tokenId,
  //   contractAddress: contract,
  //   client,
  // });

  // const [verificationResult, setVerificationResult] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoadingGetLocation, setIsLoadingGetLocation] = useState(true);
  // const [isLocationPermisionGranted, setIsLocationPermissionGranted] = useState(false);
  // const [location, setLocation] = useState({lat: 0, lng: 0});

  if (!activeAccout) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <LoginCard cardDescription="Login to continue" />
      </div>
    );
  }

  if (!data && !dataInfoMinted) {
    return <LoadingPage message="Verifying the product..." />;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* <Header showNavigation /> */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Result Product Verification
          </h1>
          <p className="text-primary font-bold break-words">{tokenId}</p>
        </div>

        {data || dataInfoMinted ? <AuthenticProduct /> : <InvalidProduct />}
      </div>
    </div>
  );
};

const AuthenticProduct: React.FC<{
  result: any;
  client: any;
  dataPremint: string;
}> = ({ result }) => {
  const activeAccount = useActiveAccount()
  const { data: profiles } = useProfiles({
    client,
  });
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const tokenId = searchParams.get("tokenId");
  const contract = searchParams.get("contract") as `0x${string}`;

  const contractBrand = getContract({
    client,
    chain: defineChain(4202),
    address: contract,
    abi: NFTBRAND_ABI
  })

  const claimNFT = useMutation({
    mutationFn: (body: {tokenId: any, to: `0x${string}`, contractAddress: `0x${string}`}) => {
      return axios.post('https://tungky-ponder-production.up.railway.app/api/claim-nft', body)
    },
    onMutate: () => {
      toast.loading("claiming nft...");
    },
    onSuccess: () => {
      refetchMinted();
      refetchPremint();
      toast.dismiss();
      toast.success("Claim NFT success");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });
  const { data: dataPremint, refetch: refetchPremint } = useReadContract({
    contract: contractBrand,
    method: "preMints",
    params: [BigInt(tokenId || 0)],
  });
  
  const { data: dataOwner, refetch: refetchOwner, } = useReadContract({
    contract: contractBrand,
    method: "ownerOf",
    params: [BigInt(tokenId || 0)],
  });
  const { data: dataMinted, refetch: refetchMinted, } = useReadContract({
    contract: contractBrand,
    method: "tokenURI",
    params: [BigInt(tokenId || 0)],
  });
  // const {
  //   data: dataMinted,
  //   isLoading: isLoadingMinted,
  //   isError: isErrorMinted,
  //   refetch: refetchMinted,
  // } = useInfoMinted({
  //   tokenId: tokenId,
  //   contractAddress: contract,
  //   client,
  // });

  useEffect(() => {
    const fetchMetadata = async () => {
      if (dataPremint) {
        try {
          const response = await fetch(dataPremint);
          if (!response.ok) {
            throw new Error("Gagal mengambil data dari network.");
          }
          const data = await response.json();
          setMetadata(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const response = await fetch(dataMinted);
          if (!response.ok) {
            throw new Error("Gagal mengambil data dari network.");
          }
          const data = await response.json();
          setMetadata(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMetadata();
  }, [dataPremint, dataMinted]);
  console.log(metadata, 'woi')
  return (
    <div className="space-y-8">
      {/* Verification Status */}
      <Card className="text-center bg-green-500/10 border-green-500/30">
        {/* Placeholder for CheckCircle icon */}
        <svg
          className="h-20 w-20 text-green-400 mx-auto mb-4 animate-bounce-subtle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          ✅ AUTHENTIC PRODUCT VERIFIED
        </h2>
        <p className="text-white/80 text-lg">
          This product has been verified as authentic through blockchain
          technology.
        </p>
        <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
          <p className="text-green-300 font-medium">
            {/* Verification performed on: {new Date(result.verificationHistory[0].date).toLocaleString('en-US')} */}
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Owner Information */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            {/* Placeholder for Shield icon */}
            <svg
              className="h-5 w-5 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Owner & Brand Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium">
                Brand Name
              </label>
              <p className="text-white font-semibold text-lg">
                {metadata?.nameBrand}
              </p>
            </div>
            {dataOwner ? (
              <>
                <div>
                  <label className="text-white/60 text-sm font-medium">
                    Owner
                  </label>
                  <div className="flex items-center space-x-2">
                    <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1">
                      {dataOwner ? dataOwner : ""}
                    </p>
                    {/* Placeholder for Button component with ExternalLink icon */}
                    <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  {activeAccount?.address === dataOwner ? (
                    <>
                      <p className="font-semibold text-xl mb-2 blockchain-gradient">
                        You are the owner of this NFT Product
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-primary font-semibold text-xl mb-2">
                        You are not the owner of this NFT Product
                      </p>
                      <p className="text-white/60 text-sm font-medium mb-2">
                        If you sure this is yours, then try change account
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <ButtonCustom
                          onClick={() => logout()}
                          variant="secondary"
                        >
                          Change Account
                        </ButtonCustom>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}
            {!dataOwner ? (
              <div className="mt-4">
                <p className="text-white font-semibold text-lg mb-2">
                  There is no owner of this product
                </p>
                <p className="text-white/60 text-sm font-medium mb-2">
                  You can claim NFT of this product, but please make sure you
                  want to mint to this account
                </p>
                {/* <p className="text-white font-semibold text-lg mb-1">Your Account Information</p> */}
                <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1 my-1 relative">
                  {profiles?.length ? profiles[0]?.details.email : null}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1 break-all ">
                    {activeAccount?.address}
                  </p>
                  {/* Placeholder for Button component with ExternalLink icon */}
                  <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-2 justify-end">
                  <ButtonCustom onClick={() => wallet ? disconnect(wallet) : null} variant="secondary">
                    Change Account
                  </ButtonCustom>
                  <ButtonCustom
                    variant="primary"
                    onClick={() =>
                      claimNFT.mutate({ tokenId: tokenId, to: activeAccount?.address as `0x${string}`, contractAddress: contract})
                    }
                  >
                    Claim NFT
                  </ButtonCustom>
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        {/* Product Details */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Product Details
          </h3>
          <div className="space-y-4">
            <div>
              <img src={`${metadata?.image}`} />
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">
                Product Name
              </label>
              <p className="text-white font-semibold text-lg">
                {metadata?.name}
              </p>
            </div>
            <div className="gap-4">
              <div>
                <label className="text-white/60 text-sm font-medium">
                  Token ID
                </label>
                <p className="text-primary font-bold break-words break-all">
                  {tokenId}
                </p>
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">
                Serial Number
              </label>
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded">
                {metadata?.serialNumber}
              </p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">
                NFT Contract Address
              </label>
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded">
                {metadata?.nftContractAddress}
              </p>
            </div>
            {/* <div>
              <label className="text-white/60 text-sm font-medium">Warranty</label>
              <p className="text-accent font-medium">{result.productDetails.warranty}</p>
            </div> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

const InvalidProduct: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="space-y-8">
      <Card className="text-center bg-red-500/10 border-red-500/30">
        {/* Placeholder for AlertTriangle icon */}
        <svg
          className="h-20 w-20 text-red-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          ❌ VERIFICATION FAILED
        </h2>
        <p className="text-white/80 text-lg mb-4">
          {error || "Product could not be verified or may not be authentic."}
        </p>
        <div className="p-4 bg-red-500/20 rounded-lg">
          <h4 className="text-red-300 font-medium mb-2">Possible Causes:</h4>
          <ul className="text-red-200 text-sm text-left space-y-1">
            <li>• Invalid or incorrect product code</li>
            <li>• Product not yet registered in the system</li>
            <li>• Product might be counterfeit or not original</li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">
              1. Recheck Product Code
            </h4>
            <p className="text-white/70 text-sm">
              Ensure the entered code matches the one on the product.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">
              2. Contact Brand/Seller
            </h4>
            <p className="text-white/70 text-sm">
              Confirm product authenticity directly with the brand or authorized
              seller.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">
              3. Report Suspicious Product
            </h4>
            <p className="text-white/70 text-sm">
              If you believe the product is authentic but unverified, report it
              to customer service.
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center space-x-4">
        <ButtonCustom
          variant="neon"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </ButtonCustom>
      </div>
    </div>
  );
};

export default VerifyProduct;

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Shield, CheckCircle, AlertTriangle, ExternalLink, User } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';
import Navbar from '@/components/Layout/Navbar';
import LoginCard from '@/components/Register/login-card';
import LoadingPage from '@/components/UI/loadingPage';

import { useSignerStatus, useSmartAccountClient, useLogout, useUser } from '@account-kit/react';
import ButtonCustom from '../components/UI/ButtonCustom';

const VerifyProduct: React.FC = () => {
  const { productId } = useParams();
  const [ searchParams ] = useSearchParams();
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGetLocation, setIsLoadingGetLocation] = useState(true);
  const [isLocationPermisionGranted, setIsLocationPermissionGranted] = useState(false);
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const signerStatus = useSignerStatus();
  console.log(signerStatus)

  const tokenId = searchParams.get('tokenId'); 
  const contract = searchParams.get('contract'); 
  console.log(tokenId, contract)
  useEffect(() => {
    // logout()
    setIsLoadingGetLocation(true)
    if(!navigator.geolocation){
        alert("location not support")
    }
    
    // Simulate product verification API call
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      setLocation({ lat: latitude, lng: longitude });

      setIsLocationPermissionGranted(true);
       
      setIsLoadingGetLocation(false);
    }, (err) => {
      if(err.code == 1){
        setIsLocationPermissionGranted(false);
      }
       
     setIsLoadingGetLocation(false);
    })
   

    const verifyProduct = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Mock verification result based on productId
      if (productId && productId.length > 6) {
        setVerificationResult({
          isAuthentic: true,
          ownerName: 'Premium Brand Electronics',
          walletAddress: '0x742d35Cc6644C5532bF3a1c6e5d4F48c82dd4dc7',
          productDetails: {
            name: 'Premium Smartphone X1',
            tokenId: `#${productId}`,
            mintDate: '2025-01-15T10:30:00Z',
            category: 'Electronics',
            description: 'High-end smartphone with advanced security features and premium build quality',
            serialNumber: 'PSX1-2025-001234',
            manufacturer: 'Premium Brand Electronics',
            warranty: '2 years international warranty'
          },
          verificationHistory: [
            { 
              date: '2025-01-20T14:22:00Z', 
              action: 'Product Verified', 
              location: 'Jakarta, Indonesia',
              verifier: 'Consumer App'
            },
            { 
              date: '2025-01-18T09:15:00Z', 
              action: 'Quality Check Passed', 
              location: 'Manufacturing Plant',
              verifier: 'QC System'
            },
            { 
              date: '2025-01-15T10:30:00Z', 
              action: 'NFT Minted', 
              location: 'Blockchain Network',
              verifier: 'Smart Contract'
            }
          ],
          blockchainDetails: {
            network: 'Monad',
            contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
            blockNumber: '45123456',
            gasUsed: '145,892'
          }
        });
      } else {
        setVerificationResult({
          isAuthentic: false,
          error: 'Product not found or invalid verification code'
        });
      }
      
      setIsLoading(false);

      // send data to backend
      


    };

    verifyProduct();
  }, [productId]);

  if (signerStatus.isDisconnected) {
    return (
      <div className="min-h-screen relative justify-center items-center bg-blockchain-gradient flex w-full">
        <LoginCard cardDescription="Login to continue"/>
      </div>
    )
  }

  if(isLoadingGetLocation){
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        {/* <Header showNavigation /> */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Need Location Permision...</h2>
            <p className="text-white/60">Turn On Your Browser location</p>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    // return (
    //   <div className="min-h-screen bg-gray-900 pt-16">
    //     {/* <Header showNavigation /> */}
    //     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //       <Card className="text-center">
    //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
    //         <h2 className="text-xl font-semibold text-white mb-2">Checking Originality Verified Produk...</h2>
    //         <p className="text-white/60">Please wait, we are verifying your product with blockchain</p>
    //       </Card>
    //     </div>
    //   </div>
    // );
    return (
      <LoadingPage message="Verifying the product..." />
    )
  }



  if(!isLocationPermisionGranted){
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">You Need to Allow Location Browser Permission</h2>
          <p className="text-white/60 mb-6">Please turn on your location in your browser and hit the refresh button.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* <Header showNavigation /> */}
       <Navbar/>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Result Product Verification
          </h1>
          <p className="text-xl text-white/60">
            Product ID: <span className="text-primary font-mono">{productId}</span>
          </p>
        </div>

        {verificationResult?.isAuthentic ? (
          <AuthenticProduct result={verificationResult} />
        ) : (
          <InvalidProduct error={verificationResult?.error} />
        )}
      </div>
    </div>
  );
};

const AuthenticProduct: React.FC<{ result: any, client: any }> = ({ result }) => {
  const { client } = useSmartAccountClient({});
  const { logout } = useLogout();
  const user = useUser();
  console.log(client)
  return (
    <div className="space-y-8">
      {/* Verification Status */}
      <Card className="text-center bg-green-500/10 border-green-500/30">
        {/* Placeholder for CheckCircle icon */}
        <svg className="h-20 w-20 text-green-400 mx-auto mb-4 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          ✅ AUTHENTIC PRODUCT VERIFIED
        </h2>
        <p className="text-white/80 text-lg">
          This product has been verified as authentic through blockchain technology.
        </p>
        <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
          <p className="text-green-300 font-medium">
            Verification performed on: {new Date(result.verificationHistory[0].date).toLocaleString('en-US')}
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Owner Information */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            {/* Placeholder for Shield icon */}
            <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Owner & Brand Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium">Brand Name</label>
              <p className="text-white font-semibold text-lg">{result.ownerName}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Owner</label>
              <div className="flex items-center space-x-2">
                <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1">
                  {result.walletAddress}
                </p>
                {/* Placeholder for Button component with ExternalLink icon */}
                <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View
                </button>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">There is no owner of this product</p>
              <p className="text-white/60 text-sm font-medium">You can claim NFT of this product, but please make sure you want to mint to this account</p>
              {/* <p className="text-white font-semibold text-lg mb-1">Your Account Information</p> */}
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1 my-1">
                {user?.email}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1">
                  {result.walletAddress}
                </p>
                {/* Placeholder for Button component with ExternalLink icon */}
                <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View
                </button>
              </div>
              <div className="flex items-center space-x-2 mt-2 justify-end">
                <ButtonCustom onClick={() => logout()} variant="secondary">
                  Change Account
                </ButtonCustom>
                <ButtonCustom variant="primary">
                  Claim NFT
                </ButtonCustom>
              </div>
            </div>
          </div>
        </Card>

        {/* Product Details */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Product Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium">Product Name</label>
              <p className="text-white font-semibold text-lg">{result.productDetails.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm font-medium">Token ID</label>
                <p className="text-primary font-bold">{result.productDetails.tokenId}</p>
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Serial Number</label>
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded">
                {result.productDetails.serialNumber}
              </p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Mint Date</label>
              <p className="text-white font-medium">
                {/* {new Date(result.productDetails.mintDate).toLocaleDateString('en-US')} */}
                -
              </p>
            </div>
            {/* <div>
              <label className="text-white/60 text-sm font-medium">Warranty</label>
              <p className="text-accent font-medium">{result.productDetails.warranty}</p>
            </div> */}
          </div>
        </Card>
      </div>

      {/* Product Description */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Product Description
        </h3>
        <p className="text-white/80 leading-relaxed">{result.productDetails.description}</p>
      </Card>

      {/* Blockchain Details */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          {/* Placeholder for Shield icon */}
          <svg className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Blockchain Details
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-white/60 text-sm font-medium">Network</label>
            <p className="text-accent font-medium">{result.blockchainDetails.network}</p>
          </div>
          <div>
            <label className="text-white/60 text-sm font-medium">Block Number</label>
            <p className="text-white font-mono text-sm">{result.blockchainDetails.blockNumber}</p>
          </div>
          <div>
            <label className="text-white/60 text-sm font-medium">Gas Used</label>
            <p className="text-white font-mono text-sm">{result.blockchainDetails.gasUsed}</p>
          </div>
          <div>
            <label className="text-white/60 text-sm font-medium">Contract</label>
            <div className="flex items-center space-x-1">
              <p className="text-white font-mono text-xs">
                {result.blockchainDetails.contractAddress.substring(0, 10)}...
              </p>
              {/* Placeholder for Button component with ExternalLink icon */}
              <button className="px-3 py-1 bg-gray-700 text-white rounded text-xs flex items-center space-x-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Verification History */}
      {/* <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Verification History & Audit Trail
        </h3>
        <div className="space-y-4">
          {result.verificationHistory.map((item: any, index: number) => (
            <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
              <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-white/60 text-sm">{item.location}</p>
                    <p className="text-white/50 text-xs">Verified by: {item.verifier}</p>
                  </div>
                  <span className="text-white/80 text-sm">
                    {new Date(item.date).toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card> */}

      {/* Action Buttons */}
      {/* <div className="text-center space-x-4">
        <Button
          variant="primary"
          onClick={() => window.location.href = '/'}
          className="mr-4"
        >
          Verify Another Product
        </Button>
        <Button
          variant="accent"
          onClick={() => window.print()}
        >
          Print Authenticity Certificate
        </Button>
        <Button
          variant="outline"
          onClick={() => navigator.share?.({
            title: 'Product Verified',
            text: `Product ${result.productDetails.name} has been verified as authentic`,
            url: window.location.href
          })}
        >
          Share Verification
        </Button>
      </div> */}
    </div>
  );
};

const InvalidProduct: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="space-y-8">
      <Card className="text-center bg-red-500/10 border-red-500/30">
        {/* Placeholder for AlertTriangle icon */}
        <svg className="h-20 w-20 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          ❌ VERIFICATION FAILED
        </h2>
        <p className="text-white/80 text-lg mb-4">
          {error || 'Product could not be verified or may not be authentic.'}
        </p>
        <div className="p-4 bg-red-500/20 rounded-lg">
          <h4 className="text-red-300 font-medium mb-2">Possible Causes:</h4>
          <ul className="text-red-200 text-sm text-left space-y-1">
            <li>• Invalid or incorrect product code</li>
            <li>• Product not yet registered in the system</li>
            <li>• Damaged NFC tag or QR code</li>
            <li>• Product might be counterfeit or not original</li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Next Steps
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">1. Recheck Product Code</h4>
            <p className="text-white/70 text-sm">
              Ensure the entered code matches the one on the product.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">2. Contact Brand/Seller</h4>
            <p className="text-white/70 text-sm">
              Confirm product authenticity directly with the brand or authorized seller.
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">3. Report Suspicious Product</h4>
            <p className="text-white/70 text-sm">
              If you believe the product is authentic but unverified, report it to customer service.
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center space-x-4">
        <Button
          variant="primary"
          onClick={() => window.location.href = '/buyer'}
        >
          Try Verifying Again
        </Button>
        <Button
          variant="accent"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};


export default VerifyProduct;
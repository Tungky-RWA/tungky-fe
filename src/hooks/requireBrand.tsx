import { Outlet, Navigate } from 'react-router-dom';
import { useSmartAccountClient, useAuthenticate, useSignerStatus } from '@account-kit/react';
import { useState, useEffect } from 'react';
import { useReadBrandData } from '@/hooks/useReadRegisteredBrand';
import { Address } from 'viem';
import { MASTER_ABI } from '@/lib/constants';
import { FACTORY_ADDRESS, MASTER_ADDRESS } from '@/lib/constants';
import LoadingPage from '@/components/UI/loadingPage';
import { DEFAULT_ROLE_ADMIN } from '@/lib/constants';
import LoginCard from '@/components/Register/login-card';

const RequireBrand = () => {
  const { client } = useSmartAccountClient({});
  const { isPending } = useAuthenticate({});
  const signerStatus = useSignerStatus();
  

  const [veryfied, setVeryfied] = useState<boolean | null>(null); // null = belum cek
  const [loading, setLoading] = useState(true);

  const { brandInfo, isLoadingBrandInfo, refetchBrandInfo } = useReadBrandData({
    contractAddress: FACTORY_ADDRESS,
    ownerAddress: client?.account?.address,
  });

  useEffect(() => {
    const checkRole = async () => {
      if (!client?.account?.address) return;
      try {
        setVeryfied(Boolean(brandInfo?.isLegalVerified));
        if(!isLoadingBrandInfo){
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to check role:", err);
        setVeryfied(false);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && client?.account?.address) {
      checkRole();
    }
  }, [client, isPending]);

  if (loading || isPending || veryfied === null) {
    return <LoadingPage />;
  }

  // if (!veryfied) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default RequireBrand;

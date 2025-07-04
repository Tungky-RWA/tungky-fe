import { Outlet, Navigate } from 'react-router-dom';
import { useSmartAccountClient, useAuthenticate, useSignerStatus } from '@account-kit/react';
import { useState, useEffect } from 'react';
import { Address } from 'viem';
import { MASTER_ABI } from '@/lib/constants';
import { MASTER_ADDRESS } from '@/lib/constants';
import LoadingPage from '@/components/UI/loadingPage';
import { DEFAULT_ROLE_ADMIN } from '@/lib/constants';
import LoginCard from '@/components/Register/login-card';

const RequireAdmin = () => {
  const { client } = useSmartAccountClient({});
  const { isPending } = useAuthenticate({});
  const signerStatus = useSignerStatus();
  

  const [hasRole, setHasRole] = useState<boolean | null>(null); // null = belum cek
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!client?.account?.address) return;

      try {
        const result = await client.readContract({
          address: MASTER_ADDRESS,
          abi: MASTER_ABI,
          functionName: 'hasRole',
          args: [DEFAULT_ROLE_ADMIN, client.account.address as Address],
        });

        setHasRole(result as boolean);
      } catch (err) {
        console.error("Failed to check role:", err);
        setHasRole(false);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && client?.account?.address) {
      checkRole();
    }
  }, [client, isPending]);

  

  if (loading || isPending || hasRole === null) {
    return <LoadingPage />;
  }

  if (!signerStatus.isConnected) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <LoginCard cardDescription="Need to login first"/>
      </div>
    )
  }

  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;

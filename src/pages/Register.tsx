import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Coins, 
  Package, 
  Nfc, 
  ShoppingCart, 
  LogOut,
  Check,
  X,
  Eye,
  Settings,
  Activity
} from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';
import RegisterCard from '@/components/Register/login-card';
import { useSignerStatus } from "@account-kit/react";
import FormRegister from '@/components/Register/FormRegister';

const Register: React.FC = () => {
  const signerStatus = useSignerStatus();
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="flex justify-center">
      {signerStatus.isConnected ?
      <FormRegister /> 
      :
      <RegisterCard />}
    </div>
  );
};



export default Register;
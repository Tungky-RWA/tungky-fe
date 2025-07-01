

import { Outlet } from 'react-router-dom';
import Sidebar from './Brand/Sidebar';
import Header from '@/components/Layout/Header';

const BrandLayout = () => {
  return (
    <div className="min-h-screen relative  bg-blockchain-gradient flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header userRole="brand" />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;

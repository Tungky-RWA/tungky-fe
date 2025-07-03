import React from 'react';
// import yang tidak terpakai telah dihapus untuk kebersihan kode

import { useSignerStatus } from "@account-kit/react";
import FormRegister from '@/components/Register/FormRegister';
import RegisterCard from '@/components/Register/login-card';

const Register: React.FC = () => {
  const { isConnected } = useSignerStatus();

  return (
    // 1. Kontainer utama dibuat relatif untuk menampung video yang posisinya absolut
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* 2. Elemen video untuk latar belakang */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="videos/hero-3.mp4" 
        autoPlay
        loop
        muted
        playsInline // Atribut tambahan untuk kompatibilitas mobile
      />

      {/* Overlay gelap opsional untuk membuat teks lebih mudah dibaca */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* 3. Kontainer untuk konten yang akan diletakkan di tengah */}
      <div className="relative flex items-center justify-center min-h-screen z-20 p-4">
        
        {/* Logika yang sudah ada: menampilkan komponen berdasarkan status koneksi */}
        {isConnected ? <FormRegister /> : <RegisterCard />}

      </div>
    </div>
  );
};

export default Register;
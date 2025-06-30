import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Search, Scan } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';

const BuyerInterface: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setVerificationResult({
        isAuthentic: true,
        ownerName: 'Premium Brand Co.',
        walletAddress: '0x742d35Cc6644C5532bF3a1c6e5d4F48c82dd4dc7',
        productDetails: {
          name: 'Premium Leather Watch',
          tokenId: '#1234',
          mintDate: '2025-01-15',
          category: 'Luxury Watches',
          description: 'Handcrafted premium leather watch with Swiss movement'
        },
        verificationHistory: [
          { date: '2025-01-20', action: 'Product Verified', location: 'Jakarta' },
          { date: '2025-01-15', action: 'NFT Minted', location: 'Blockchain' }
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleManualVerify = () => {
    // Handle manual product ID input verification
    handleScan();
  };

  return (
    <div className="min-h-screen">
      <Header showNavigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Verifikasi Produk
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Pastikan keaslian produk Anda dengan teknologi blockchain
          </p>
        </div>

        {!verificationResult ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* NFC/QR Scanning */}
            <Card className="text-center">
              <Scan className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Scan NFC atau QR Code
              </h3>
              <p className="text-white/70 mb-6">
                Dekatkan smartphone Anda ke NFC tag atau scan QR code pada produk
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full"
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </Card>

            {/* Manual Verification */}
            <Card className="text-center">
              <Search className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Verifikasi Manual
              </h3>
              <p className="text-white/70 mb-6">
                Masukkan kode produk secara manual untuk verifikasi
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-accent focus:outline-none"
                  placeholder="Masukkan kode produk"
                />
                <Button 
                  variant="accent" 
                  size="lg" 
                  onClick={handleManualVerify}
                  className="w-full"
                >
                  Verify Product
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <VerificationResult result={verificationResult} />
        )}

        {/* How to Use Section */}
        <Card className="mt-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Cara Menggunakan Verifikasi
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Temukan Tag</h4>
              <p className="text-white/70 text-sm">
                Cari NFC tag atau QR code pada produk yang ingin diverifikasi
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-accent">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Scan/Input</h4>
              <p className="text-white/70 text-sm">
                Scan dengan smartphone atau masukkan kode secara manual
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Hasil</h4>
              <p className="text-white/70 text-sm">
                Lihat hasil verifikasi dan detail produk dari blockchain
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const VerificationResult: React.FC<{ result: any }> = ({ result }) => {
  return (
    <div className="space-y-8">
      {/* Verification Status */}
      <Card className="text-center">
        {result.isAuthentic ? (
          <>
            <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Produk Terverifikasi Asli
            </h2>
            <p className="text-white/70">
              Produk ini telah terverifikasi sebagai produk asli melalui blockchain
            </p>
          </>
        ) : (
          <>
            <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Verifikasi Gagal
            </h2>
            <p className="text-white/70">
              Produk ini tidak dapat diverifikasi atau kemungkinan palsu
            </p>
          </>
        )}
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Owner Information */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Informasi Pemilik
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Nama Pemilik</label>
              <p className="text-white font-medium">{result.ownerName}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Wallet Address</label>
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded">
                {result.walletAddress}
              </p>
            </div>
          </div>
        </Card>

        {/* Product Details */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">
            Detail Produk
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Nama Produk</label>
              <p className="text-white font-medium">{result.productDetails.name}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Token ID</label>
              <p className="text-white font-medium">{result.productDetails.tokenId}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Tanggal Mint</label>
              <p className="text-white font-medium">{result.productDetails.mintDate}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Kategori</label>
              <p className="text-white font-medium">{result.productDetails.category}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Product Description */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Deskripsi Produk
        </h3>
        <p className="text-white/80">{result.productDetails.description}</p>
      </Card>

      {/* Verification History */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Riwayat Verifikasi
        </h3>
        <div className="space-y-3">
          {result.verificationHistory.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{item.action}</p>
                <p className="text-white/60 text-sm">{item.location}</p>
              </div>
              <span className="text-white/80 text-sm">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="text-center">
        <Button 
          variant="primary" 
          onClick={() => window.location.reload()}
          className="mr-4"
        >
          Verifikasi Produk Lain
        </Button>
        <Button 
          variant="outline" 
          onClick={() => window.print()}
        >
          Print Hasil Verifikasi
        </Button>
      </div>
    </div>
  );
};

export default BuyerInterface;
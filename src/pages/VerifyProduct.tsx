import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import Header from '../components/Layout/Header';
import Card from '../components/UI/CardCustom';
import Button from '../components/UI/ButtonCustom';

const VerifyProduct: React.FC = () => {
  const { productId } = useParams();
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate product verification API call
    const verifyProduct = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
            network: 'Polygon',
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
    };

    verifyProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        {/* <Header showNavigation /> */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Memverifikasi Produk...</h2>
            <p className="text-white/60">Mengecek keaslian produk melalui blockchain</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* <Header showNavigation /> */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Hasil Verifikasi Produk
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

const AuthenticProduct: React.FC<{ result: any }> = ({ result }) => {
  return (
    <div className="space-y-8">
      {/* Verification Status */}
      <Card className="text-center bg-green-500/10 border-green-500/30">
        <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-4 animate-bounce-subtle" />
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          ✅ PRODUK ASLI TERVERIFIKASI
        </h2>
        <p className="text-white/80 text-lg">
          Produk ini telah terverifikasi sebagai produk asli melalui teknologi blockchain
        </p>
        <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
          <p className="text-green-300 font-medium">
            Verifikasi dilakukan pada: {new Date(result.verificationHistory[0].date).toLocaleString('id-ID')}
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Owner Information */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Informasi Pemilik & Brand
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium">Nama Pemilik/Brand</label>
              <p className="text-white font-semibold text-lg">{result.ownerName}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Wallet Address</label>
              <div className="flex items-center space-x-2">
                <p className="text-white font-mono text-sm bg-white/5 p-2 rounded flex-1">
                  {result.walletAddress}
                </p>
                <Button variant="outline" size="sm" icon={ExternalLink}>
                  View
                </Button>
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Manufacturer</label>
              <p className="text-white font-medium">{result.productDetails.manufacturer}</p>
            </div>
          </div>
        </Card>

        {/* Product Details */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">
            Detail Produk
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm font-medium">Nama Produk</label>
              <p className="text-white font-semibold text-lg">{result.productDetails.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm font-medium">Token ID</label>
                <p className="text-primary font-bold">{result.productDetails.tokenId}</p>
              </div>
              <div>
                <label className="text-white/60 text-sm font-medium">Kategori</label>
                <p className="text-white font-medium">{result.productDetails.category}</p>
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Serial Number</label>
              <p className="text-white font-mono text-sm bg-white/5 p-2 rounded">
                {result.productDetails.serialNumber}
              </p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Tanggal Mint</label>
              <p className="text-white font-medium">
                {new Date(result.productDetails.mintDate).toLocaleDateString('id-ID')}
              </p>
            </div>
            <div>
              <label className="text-white/60 text-sm font-medium">Garansi</label>
              <p className="text-accent font-medium">{result.productDetails.warranty}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Product Description */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Deskripsi Produk
        </h3>
        <p className="text-white/80 leading-relaxed">{result.productDetails.description}</p>
      </Card>

      {/* Blockchain Details */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-accent" />
          Detail Blockchain
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
              <Button variant="outline" size="sm" icon={ExternalLink}>
                View
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Verification History */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Riwayat Verifikasi & Audit Trail
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
                    {new Date(item.date).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-x-4">
        <Button 
          variant="primary" 
          onClick={() => window.location.href = '/'}
          className="mr-4"
        >
          Verifikasi Produk Lain
        </Button>
        <Button 
          variant="accent" 
          onClick={() => window.print()}
        >
          Print Sertifikat Keaslian
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigator.share?.({ 
            title: 'Produk Terverifikasi', 
            text: `Produk ${result.productDetails.name} telah terverifikasi asli`,
            url: window.location.href 
          })}
        >
          Share Verifikasi
        </Button>
      </div>
    </div>
  );
};

const InvalidProduct: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="space-y-8">
      <Card className="text-center bg-red-500/10 border-red-500/30">
        <AlertTriangle className="h-20 w-20 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          ❌ VERIFIKASI GAGAL
        </h2>
        <p className="text-white/80 text-lg mb-4">
          {error || 'Produk tidak dapat diverifikasi atau kemungkinan tidak asli'}
        </p>
        <div className="p-4 bg-red-500/20 rounded-lg">
          <h4 className="text-red-300 font-medium mb-2">Kemungkinan Penyebab:</h4>
          <ul className="text-red-200 text-sm text-left space-y-1">
            <li>• Kode produk tidak valid atau salah</li>
            <li>• Produk belum terdaftar di sistem</li>
            <li>• NFC tag atau QR code rusak</li>
            <li>• Produk mungkin palsu atau tidak asli</li>
          </ul>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">
          Langkah Selanjutnya
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">1. Periksa Kembali Kode Produk</h4>
            <p className="text-white/70 text-sm">
              Pastikan kode yang dimasukkan sesuai dengan yang tertera pada produk
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">2. Hubungi Brand/Penjual</h4>
            <p className="text-white/70 text-sm">
              Konfirmasi keaslian produk langsung dengan brand atau penjual resmi
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">3. Laporkan Produk Mencurigakan</h4>
            <p className="text-white/70 text-sm">
              Jika Anda yakin produk asli namun tidak terverifikasi, laporkan ke customer service
            </p>
          </div>
        </div>
      </Card>

      <div className="text-center space-x-4">
        <Button 
          variant="primary" 
          onClick={() => window.location.href = '/buyer'}
        >
          Coba Verifikasi Lagi
        </Button>
        <Button 
          variant="accent" 
          onClick={() => window.location.href = '/'}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default VerifyProduct;
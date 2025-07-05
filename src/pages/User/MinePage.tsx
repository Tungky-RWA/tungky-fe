import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { 
  X,
  QrCode, 
  Nfc, 
  Send, 
  Wallet, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Gem
} from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';

// Dummy data for the user's NFT collection
const myNfts = [
  {
    id: 'nft-001',
    name: 'Mega Mendung Batik',
    brand: 'Batik Trusmi',
    image: '/img/user/mega-mendung.jpeg', // Replace with actual image
  },
  {
    id: 'nft-002',
    name: 'Professional Angklung Set',
    brand: 'Angklung UDJO',
    image: '/img/user/angklung.jpeg',
  },
  {
    id: 'nft-003',
    name: 'Esemka Car Miniature',
    brand: 'SMK Car',
    image: '/img/user/mobil-esemka.jpeg',
  },
  {
    id: 'nft-004',
    name: 'Premium Batik Scarf',
    brand: 'Batik Trusmi',
    image: '/img/user/batik-premium.jpeg',
  },
    {
    id: 'nft-005',
    name: 'Kujang Heritage Blade',
    brand: 'Pusaka Nusantara',
    image: '/images/kujang.jpg',
  },
  {
    id: 'nft-006',
    name: 'Angklung Keychain',
    brand: 'Angklung UDJO',
    image: '/images/gantungan-kunci-angklung.jpg',
  },
];

// Main Component for the "Mine" page
const MinePage = () => {
  const [selectedNft, setSelectedNft] = useState(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  
  const [transferAddress, setTransferAddress] = useState('');
  const [confirmNftName, setConfirmNftName] = useState('');

  // Open the first modal with NFT actions
  const handleNftClick = (nft) => {
    setSelectedNft(nft);
    setActionModalOpen(true);
  };

  // Switch from the action modal to the transfer modal
  const handleOpenTransferModal = () => {
    setActionModalOpen(false);
    setTransferModalOpen(true);
  };

  // Close all modals and reset state
  const handleCloseModals = () => {
    setActionModalOpen(false);
    setTransferModalOpen(false);
    setSelectedNft(null);
    setTransferAddress('');
    setConfirmNftName('');
  };

  // --- Placeholder Functions ---
  const handlePrintQr = () => {
    toast('Printing QR Code for ' + selectedNft.name);
    handleCloseModals();
  };

  const handleRequestNfc = () => {
    toast.success('New NFC card requested for ' + selectedNft.name);
    handleCloseModals();
  };
  // -----------------------------

  // Simulate the transfer process
  const handleTransfer = () => {
    const loadingToast = toast.loading('Processing transfer...');

    // Simulate network delay
    setTimeout(() => {
      // Simulate a random success or failure
      if (Math.random() > 0.2) { // 80% success rate
        toast.dismiss(loadingToast);
        toast.success(
          (t) => (
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>
                <b>{selectedNft.name}</b> transferred successfully!
              </span>
            </div>
          ), { duration: 5000 }
        );
        // Here you would also update your backend/state to remove the NFT
      } else {
        toast.dismiss(loadingToast);
        toast.error(
          (t) => (
             <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-400" />
              <span>
                Transfer failed. Please try again.
              </span>
            </div>
          ), { duration: 5000 }
        );
      }
      handleCloseModals();
    }, 2000);
  };

  // Memoized check to enable/disable the final transfer button
  const isTransferButtonDisabled = useMemo(() => {
    if (!transferAddress.trim() || !selectedNft) {
      return true;
    }
    // Case-insensitive comparison
    return confirmNftName.toLowerCase() !== selectedNft.name.toLowerCase();
  }, [transferAddress, confirmNftName, selectedNft]);

  return (
    <div className="space-y-8 animate-fade-in">
      <Toaster /> {/* Add Toaster here if not in root layout */}
      
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold blockchain-gradient animate-glow">My Collection</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Manage, view, and transfer your digital assets.
        </p>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myNfts.map((nft) => (
          <div key={nft.id} onClick={() => handleNftClick(nft)} className="cursor-pointer">
            <CardCustom variant="neon" className="group overflow-hidden h-full">
              <div className="relative h-56 bg-muted">
                 {/* Placeholder for image */}
                 {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-xs text-muted-foreground">
                    {nft.name} Image
                 </div> */}
                 <img src={nft.image} alt={nft.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{nft.name}</h3>
                <p className="text-sm text-muted-foreground">{nft.brand}</p>
              </div>
            </CardCustom>
          </div>
        ))}
      </div>

      {/* --- MODALS --- */}

      {/* Action Modal */}
      {isActionModalOpen && selectedNft && (
        <Modal onClose={handleCloseModals}>
          <div className="text-center">
            <Gem className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{selectedNft.name}</h2>
            <p className="text-muted-foreground mb-8">What would you like to do?</p>
          </div>
          <div className="space-y-3">
            <ButtonCustom onClick={handlePrintQr} variant="outline" className="w-full justify-start text-left">
              <QrCode className="h-5 w-5 mr-3" />
              Print QR Code
            </ButtonCustom>
            <ButtonCustom onClick={handleRequestNfc} variant="outline" className="w-full justify-start text-left">
              <Nfc className="h-5 w-5 mr-3" />
              Request New NFC Card
            </ButtonCustom>
            <ButtonCustom onClick={handleOpenTransferModal} variant="default" className="w-full justify-start text-left bg-blue-900 hover:bg-blue-700 text-white">
              <Send className="h-5 w-5 mr-3" />
              Transfer NFT
            </ButtonCustom>
          </div>
        </Modal>
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && selectedNft && (
        <Modal onClose={handleCloseModals}>
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Transfer NFT</h2>
            <p className="text-muted-foreground bg-yellow-400/10 p-3 rounded-lg text-sm mb-6">
              Warning: Transfers are irreversible. Ensure the wallet address is correct. You are solely responsible for any loss of assets.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="walletAddress" className="text-sm font-medium text-muted-foreground mb-2 block">
                Destination Wallet Address
              </label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="walletAddress"
                  type="text"
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-background/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmNftName" className="text-sm font-medium text-muted-foreground mb-2 block">
                To confirm, type the NFT name: <span className="font-bold text-cyan-400">{selectedNft.name}</span>
              </label>
              <input
                id="confirmNftName"
                type="text"
                value={confirmNftName}
                onChange={(e) => setConfirmNftName(e.target.value)}
                placeholder="Type name to confirm..."
                className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-white"
              />
            </div>
            <ButtonCustom 
              onClick={handleTransfer} 
              disabled={isTransferButtonDisabled}
              className="w-full disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 mr-2"/>
              Confirm and Transfer
            </ButtonCustom>
          </div>
        </Modal>
      )}
    </div>
  );
};

// A generic Modal component for reusability
const Modal = ({ children, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-background border border-border/50 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default MinePage;
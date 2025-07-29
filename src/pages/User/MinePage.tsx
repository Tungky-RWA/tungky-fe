import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  X,
  QrCode,
  Nfc,
  Send,
  Wallet,
  AlertTriangle,
  Gem,
} from "lucide-react";
import CardCustom from "@/components/UI/CardCustom";
import ButtonCustom from "@/components/UI/ButtonCustom";
import { useUserNFTS } from "@/hooks/useGetUserNFTS.tsx";
import { useSmartAccountClient } from "@account-kit/react";
import { useInfoMinted } from "@/hooks/useClaimNFT";
import { useTransfer } from "@/hooks/useTransfer";

import { useActiveAccount, useReadContract, useProfiles, useSendBatchTransaction } from "thirdweb/react";
import { client } from "@/config";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { NFTBRAND_ABI } from "@/lib/constants";


// Main Component for the "Mine" page
const MinePage = () => {
  const activeAccount = useActiveAccount();
    const { mutateAsync: sendBatch, data: transactionResult, isSuccess, isError, } = useSendBatchTransaction();
  const [selectedNft, setSelectedNft] = useState(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  const {
    data: dataNfts,
    refetch,
  } = useUserNFTS(activeAccount?.address?.toLowerCase() || "");

  const handleTransfer = useCallback(async (contractAddress: `0x${string}`, to: `0x${string}`, tokenId: string) => {
    try {
      toast.loading('sending...')
      const contractBrand = getContract({
        client,
        chain: defineChain(4202),
        address: contractAddress,
        abi: NFTBRAND_ABI
      })
      const tx1 = prepareContractCall({
        contract: contractBrand,
        method: 'approve',
        params: [to, BigInt(tokenId)]
      })
      const tx2 = prepareContractCall({
        contract: contractBrand,
        method: "transferFrom",
        params: [activeAccount?.address || "", to, BigInt(tokenId)]
      })

      await sendBatch([tx1, tx2]);
    } catch (error) {
      toast.dismiss()
      toast.error('failed transfer NFT')
      refetch()
    }
  }, [])
  console.log(dataNfts, activeAccount?.address, 'woiiii')

  const [transferAddress, setTransferAddress] = useState("");
  const [confirmNftName, setConfirmNftName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss()
      toast.success('transfer success')
    }
    refetch()
  }, [isSuccess])
  // Open the first modal with NFT actions
  const handleNftClick = (nft: any) => {
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
    setTransferAddress("");
    setConfirmNftName("");
  };

  // --- Placeholder Functions ---
  const handlePrintQr = () => {
    toast("Printing QR Code for " + selectedNft.name);
    handleCloseModals();
  };

  const handleRequestNfc = () => {
    toast.success("New NFC card requested for " + selectedNft.name);
    handleCloseModals();
  };
  // -----------------------------

  // Memoized check to enable/disable the final transfer button
  const isTransferButtonDisabled = useMemo(() => {
    if (!transferAddress.trim() || !selectedNft) {
      return true;
    }
    // Case-insensitive comparison
    return confirmNftName.toLowerCase() !== selectedNft.name.toLowerCase();
  }, [transferAddress, confirmNftName, selectedNft]);
  console.log(selectedNft, "selected");
  return (
    <div className="space-y-8 animate-fade-in">
      <Toaster /> {/* Add Toaster here if not in root layout */}
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold blockchain-gradient animate-glow">
          My Collection
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Manage, view, and transfer your digital assets.
        </p>
      </div>
      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dataNfts?.nfts?.items?.map((nft: any) => (
          <NFTCard nft={nft} handleNftClick={handleNftClick} />
        ))}
      </div>
      {/* --- MODALS --- */}
      {/* Action Modal */}
      {isActionModalOpen && selectedNft && (
        <Modal onClose={handleCloseModals}>
          <div className="text-center">
            <Gem className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedNft.name}
            </h2>
            <p className="text-muted-foreground mb-8">
              What would you like to do?
            </p>
          </div>
          <div className="space-y-3">
            <ButtonCustom
              onClick={handlePrintQr}
              variant="outline"
              className="w-full justify-start text-left"
            >
              <QrCode className="h-5 w-5 mr-3" />
              Print QR Code
            </ButtonCustom>
            <ButtonCustom
              onClick={handleRequestNfc}
              variant="outline"
              className="w-full justify-start text-left"
            >
              <Nfc className="h-5 w-5 mr-3" />
              Request New NFC Card
            </ButtonCustom>
            <ButtonCustom
              onClick={handleOpenTransferModal}
              variant="default"
              className="w-full justify-start text-left bg-blue-900 hover:bg-blue-700 text-white"
            >
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
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Transfer NFT
            </h2>
            <p className="text-muted-foreground bg-yellow-400/10 p-3 rounded-lg text-sm mb-6">
              Warning: Transfers are irreversible. Ensure the wallet address is
              correct. You are solely responsible for any loss of assets.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="walletAddress"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
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
              <label
                htmlFor="confirmNftName"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                To confirm, type the NFT name:{" "}
                <span className="font-bold text-cyan-400">
                  {selectedNft?.name}
                </span>
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
              onClick={() =>
                handleTransfer(
                  selectedNft?.nftContractAddress,
                  transferAddress,
                  selectedNft?.tokenId
                )
              }
              disabled={isTransferButtonDisabled}
              className="w-full disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 mr-2" />
              Confirm and Transfer
            </ButtonCustom>
          </div>
        </Modal>
      )}
    </div>
  );
};

const NFTCard = ({ nft, handleNftClick }: any) => {
  const [metadata, setMetadata] = useState<any>(null);
  const contractBrand = getContract({
    client,
    chain: defineChain(4202),
    address: nft?.NftContractAddress,
    abi: NFTBRAND_ABI
  })
  const { data, isLoading } = useReadContract({
    contract: contractBrand,
    method: "tokenURI",
    params: [BigInt(nft?.tokenId || 0)],
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      const res = await fetch(data);
      const json = await res.json();
      setMetadata(json);
    };

    fetchMetadata();
  }, [data]);
  // // console.log(metadata, 'metadata')
  // if (isLoading) return <>loading...</>;
  return (
    <div
      key={nft?.tokenId}
      onClick={() => handleNftClick({ ...metadata, tokenId: nft?.tokenId })}
      className="cursor-pointer"
    >
      <CardCustom variant="neon" className="group overflow-hidden h-full">
        <div className="relative h-56 bg-muted">
          {/* Placeholder for image */}
          {/* <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 text-xs text-muted-foreground">
              {nft.name} Image
            </div> */}
          <img
            src={metadata?.image}
            alt={metadata?.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground truncate">
            {metadata?.name}
          </h3>
          <p className="text-sm text-muted-foreground">{metadata?.nameBrand}</p>
        </div>
      </CardCustom>
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default MinePage;

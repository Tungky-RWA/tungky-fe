import React from 'react';

interface WalletDisplayProps {
  address: string;
}

const WalletDisplay: React.FC<WalletDisplayProps> = ({ address }) => {
  const sliced = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert('✅ Address copied!');
    } catch (err) {
      alert('❌ Failed to copy address.');
    }
  };

  return (
    <span
      onClick={handleCopy}
      className="cursor-pointer text-neon-purple hover:underline hover:text-neon-blue"
      title="Click to copy"
    >
      {sliced}
    </span>
  );
};

export default WalletDisplay;

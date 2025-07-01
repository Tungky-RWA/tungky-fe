
import React, { useState } from 'react';
import { Wallet, Plus, ArrowDown } from 'lucide-react';
import CardCustom from '@/components/UI/CardCustom';
import ButtonCustom from '@/components/UI/ButtonCustom';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';

const TokenService = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const currentBalance = 1250;
  const quickAmounts = [100, 500, 1000];

  const handleBuyTokens = () => {
    console.log('Buying tokens:', buyAmount);
    setBuyAmount('');
  };

  const handleWithdraw = () => {
    console.log('Withdrawing:', { withdrawAmount, withdrawalMethod, destinationAddress });
    setWithdrawAmount('');
    setDestinationAddress('');
    setWithdrawalMethod('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold gradient-text">Token Service</h1>
        <p className="text-muted-foreground text-lg">
          Kelola token dan kuota minting Anda
        </p>
      </div>

      {/* Current Balance */}
      <CardCustom variant="glass" className="text-center">
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">{currentBalance.toLocaleString()}</h2>
          <p className="text-muted-foreground">Current Token Balance</p>
        </div>
      </CardCustom>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Buy Token Section */}
        <CardCustom variant="gradient">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Plus className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Buy Token/Quota</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="buyAmount">Amount to Purchase</Label>
                <Input
                  id="buyAmount"
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Quick Select</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {quickAmounts.map((amount) => (
                    <ButtonCustom
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBuyAmount(amount.toString())}
                    >
                      {amount} Tokens
                    </ButtonCustom>
                  ))}
                </div>
              </div>

              <ButtonCustom 
                variant="accent"
                onClick={handleBuyTokens}
                className="w-full mt-6"
                disabled={!buyAmount}
              >
                <Plus className="mr-2 h-4 w-4" />
                Buy Tokens
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>

        {/* Withdraw Token Section */}
        <CardCustom variant="glass">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/20 rounded-lg">
                <ArrowDown className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Withdraw Token</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="withdrawAmount">Withdraw Amount</Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                  max={currentBalance}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available: {currentBalance.toLocaleString()} tokens
                </p>
              </div>

              <div>
                <Label htmlFor="withdrawalMethod">Withdrawal Method</Label>
                <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiat">Fiat</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="destinationAddress">Destination Address/Account</Label>
                <Input
                  id="destinationAddress"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  placeholder="Enter address or account"
                  className="mt-1"
                />
              </div>

              <ButtonCustom 
                variant="primary"
                onClick={handleWithdraw}
                className="w-full mt-6"
                disabled={!withdrawAmount || !withdrawalMethod || !destinationAddress}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Withdraw Tokens
              </ButtonCustom>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>
  );
};

export default TokenService;

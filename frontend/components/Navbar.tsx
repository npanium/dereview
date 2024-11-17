"use client";
import { usePrivy, useFundWallet, useWallets } from "@privy-io/react-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import Image from "next/image";
import ChainSelector from "./ChainSelector";
import { CHAIN } from "./Providers";
import { useState } from "react";

export default function Navbar() {
  const { authenticated, logout, user } = usePrivy();
  const [selectedChain, setSelectedChain] = useState(CHAIN[0]);
  const { wallets } = useWallets();
  const wallet = wallets[0];

  const handleChainChange = async (chainId: number) => {
    const newChain = CHAIN.find((chain) => chain.id === chainId);
    if (newChain) {
      setSelectedChain(newChain);
      await wallet.switchChain(newChain.id);
      console.log("Chain changed to: ", newChain.id);
    }
  };

  return (
    <nav className="bg-[#53386d] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <Image
            src="/logo.jpeg"
            alt="DeReview Logo"
            width={32}
            height={32}
            className="w-8 h-auto"
          />
          <span className="text-xl font-bold">DeReview</span>
        </Link>
        {authenticated && (
          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost" className="hover:bg-[#523d6e] p-2">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <ChainSelector
              chains={CHAIN}
              selectedChain={selectedChain}
              onChainChange={handleChainChange}
            />
            <Button
              onClick={logout}
              variant="outline"
              className="border-white bg-white/50 text-sm text-[#432d5e] border-gray-200/20 hover:bg-[#523d6e] hover:text-white"
            >
              Logout
            </Button>
            {/* <Button onClick={handleFundWallet}>Fund wallet</Button> */}
          </div>
        )}
      </div>
    </nav>
  );
}

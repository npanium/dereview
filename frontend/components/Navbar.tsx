"use client";
import { usePrivy, useFundWallet } from "@privy-io/react-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";

export default function Navbar() {
  const { authenticated, logout, user } = usePrivy();

  return (
    <nav className="bg-[#432d5e] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:opacity-90">
          DeReview
        </Link>

        {authenticated && (
          <div className="flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost" className="hover:bg-[#523d6e] p-2">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              onClick={logout}
              variant="outline"
              className="text-sm text-[#432d5e] border-gray-200/20 hover:bg-[#523d6e] hover:text-white"
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

"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Wallet } from "lucide-react";

export default function AccountPage() {
  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
  } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) return null;

  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const email = user?.email;
  const phone = user?.phone;
  const wallet = user?.wallet;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="space-y-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Account Settings
            </CardTitle>
            <Button
              onClick={logout}
              variant="destructive"
              className="bg-red-900 hover:bg-red-800"
            >
              Logout
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            Connected as{" "}
            {user?.email?.address || user?.wallet?.address || "Anonymous"}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Section */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#432d5e]" />
              <div>
                <div className="font-medium">Email Address</div>
                <div className="text-sm text-gray-400">
                  {email?.address || "Not connected"}
                </div>
              </div>
            </div>
            {email ? (
              <Button
                onClick={() => unlinkEmail(email.address)}
                variant="outline"
                className="border-[#432d5e] text-[#432d5e] hover:bg-[#432d5e] hover:text-white"
                disabled={!canRemoveAccount}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={linkEmail}
                className="bg-[#432d5e] hover:bg-[#523d6e]"
              >
                Connect
              </Button>
            )}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-[#432d5e]" />
              <div>
                <div className="font-medium">Wallet</div>
                <div className="text-sm text-gray-400">
                  {wallet ? (
                    <span className="font-mono">
                      {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                    </span>
                  ) : (
                    "Not connected"
                  )}
                </div>
              </div>
            </div>
            {wallet ? (
              <Button
                onClick={() => unlinkWallet(wallet.address)}
                variant="outline"
                className="border-[#432d5e] text-[#432d5e] hover:bg-[#432d5e] hover:text-white"
                disabled={!canRemoveAccount}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={linkWallet}
                className="bg-[#432d5e] hover:bg-[#523d6e]"
              >
                Connect
              </Button>
            )}
          </div>

          {/* Phone Section */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#432d5e]" />
              <div>
                <div className="font-medium">Phone Number</div>
                <div className="text-sm text-gray-400">
                  {phone?.number || "Not connected"}
                </div>
              </div>
            </div>
            {phone ? (
              <Button
                onClick={() => unlinkPhone(phone.number)}
                variant="outline"
                className="border-[#432d5e] text-[#432d5e] hover:bg-[#432d5e] hover:text-white"
                disabled={!canRemoveAccount}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={linkPhone}
                className="bg-[#432d5e] hover:bg-[#523d6e]"
              >
                Connect
              </Button>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-400">
            {!canRemoveAccount && (
              <p>* You must have at least one connection method active</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
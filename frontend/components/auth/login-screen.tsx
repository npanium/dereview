"use client";
import { usePrivy } from "@privy-io/react-auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginScreen() {
  const { login } = usePrivy();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-6">
        <Card className="border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">Welcome to DeReview</CardTitle>

            <CardDescription className="text-gray-400">
              Decentralized academic paper review platform
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <Button
              onClick={login}
              className="w-full bg-[#432d5e] hover:bg-[#523d6e] text-white"
            >
              Login to Continue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

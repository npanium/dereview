"use client";
import { usePrivy } from "@privy-io/react-auth";
import RoleSelector from "@/components/auth/role-selector";
import LoginScreen from "@/components/auth/login-screen";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Loading your profile...
      </h2>
      <p className="text-muted-foreground">
        Please wait while we authenticate your session
      </p>
    </div>
  );
};

export default function Home() {
  const { ready, authenticated } = usePrivy();

  if (!ready) {
    return <LoadingScreen />;
  }

  return authenticated ? <RoleSelector /> : <LoginScreen />;
}

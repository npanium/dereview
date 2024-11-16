"use client";
import { usePrivy } from "@privy-io/react-auth";
import RoleSelector from "@/components/auth/role-selector";
import LoginScreen from "@/components/auth/login-screen";

export default function Home() {
  const { ready, authenticated } = usePrivy();

  if (!ready) return null;

  return authenticated ? <RoleSelector /> : <LoginScreen />;
}

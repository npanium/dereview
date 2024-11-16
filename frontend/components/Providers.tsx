"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from "viem/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider, createConfig } from "wagmi";
import { ReactNode, useState } from "react";
import { getConfig } from "@/lib/wagmi";

const CHAIN = baseSepolia;

export default function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  const [wagmiConfig] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ["email", "wallet"],
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "logo.jpeg",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: CHAIN,
            supportedChains: [CHAIN],
          }}
        >
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
            chain={CHAIN}
          >
            {children}
          </OnchainKitProvider>
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

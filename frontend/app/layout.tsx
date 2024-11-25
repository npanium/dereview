import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import PoweredBy from "@/components/PoweredBy";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeReview - Decentralized Paper Reviews",
  description: "Decentralized academic paper review platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body
        className={`${raleway.className}  font-sans bg-gray-200 text-gray-100`}
      >
        <Providers>
          <Navbar />
          <main className="">{children}</main>
          <PoweredBy />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

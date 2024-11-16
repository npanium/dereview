import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

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
      <body className={` font-sans bg-gray-200 text-gray-100`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

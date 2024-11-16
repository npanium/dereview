import Image from "next/image";

// Add or remove logos as needed
const LOGOS = [
  { src: "/poweredby/Blockscout.png", alt: "Blockscout" },
  { src: "/poweredby/Coinbase.png", alt: "Coinbase" },
  { src: "/poweredby/Filecoin.png", alt: "Filecoin" },
  { src: "/poweredby/Flow.png", alt: "Flow" },
  { src: "/poweredby/Hedera.png", alt: "Hedera" },
  { src: "/poweredby/Linea.png", alt: "Linea" },
  { src: "/poweredby/Morph.png", alt: "Morph" },
  { src: "/poweredby/Polygon.png", alt: "Polygon" },
  { src: "/poweredby/Privy.png", alt: "Privy" },
  { src: "/poweredby/Scroll.png", alt: "Scroll" },
  { src: "/poweredby/Zircuit.png", alt: "Zircuit" },
] as const;

export default function PoweredBy() {
  return (
    <div className="w-full py-8 px-4 ">
      <div className="w-1/2 px-10 mx-auto my-10 border-t border-gray-800"></div>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-400 font-heading mb-6">
          Powered By
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="relative w-24 h-12 hover:scale-110 transition-all"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 96px, 120px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

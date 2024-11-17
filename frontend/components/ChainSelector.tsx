"use client";
import { Chain } from "viem/chains";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface ChainSelectorProps {
  chains: Chain[];
  selectedChain: Chain;
  onChainChange: (chainId: number) => void;
}

export default function ChainSelector({
  chains,
  selectedChain,
  onChainChange,
}: ChainSelectorProps) {
  return (
    <Select
      value={selectedChain.id.toString()}
      onValueChange={(value) => onChainChange(parseInt(value))}
    >
      <SelectTrigger className="w-[180px] border-white">
        <SelectValue>
          <div className="flex items-center gap-2">{selectedChain.name}</div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()}>
            <div className="flex items-center gap-2">{chain.name}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import ReviewerCard from "@/components/dashboard/reviewer-card";
import { mockReviewers } from "@/lib/mock-data";
import ReviewPoolFactory from "@/lib/abi/ReviewPoolFactory.json";

import { useReadContract, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";
import { Abi } from "viem";

export default function ReviewerDashboard() {
  const [poolAddresses, setPoolAddresses] = useState<string[]>([]);

  const { data: poolCount } = useReadContract({
    address: process.env
      .NEXT_PUBLIC_REVIEW_POOL_FACTORY_ADDRESS as `0x${string}`,
    abi: ReviewPoolFactory.abi,
    functionName: "reviewPoolCount",
    args: [],
  });

  console.log("poolCount", poolCount);

  // Use useContractReads with correct syntax
  const { data: poolReadResults } = useReadContracts({
    contracts: Array.from({ length: Number(poolCount) || 0 }).map(
      (_, index) => ({
        address: process.env
          .NEXT_PUBLIC_REVIEW_POOL_FACTORY_ADDRESS as `0x${string}`,
        abi: ReviewPoolFactory.abi as Abi,
        functionName: "reviewPoolToAddress",
        args: [BigInt(index)],
      })
    ),
  });

  console.log("poolReadResults", poolReadResults);

  // Update pool addresses when results are available
  useEffect(() => {
    if (poolReadResults) {
      const addresses = poolReadResults
        .map((result) => result.result as string)
        .filter(Boolean);
      setPoolAddresses(addresses);
    }
  }, [poolReadResults]);

  console.log("Pool Addresses:", poolAddresses);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#432d5e]">
        Available Papers
      </h2>
      <div className="grid gap-4">
        {poolAddresses.map((address, key) => (
          <ReviewerCard key={key} address={address} />
        ))}
      </div>
    </div>
  );
}

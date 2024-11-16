// components/dashboard/reviewer-card.tsx
"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

import { useReadContracts } from "wagmi";
import { getBalance } from "viem/actions";
import { baseSepolia } from "viem/chains";
import ReviewPool from "@/lib/abi/ReviewPool.json";
import { createPublicClient, http } from 'viem';

interface ReviewerCardProps {
  address: string;
}

export default function ReviewerCard({
  address,
}: ReviewerCardProps) {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http()
  });

  const balance = getBalance(client, {
    address: address as `0x${string}`
  });

  const { data: contractReads } = useReadContracts({
    contracts: [
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "paperTitle"
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "paperUri"
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "tagTypesHash"
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "requiredReviewers"
      },
    ]
  });

  console.log(contractReads);

  const [name, description, uri, tagTypesHash, requiredReviewers] = contractReads?.map(read => read.result as string) ?? ["", "", "", "", ""];
  const expertise = ["Blockchain", "Smart Contracts"]; // Placeholder expertise tags
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {expertise.map((tag) => (
            <Badge key={tag} variant="secondary">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

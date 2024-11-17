"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  useReadContracts,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { getBalance } from "viem/actions";
import { baseSepolia } from "viem/chains";
import ReviewPool from "@/lib/abi/ReviewPool.json";
import { createPublicClient, http } from "viem";
import { useState, useEffect } from "react";
import { formatEther } from "viem";
import ReviewerSBT from "@/lib/abi/ReviewerSBT.json";
import Link from "next/link";
import AddReviewDialog from "../AddReviewDialog";

interface ReviewerCardProps {
  address: string;
}

export default function ReviewerCard({ address }: ReviewerCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const [balance, setBalance] = useState<bigint | null>(null);

  const [hasApplied, setHasApplied] = useState(false);

  const { data: receipt, isLoading } = useWaitForTransactionReceipt({ hash });
  const { toast } = useToast();
  const { address: userAddress } = useAccount();
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  // Check if user is already a reviewer
  const { data: isReviewer } = useReadContract({
    address: address as `0x${string}`,
    abi: ReviewPool.abi,
    functionName: "reviewers",
    args: [userAddress as `0x${string}`],
  });

  // Fetch balance and other data...
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await getBalance(client, {
          address: address as `0x${string}`,
        });
        setBalance(result);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [address, client]);

  // Your existing contract reads...
  const { data: contractReads } = useReadContracts({
    contracts: [
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "paperTitle",
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "paperUri",
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "tagTypesHash",
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "requiredReviewerNumber",
      },
      {
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "author",
      },
    ],
  });

  const [
    name = "",
    uri = "",
    author = "",
    tagTypesHash = "",
    requiredReviewers = "",
  ] = contractReads?.map((read) => read.result as string) ?? [];

  const { data: tagTypes } = useReadContract({
    address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
    abi: ReviewerSBT.abi,
    functionName: "getTagTypeFromHash",
    args: [tagTypesHash],
  });

  const addReviewer = async () => {
    try {
      writeContract({
        address: address as `0x${string}`,
        abi: ReviewPool.abi,
        functionName: "addReviewer",
        args: [0],
      });
      setIsApplying(true); // Set to true immediately after successful write
    } catch (error) {
      console.error("Error applying for review:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply for review. Please try again.",
      });
    }
  };

  // Handle transaction status updates
  useEffect(() => {
    if (hash) {
      toast({
        title: "Applying for Review",
        description: (
          <span>
            Check tx on{" "}
            <a
              href={`https://base-sepolia.blockscout.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-600"
            >
              Blockscout
            </a>
          </span>
        ),
      });
    }
  }, [hash]);

  useEffect(() => {
    if (receipt) {
      setHasApplied(true);
      setIsApplying(false);
      toast({
        title: "✅ Successfully Applied",
        description: (
          <span>
            See transaction on{" "}
            <a
              href={`https://base-sepolia.blockscout.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-600"
            >
              Blockscout
            </a>
          </span>
        ),
      });
    }
  }, [receipt]);

  // Determine button state
  const getButtonContent = () => {
    if (isReviewer || isApplying) {
      return (
        <div className="flex gap-2">
          <Button variant="outline" disabled className="border-[#432d5e]">
            Applied
          </Button>
          <AddReviewDialog />
        </div>
      );
    }

    if (userAddress?.toLowerCase() === author?.toLowerCase()) {
      return (
        <Button variant="default" disabled className="bg-gray-700">
          Your Paper
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        onClick={addReviewer}
        className="border-[#432d5e]"
      >
        Apply for Review
      </Button>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          URL:{" "}
          <Link href={uri} className="underline text-blue-500">
            {uri}
          </Link>
        </CardDescription>
        <CardDescription>Author: {author}</CardDescription>
        <p className="text-sm text-gray-500">
          Bounty: {balance ? formatEther(balance) : "0"} ETH
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tagTypes) &&
              tagTypes.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
          </div>
          <div className="flex justify-end">{getButtonContent()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
